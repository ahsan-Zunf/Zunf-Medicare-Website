# VeevoTech SMS API Setup Guide

## Required Environment Variables

VeevoTech SMS service requires **2 environment variables** to be configured:

### 1. `VEEVOTECH_API_URL` (Required)
- **Purpose**: The API endpoint URL for sending SMS messages
- **Format**: Full HTTP/HTTPS URL
- **Location**: Set in your `.env` file in the Backend directory
- **Current Value**: 
  ```
  VEEVOTECH_API_URL=https://api.veevotech.com/v3/sendsms
  ```

### 2. `VEEVOTECH_API_KEY` (Required)
- **Purpose**: Your API key/authentication token for VeevoTech
- **Format**: String (API key provided by VeevoTech)
- **Location**: Set in your `.env` file in the Backend directory
- **Current Value**: 
  ```
  VEEVOTECH_API_KEY=65badf6ece8ae9965b3041825c0e3fe9
  ```

## Current Status

**✅ Configuration Complete** - The `.env` file has been created with:
- VEEVOTECH_API_URL: `https://api.veevotech.com/v3/sendsms`
- VEEVOTECH_API_KEY: `65badf6ece8ae9965b3041825c0e3fe9`

**Note**: Make sure to update `MONGODB_URI` and `JWT_SECRET` in the `.env` file before running the server.

## Where VeevoTech is Used

1. **Order Confirmation SMS** (`Backend/controllers/orderController.js`)
   - Automatically sends SMS when an order is created
   - Includes lab name and coupon code (if applicable)
   - Message format: `{LabName} | ZUNF Medicare: Your tests are booked. Use Coupon: {couponNumber}. Team will contact you soon. For help: 03090622004. Thank you for trusting ZUNF Medicare!`

2. **Manual SMS Endpoint** (`Backend/controllers/messageController.js`)
   - POST `/messages/send`
   - Allows manual sending of SMS messages
   - Enforces 3 messages per mobile number per month limit

## API Request Format

The backend sends requests to VeevoTech in this format:

```javascript
POST {VEEVOTECH_API_URL}
Headers: {
  'Content-Type': 'application/json'
}
Body: {
  hash: {VEEVOTECH_API_KEY},      // Note: Uses "hash" field, not "apikey"
  receivernum: "+923001234567",   // Recipient phone number
  sendernum: "ZUNF",              // Sender ID (defaults to "ZUNF")
  textmessage: "Your message here"
}
```

**Current Configuration:**
- API URL: `https://api.veevotech.com/v3/sendsms`
- API Key: `65badf6ece8ae9965b3041825c0e3fe9`

## How to Get VeevoTech Credentials

1. **Sign up for VeevoTech account** at their website
2. **Get your API credentials** from your VeevoTech dashboard:
   - API URL/Endpoint
   - API Key
3. **Add to `.env` file** in the Backend directory:
   ```
   VEEVOTECH_API_URL=your_api_url_here
   VEEVOTECH_API_KEY=your_api_key_here
   ```

## Testing

Once configured, you can test the SMS functionality:

1. **Test via Order Creation**: Create an order and check if SMS is sent
2. **Test via API Endpoint**: 
   ```bash
   POST http://localhost:3000/messages/send
   Body: {
     "receivernum": "+923001234567",
     "textmessage": "Test message"
   }
   ```

## Error Handling

The backend handles these scenarios:
- Missing credentials: Warning logged, SMS will fail
- Quota exceeded: Returns HTTP 429 with message "You cannot do booking right now. Please contact support."
- API errors: Logged and handled gracefully (order still created, SMS failure doesn't block order)

## Notes

- SMS quota limit: **3 messages per mobile number per calendar month**
- Sender ID: Defaults to "ZUNF" if not specified
- Phone numbers should include country code (e.g., +92 for Pakistan)

