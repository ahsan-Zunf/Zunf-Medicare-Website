const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// Cloudinary ko credentials dena
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage engine setup karna
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'zunf_medical_records', // Cloudinary mein is naam ka folder ban jayega
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'], // PDF aur images dono allow hain
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };