const express = require('express');
const router = express.Router();
const { getAllBlogs, getSingleBlog, createBlog, deleteBlog } = require('../controllers/blogController');

// 👇 Yeh saare raste (routes) ab controller se connect ho gaye hain
router.get('/', getAllBlogs);
router.get('/:slug', getSingleBlog);
router.post('/', createBlog);
router.delete('/:id', deleteBlog); // ✅ Delete ka naya rasta

module.exports = router;