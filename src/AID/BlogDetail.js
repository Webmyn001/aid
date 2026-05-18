import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaArrowLeft } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${API_BASE}/blogs/${id}`);
      if (res.data.success) {
        setBlog(res.data.data);
      } else {
        setError('Article not found.');
      }
    } catch (err) {
      setError('Article not found or server error.');
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
    <div className="min-h-screen bg-white font-Outfit pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#d2ab66] hover:text-[#d2ab66] transition-colors"
        >
          <FaArrowLeft /> Back to Articles
        </Link>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            {blog.categories.map((c, idx) => (
              <span key={idx} className="flex items-center gap-1 bg-[#d2ab66]/5 text-[#d2ab66] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                <FaTag size={10} /> {c}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-[#d2ab66]" />
              {new Date(blog.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span>•</span>
            <span className="uppercase tracking-widest text-xs font-semibold text-gray-400">By Admin</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden border border-[#d2ab66]/10 shadow-lg bg-gray-100">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none text-gray-700 font-light leading-relaxed whitespace-pre-line bg-gray-50/50 p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
          {blog.content}
        </article>

        {/* Bottom CTA / Share Section */}
        <div className="border-t border-[#d2ab66]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="font-bold text-gray-900 text-lg">Interested in learning more?</h4>
            <p className="text-gray-500 text-sm mt-0.5">Let's discuss how we can bring premium elegance to your space.</p>
          </div>
          <Link
            to="/contact"
            className="bg-[#d2ab66] hover:bg-[#d2ab66]/95 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md"
          >
            Request Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
