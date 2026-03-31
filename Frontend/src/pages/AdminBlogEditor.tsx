import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Editor ka design
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { createBlog } from "@/lib/api";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminBlogEditor() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    coverImage: "",
    seoTitle: "",
    seoKeywords: "",
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value: string) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Yahan hum token pass karenge agar aapka admin route protected hai. 
      // Filhal dummy token bhej rahe hain, aap isay apne auth context se link kar sakte hain.
      const token = localStorage.getItem("token") || "admin-token"; 
      await createBlog(formData, token);
      
      setSuccess(true);
      setFormData({ title: "", excerpt: "", coverImage: "", seoTitle: "", seoKeywords: "", content: "" });
      
      // 2 second baad wapas admin page par bhej do
      setTimeout(() => navigate("/admin"), 2000);
    } catch (err) {
      setError("Blog save karne mein masla aaya. Backend check karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/admin" className="text-slate-500 hover:text-[#8CC63F] flex items-center gap-2 mb-2 text-sm font-medium">
              <ArrowLeft className="h-4 w-4" /> Back to Admin
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 font-syne">Write a New Blog</h1>
            <p className="text-slate-500">Create SEO optimized content for ZUNF Medicare</p>
          </div>
        </div>

        {success && (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-200 font-medium">
            ✅ Blog successfully published!
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200 font-medium">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Card className="p-6 md:p-8 rounded-2xl shadow-sm border-slate-200 space-y-6 bg-white">
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Blog Title (Required)</label>
                <Input required name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Benefits of regular blood tests" className="h-12" />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Short Excerpt (For Blog Cards)</label>
                <Input name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="A short 2-line summary..." className="h-12" />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Cover Image URL</label>
                <Input name="coverImage" value={formData.coverImage} onChange={handleChange} placeholder="https://example.com/image.jpg" className="h-12" />
              </div>
            </div>

            {/* SEO Section */}
            <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">🚀 SEO Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">SEO Title</label>
                  <Input name="seoTitle" value={formData.seoTitle} onChange={handleChange} placeholder="Title for Google Search..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">SEO Keywords (Comma separated)</label>
                  <Input name="seoKeywords" value={formData.seoKeywords} onChange={handleChange} placeholder="health, blood test, lahore..." />
                </div>
              </div>
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="text-sm font-bold text-slate-700 mb-2 block">Main Content</label>
              <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
                <ReactQuill 
                  theme="snow" 
                  value={formData.content} 
                  onChange={handleContentChange} 
                  className="h-64 mb-12"
                  placeholder="Start writing your blog here..."
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button type="submit" disabled={loading || !formData.title || !formData.content} className="h-12 px-8 bg-[#8CC63F] hover:bg-[#7ab332] text-white font-bold rounded-xl shadow-lg shadow-[#8CC63F]/20">
                {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
                Publish Blog
              </Button>
            </div>

          </Card>
        </form>
      </div>
    </div>
  );
}