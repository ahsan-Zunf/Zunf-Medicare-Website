const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // SEO-friendly link (e.g., /how-to-stay-healthy)
  content: { type: String, required: true }, // Blog ki puri detail (HTML format mein)
  excerpt: { type: String }, // Choti si description card ke liye
  author: { type: String, default: 'ZUNF Medicare' },
  coverImage: { type: String }, // Tasweer ka link
  seoTitle: { type: String },
  seoKeywords: { type: String },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);