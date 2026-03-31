import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getBlogs, type BlogPost } from "@/lib/api";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Card } from "@/components/ui/card";
import { Loader2, Calendar, User } from "lucide-react";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getBlogs();
      setBlogs(data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Helmet>
        <title>Health & Medical Blog | ZUNF Medicare</title>
        <meta name="description" content="Read the latest health tips, medical news, and updates from ZUNF Medicare experts." />
      </Helmet>

      <SiteHeader />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 font-syne mb-4">Our Health Blog</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Stay updated with the latest medical insights, healthy lifestyle tips, and news from our experts.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-[#8CC63F]" /></div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 text-slate-500">No blogs published yet. Check back soon!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link to={`/blog/${blog.slug}`} key={blog._id} className="group h-full">
                  <Card className="h-full flex flex-col overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
                    {blog.coverImage ? (
                      <div className="h-56 w-full overflow-hidden">
                        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : (
                      <div className="h-56 w-full bg-slate-100 flex items-center justify-center">
                        <span className="text-slate-400 font-syne text-xl">ZUNF Medicare</span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {blog.author}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#8CC63F] transition-colors line-clamp-2">{blog.title}</h3>
                      <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">{blog.excerpt}</p>
                      <span className="text-[#8CC63F] font-bold text-sm mt-auto inline-block">Read Full Article →</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}