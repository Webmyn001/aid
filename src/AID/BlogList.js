import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaArrowRight } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/blogs`);
      if (res.data.success) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-Outfit pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <div className="inline-block">
          <span className="text-[#d2ab66] text-xs font-bold tracking-[0.25em] uppercase bg-[#d2ab66]/5 px-4 py-1.5 rounded-full">
            Inspiration & Ideas
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          AID Concepts <span className="text-[#d2ab66]">Journal</span>
        </h1>
        <p className="text-gray-500 font-light text-lg">
          Expert insights, industry trends, and creative inspiration for elegant interior design and spaces.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d2ab66]"></div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-[#d2ab66]/20 max-w-md mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-500 mb-6">Our writers are busy crafting beautiful new design insights. Check back soon!</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-[#d2ab66] text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:bg-[#d2ab66]/95 transition-all">
            Return Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white rounded-3xl overflow-hidden border border-[#d2ab66]/10 hover:border-[#d2ab66]/35 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full"
            >
              {/* Featured Image */}
              <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-[#d2ab66]" />
                    {new Date(blog.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <div className="flex gap-1.5">
                    {blog.categories.slice(0, 2).map((c, idx) => (
                      <span key={idx} className="flex items-center gap-0.5 bg-[#d2ab66]/5 text-[#d2ab66] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider scale-90">
                        <FaTag size={8} /> {c}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#d2ab66] transition-colors duration-300 leading-snug line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-gray-500 font-light text-sm line-clamp-3 flex-grow leading-relaxed">
                  {blog.content}
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    By Admin
                  </span>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#d2ab66] group-hover:text-[#d2ab66] transition-colors"
                  >
                    Read Article <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogList;
