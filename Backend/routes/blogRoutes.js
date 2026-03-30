const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// 1. GET ALL BLOGS (Saare blogs dekhne ke liye)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 2. GET SINGLE BLOG (Ek blog parhne ke liye)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ blog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 3. CREATE BLOG (Naya blog likhne ke liye - Bahzad bhai ke liye)
router.post('/', async (req, res) => {
  try {
    // Title se SEO friendly slug banana (e.g., "My Test" -> "my-test")
    let slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const newBlog = new Blog({
      title: req.body.title,
      slug: slug,
      content: req.body.content,
      excerpt: req.body.excerpt,
      author: req.body.author || 'ZUNF Medicare',
      seoTitle: req.body.seoTitle,
      seoKeywords: req.body.seoKeywords
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: savedBlog });
  } catch (error) {
    res.status(500).json({ message: "Failed to create blog", error: error.message });
  }
});

module.exports = router;