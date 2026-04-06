const Blog = require('../models/Blog');

// 1. GET ALL BLOGS (Saare blogs dekhne ke liye)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. GET SINGLE BLOG (Ek blog parhne ke liye)
exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ blog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 3. CREATE BLOG (Naya blog likhne ke liye - Image Upload ke sath)
exports.createBlog = async (req, res) => {
  try {
    // Title se SEO friendly slug banana (e.g., "My Test" -> "my-test")
    let slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Agar same naam ka blog pehle se hai toh uske aage time laga do taake error na aaye
    let existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      slug = `${slug}-${Date.now()}`; 
    }

    const newBlog = new Blog({
      title: req.body.title,
      slug: slug,
      content: req.body.content,
      excerpt: req.body.excerpt,
      author: req.body.author || 'ZUNF Medicare',
      coverImage: req.body.coverImage, // ✅ Naya Image field add kiya
      seoTitle: req.body.seoTitle,
      seoKeywords: req.body.seoKeywords
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: savedBlog });
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ message: "Failed to create blog", error: error.message });
  }
};

// 4. DELETE BLOG (Admin Panel se blog delete karne ke liye)
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({ message: "Failed to delete blog", error: error.message });
  }
};