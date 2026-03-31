import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getBlogBySlug, type BlogPost } from "@/lib/api";
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/footer";
import { Loader2, Calendar, User, ArrowLeft } from "lucide-react";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (slug) {
        const data = await getBlogBySlug(slug);
        setBlog(data);
      }
      setLoading(false);
    };
    fetchBlog();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-[#8CC63F]" /></div>
  );

  if (!blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Blog Not Found</h1>
      <p className="text-slate-500 mb-6">The article you are looking for does not exist.</p>
      <Link to="/blogs" className="text-[#8CC63F] font-bold hover:underline">← Back to all blogs</Link>
    </div>
  );

  // 🚀 ADVANCED SEO: JSON-LD Schema Markup (Google Loves This!)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    },
    "headline": blog.seoTitle || blog.title,
    "description": blog.excerpt || `Read ${blog.title} on ZUNF Medicare.`,
    "image": blog.coverImage ? [blog.coverImage] : [],
    "author": {
      "@type": "Person",
      "name": blog.author || "ZUNF Medicare Expert"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ZUNF Medicare",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zunfmedicare.com/logo.png" // Make sure you have a logo.png in your public folder
      }
    },
    "datePublished": blog.createdAt,
    "dateModified": blog.createdAt // Ideally updatedAt if you have it in backend
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      
      {/* 🚀 DYNAMIC SEO TAGS & SCHEMA */}
      <Helmet>
        <title>{blog.seoTitle || blog.title} | ZUNF Medicare</title>
        <meta name="description" content={blog.excerpt || `Read ${blog.title} on ZUNF Medicare health blog.`} />
        {blog.seoKeywords && <meta name="keywords" content={blog.seoKeywords} />}
        <link rel="canonical" href={window.location.href} />
        {/* Schema Script Injection */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <SiteHeader />
      
      <main className="flex-1 pt-24 pb-16">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#8CC63F] font-medium text-sm mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Blogs
          </Link>

          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-syne mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full"><Calendar className="h-4 w-4 text-[#8CC63F]" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full"><User className="h-4 w-4 text-[#00AEEF]" /> {blog.author}</span>
            </div>
          </header>

          {blog.coverImage && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <img src={blog.coverImage} alt={blog.title} className="w-full h-auto object-cover max-h-[500px]" />
            </div>
          )}

          {/* 📝 RICH TEXT RENDERING (Editor wala content yahan aayega) */}
          <div 
            className="prose prose-lg prose-slate max-w-none prose-headings:font-syne prose-a:text-[#00AEEF] prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}