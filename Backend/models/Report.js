const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Jis patient ne upload ki hai uski ID
    required: true 
  },
  title: { 
    type: String, 
    required: true // e.g., "CBC Blood Report" ya "Dr. Ali Prescription"
  },
  // 🌟 YAHAN CATEGORY ADD KI HAI 🌟
  category: {
    type: String,
    default: 'Other' // Agar category na aaye toh automatically Other set ho jaye
  },
  fileUrl: { 
    type: String, 
    required: true // Cloudinary ka secure URL yahan save hoga
  },
  fileType: {
    type: String // image/png, application/pdf etc.
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Report', reportSchema);