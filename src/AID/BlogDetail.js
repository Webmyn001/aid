import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { 
  FaCalendarAlt, FaTag, FaArrowLeft, FaClock, FaEye, FaThumbsUp, 
  FaShareAlt, FaWhatsapp, FaTwitter, FaFacebookF, FaLinkedinIn, FaCopy, FaCheck 
} from 'react-icons/fa';
import { MOCK_BLOGS } from './BlogList';

const API_BASE = 'https://aidconcept.vercel.app/api';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const shareUrl = `${API_BASE}/blogs/share/${id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${API_BASE}/blogs/${id}`);
      if (res.data.success) {
        setBlog(res.data.data);
      } else {
        const mockArticle = MOCK_BLOGS.find(b => b._id === id);
        if (mockArticle) {
          setBlog(mockArticle);
        } else {
          setError('Article not found.');
        }
      }
    } catch (err) {
      console.warn('Error connecting to backend database. Finding static article fallback:', err.message);
      const mockArticle = MOCK_BLOGS.find(b => b._id === id);
      if (mockArticle) {
        setBlog(mockArticle);
      } else {
        setError('Article not found.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center font-Outfit bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d2ab66]"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center font-Outfit bg-white px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{error || 'Article not found'}</h2>
        <p className="text-gray-500 mb-6 text-center">The article you are trying to view is unavailable.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 bg-[#d2ab66] text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:bg-[#d2ab66]/95 transition-all">
          <FaArrowLeft /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-Outfit pt-36 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#d2ab66] hover:text-[#000000] transition-colors"
        >
          <FaArrowLeft /> Back to Articles
        </Link>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            {blog.categories.map((c, idx) => (
              <Link
                key={idx}
                to={`/blog?category=${encodeURIComponent(c)}`}
                className="flex items-center gap-1 bg-[#d2ab66]/5 hover:bg-[#d2ab66]/15 text-[#d2ab66] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider transition-all"
              >
                <FaTag size={10} /> {c}
              </Link>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-[#d2ab66]" />
              {new Date(blog.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <FaClock className="text-[#d2ab66]" />
              {blog.readTime || '5 mins'}
            </span>
            <span className="flex items-center gap-1 text-[#d2ab66] font-bold">
              <FaThumbsUp />
              {blog.likes || 0} likes
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="uppercase tracking-widest text-[10px] font-bold text-gray-400">By {blog.byName || 'Admin'}</span>
          </div>
        </div>

        {/* Compulsory Featured Image */}
        <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden border border-[#d2ab66]/10 shadow-lg bg-gray-100">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog Content Flow */}
        <article className="prose prose-lg max-w-none text-gray-700 font-light leading-relaxed bg-gray-50/50 p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          {blog.descriptionTitle && (
            <p className="text-lg text-[#d2ab66] font-semibold italic">{blog.descriptionTitle}</p>
          )}
          <div dangerouslySetInnerHTML={{ __html: blog.description }} />

          {/* Optional Additional Image Showcase */}
          {blog.additionalImage && (
            <div className="mt-8 mb-4 aspect-[16/10] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden border border-[#d2ab66]/10 shadow-md bg-white">
              <img
                src={blog.additionalImage}
                alt="Editorial Design Showcase"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Tags Section */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center pt-6 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tags:</span>
              {blog.tags.map((t, idx) => (
                <Link
                  key={idx}
                  to={`/blog?tag=${encodeURIComponent(t)}`}
                  className="bg-white hover:bg-[#d2ab66]/10 hover:text-[#d2ab66] text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#d2ab66]/30 transition-all cursor-pointer"
                >
                  #{t}
                </Link>
              ))}
            </div>
          )}
        </article>

        {/* Share Section */}
        <div className="bg-gray-50/80 p-6 md:p-8 rounded-3xl border border-[#d2ab66]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <FaShareAlt className="text-[#d2ab66]" /> Share this Article
            </h4>
            <p className="text-gray-500 text-sm font-light">Share this editorial design insight with your social circles.</p>
          </div>
          
          <div className="flex flex-wrap gap-2.5 items-center">
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this article: "${blog.title}"\n${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white hover:bg-emerald-500 text-[#d2ab66] hover:text-white border border-[#d2ab66]/20 flex justify-center items-center transition-all duration-300 shadow-sm cursor-pointer"
              title="Share on WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>

            {/* Twitter / X */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out this article: "${blog.title}"`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white hover:bg-black text-[#d2ab66] hover:text-white border border-[#d2ab66]/20 flex justify-center items-center transition-all duration-300 shadow-sm cursor-pointer"
              title="Share on X (Twitter)"
            >
              <FaTwitter size={16} />
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white hover:bg-blue-600 text-[#d2ab66] hover:text-white border border-[#d2ab66]/20 flex justify-center items-center transition-all duration-300 shadow-sm cursor-pointer"
              title="Share on Facebook"
            >
              <FaFacebookF size={16} />
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white hover:bg-sky-700 text-[#d2ab66] hover:text-white border border-[#d2ab66]/20 flex justify-center items-center transition-all duration-300 shadow-sm cursor-pointer"
              title="Share on LinkedIn"
            >
              <FaLinkedinIn size={16} />
            </a>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className={`h-10 px-4 rounded-full border flex items-center gap-1.5 text-xs font-bold transition-all duration-300 shadow-sm cursor-pointer ${
                copied 
                  ? 'bg-emerald-500 border-transparent text-white' 
                  : 'bg-white border-[#d2ab66]/20 text-[#d2ab66] hover:bg-[#d2ab66]/10'
              }`}
            >
              {copied ? (
                <>
                  <FaCheck size={12} /> Link Copied
                </>
              ) : (
                <>
                  <FaCopy size={12} /> Copy Share Link
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom CTA / Share Section */}
        <div className="border-t border-[#d2ab66]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="font-bold text-gray-900 text-lg">Interested in learning more?</h4>
            <p className="text-gray-500 text-sm mt-0.5">Let's discuss how we can bring premium elegance to your space.</p>
          </div>
          <Link
            to="/contact"
            className="bg-[#d2ab66] hover:bg-[#0a0a0a] text-[#0a0a0a] hover:text-[#d2ab66] border border-transparent hover:border-[#d2ab66] px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-md"
          >
            Request Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
