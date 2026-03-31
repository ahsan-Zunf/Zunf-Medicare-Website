const sendEmail = require('../utils/sendEmail'); // ✅ NEW: Email sender import kar liya
const Order = require('../models/orderModel');
const {
  ensureQuotaOrThrow,
  recordSuccessfulSend,
  sendSms,
} = require('../services/messageService');
const {
  reserveChughtaiCoupon,
  markCouponAsSent,
  releaseCoupon,
  CHUGHTAI_LAB_ID,
} = require('../services/couponService');

const REQUIRED_CUSTOMER_FIELDS = ['name', 'mobile', 'age', 'city'];
const ALLOWED_STATUSES = ['Received', 'Pending', 'Completed'];

const buildConfirmationMessage = ({ order, couponNumber }) => {
  const labNames = [...new Set(order.items.map((item) => item.labName))];
  const labName = labNames.length === 1 ? labNames[0] : labNames.join(', ');

  let message = `${labName} | ZUNF Medicare: Your tests are booked.`;

  if (couponNumber) {
    message += ` Use Coupon: ${couponNumber}.`;
  }

  message += ` For help: 03090622004. Thank you for trusting ZUNF Medicare!`;

  return message;
};

const sendOrderConfirmation = async (order) => {
  const mobile = String(order.customer.mobile).trim();
  const hasChughtaiTests = order.items.some((item) => item.labId === CHUGHTAI_LAB_ID);
  let reservedCoupon = null;

  try {
    let couponNumber;

    if (hasChughtaiTests) {
      reservedCoupon = await reserveChughtaiCoupon({
        orderId: order._id,
        recipientMobile: mobile,
      });

      couponNumber = reservedCoupon?.couponNumber;
    }

    const textmessage = buildConfirmationMessage({ order, couponNumber });

    await sendSms({
      receivernum: mobile,
      sendernum: 'ZUNF',
      textmessage,
    });

    // Only record quota for Chughtai orders
    await recordSuccessfulSend(mobile, hasChughtaiTests);

    if (reservedCoupon) {
      await markCouponAsSent(reservedCoupon._id);
    }
  } catch (error) {
    if (reservedCoupon) {
      await releaseCoupon(reservedCoupon._id);
    }
    console.error('Failed to send confirmation SMS:', error);
  }
};

exports.createOrder = async (req, res) => {
  console.log("🚀 [BACKEND] ===== ORDER REQUEST RECEIVED =====");
  console.log("🚀 [BACKEND] Request method:", req.method);
  console.log("🚀 [BACKEND] Request URL:", req.url);
  console.log("🚀 [BACKEND] Request body:", JSON.stringify(req.body, null, 2));
  console.log("🚀 [BACKEND] Request headers:", JSON.stringify(req.headers, null, 2));

  try {
    const { customer, preferredDate, preferredTime, items, totals } = req.body;
    console.log("🚀 [BACKEND] Extracted data - Customer:", customer?.name, customer?.email);
    console.log("🚀 [BACKEND] Extracted data - Items count:", items?.length);

    if (!customer || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Customer info and at least one item are required' });
    }

    const missingCustomerField = REQUIRED_CUSTOMER_FIELDS.find(
      (field) => !customer[field] || !String(customer[field]).trim()
    );

    if (missingCustomerField) {
      return res.status(400).json({ message: `Missing customer field: ${missingCustomerField}` });
    }

    // Date and time are optional - use defaults if not provided
    const finalPreferredDate = preferredDate || new Date().toISOString().split('T')[0];
    const finalPreferredTime = preferredTime || '09:00';

    // Check if order contains Chughtai tests - only enforce quota for Chughtai orders
    const hasChughtaiTests = items.some((item) => item.labId === CHUGHTAI_LAB_ID);
    await ensureQuotaOrThrow(String(customer.mobile).trim(), hasChughtaiTests);

    const orderItems = items.map((item) => ({
      testId: item.testId,
      testName: item.testName,
      labId: item.labId,
      labName: item.labName,
      quantity: item.quantity || 1,
      price: item.price || 0,
      discountedPrice: item.discountedPrice || 0,
      pinned: !!item.pinned,
    }));

    const orderTotals = {
      original: totals?.original ?? orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      final: totals?.final ?? orderItems.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0),
      planCoverage: totals?.planCoverage ?? 0,
    };

    console.log('🛒 [ORDER] Creating new order...');
    
    const order = await Order.create({
      customer,
      preferredDate: finalPreferredDate,
      preferredTime: finalPreferredTime,
      items: orderItems,
      totals: orderTotals,
      status: 'Pending', 
    });

    const savedOrder = await Order.findById(order._id);
    if (!savedOrder) {
      throw new Error('Order was not saved to database');
    }

    console.log('✅ [ORDER] Order created and saved successfully!');

    // ==========================================
    // 🚨 NEW: ADMIN EMAIL NOTIFICATION SYSTEM
    // ==========================================
    try {
      // Tests ki list banana
      const testsListHtml = orderItems.map(item => 
        `<li><strong>${item.testName}</strong> (${item.labName}) - Qty: ${item.quantity} - Rs. ${item.discountedPrice}</li>`
      ).join('');

      const emailBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; max-w: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #8CC63F; margin: 0;">🚨 Nayi Lab Booking Aayi Hai!</h2>
            <p style="color: #666; font-size: 14px;">ZUNF Medicare Website</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #00AEEF; padding-bottom: 5px;">Patient Details</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${customer.name}</p>
            <p style="margin: 5px 0;"><strong>Mobile:</strong> <a href="tel:${customer.mobile}">${customer.mobile}</a></p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${customer.email || 'N/A'}</p>
            <p style="margin: 5px 0;"><strong>Age:</strong> ${customer.age} | <strong>City:</strong> ${customer.city}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; border-bottom: 2px solid #00AEEF; padding-bottom: 5px;">Booking Information</h3>
            <p style="margin: 5px 0;"><strong>Preferred Slot:</strong> ${finalPreferredDate} at ${finalPreferredTime}</p>
            <p style="margin: 5px 0;"><strong>Total Bill:</strong> <span style="color: #8CC63F; font-size: 18px; font-weight: bold;">Rs. ${orderTotals.final}</span></p>
            
            <h4 style="margin-bottom: 5px;">Tests Ordered:</h4>
            <ul style="margin-top: 5px; padding-left: 20px; color: #555;">
              ${testsListHtml}
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://zunfmedicare.com/admin" style="background-color: #00AEEF; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Admin Panel Kholaing</a>
          </div>
        </div>
      `;
      
      // Email background mein bhejo
      sendEmail('🚨 NEW ORDER ALRET - ZUNF Medicare', emailBody);
    } catch (emailError) {
      console.error('❌ [ORDER] Admin Email bhejne mein masla aaya:', emailError);
    }
    // ==========================================

    // Send SMS confirmation
    sendOrderConfirmation(order).catch((error) => {
      console.error('❌ [ORDER] Confirmation SMS scheduling error:', error);
    });

    return res.status(201).json(order);
  } catch (error) {
    if (error.code === 'SMS_QUOTA_EXCEEDED') {
      return res.status(error.statusCode || 429).json({ message: error.message });
    }

    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Failed to create order' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { mobile } = req.query;
    let query = {};

    if (mobile) {
      const trimmedQuery = String(mobile).trim();
      const mangledQuery = (trimmedQuery.includes('@') && !trimmedQuery.startsWith('+'))
        ? `+92${trimmedQuery}`
        : trimmedQuery;

      query = {
        $or: [
          { 'customer.mobile': trimmedQuery },
          { 'customer.email': trimmedQuery },
          { 'customer.mobile': mangledQuery }
        ]
      };
    } 

    const orders = await Order.find(query).sort({ createdAt: -1 }).lean();
    return res.json({ orders });
  } catch (error) {
    console.error('❌ [ORDERS] Error fetching orders:', error);
    return res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ message: 'Failed to update order status' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ message: 'Failed to delete order' });
  }
};