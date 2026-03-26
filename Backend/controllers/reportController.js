const Report = require('../models/Report');

// 1. Report Upload Karne Ka Function
exports.uploadReport = async (req, res) => {
  try {
    // req.file mein Cloudinary ki taraf se file ka data aayega
    if (!req.file) {
      return res.status(400).json({ message: 'Koi file upload nahi hui!' });
    }

    // 🌟 YAHAN CATEGORY BHI NIKAL LI HAI 🌟
    const { userId, title, category } = req.body; 

    // Naya record banana
    const newReport = new Report({
      user: userId,
      title: title,
      category: category || 'Other', // 🌟 YAHAN CATEGORY SAVE KARWADI 🌟
      fileUrl: req.file.path, // Yeh Cloudinary ka direct link hai
      fileType: req.file.mimetype // e.g., image/jpeg ya application/pdf
    });

    await newReport.save();

    res.status(201).json({
      success: true,
      message: 'Report successfully upload ho gayi!',
      report: newReport
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: 'Server error file upload karte waqt.' });
  }
};

// 2. User Ki Saari Reports Fetch Karne Ka Function (Dashboard ke liye)
exports.getUserReports = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Latest reports sab se upar aayengi (-1)
    const reports = await Report.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Reports fetch karne mein masla aya.' });
  }
};

// 3. Report Delete Karne Ka Function
exports.deleteReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    
    // Database se report delete karega
    await Report.findByIdAndDelete(reportId);
    
    res.status(200).json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ success: false, message: 'Error deleting report' });
  }
};

// 4. Report Rename Karne Ka Function
exports.renameReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    const { title } = req.body; // Frontend se naya title aayega
    
    // Database mein title update karega
    await Report.findByIdAndUpdate(reportId, { title: title });
    
    res.status(200).json({ success: true, message: 'Report renamed successfully' });
  } catch (error) {
    console.error('Rename Error:', error);
    res.status(500).json({ success: false, message: 'Error renaming report' });
  }
};