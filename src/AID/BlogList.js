import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaArrowRight, FaClock } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api';

const MOCK_BLOGS = [
  {
    _id: 'mock-1',
    title: "The Art of Modern Minimalist Living: Less is More",
    summary: "Discover how luxury minimalism combines function and premium natural materials to create highly relaxing, clutter-free living rooms.",
    content: `Luxury minimalism is not about lack; it is about perfect balance. In this article, we explore the integration of organic textures, muted earth tones, and bespoke wooden accents to elevate small and large spaces alike.

Key Elements of Modern Minimalism:
1. Multi-Functional Furniture: Selecting tailored consoles and built-ins that keep clutter hidden.
2. Natural Lighting: Maximizing window apertures and using sheer treatments to invite clean sunlight.
3. High-Contrast Textures: Mixing raw stucco wall finishes with ultra-soft fabrics to create depth without relying on busy colors.

Minimalism doesn't mean boring. By choosing a refined HSL/Gold color palette and incorporating selected statement plants, your space will feel both lavish and peaceful.`,
    featuredImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
    additionalImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800", // Optional illustration
    categories: ["Interior Design", "Minimalism"],
    tags: ["Minimalism", "Luxury", "Living Room"],
    author: "AID Concepts Editorial",
    readTime: "4 mins",
    createdAt: "2026-05-18T10:00:00.000Z",
    views: 145,
    likes: 42
  },
  {
    _id: 'mock-2',
    title: "5 Architectural Trends Setting the Standard in 2026",
    summary: "From curved structural geometry to biophilic lighting integrations, explore the future of modern bespoke architectural design.",
    content: `Architecture is undergoing a paradigm shift. Designers are focusing on biophilic spaces that merge indoor comfort with organic outdoor ecosystems, utilizing smart automation and energy-efficient lighting panels.

Top Trends We Are Deploying Today:
- Curved Arches & Organic Silhouettes: Breaking away from flat rectangular boxes to create fluid transitions.
- Integrated Smart Automation: Blinds, HVAC controls, and security interfaces blending seamlessly into custom wall panels.
- Luxury Biophilic Courtyards: Indoor garden alcoves that clean the air and offer deep mental tranquility.

By combining cutting-edge structural precision with timeless natural elements, modern architecture is setting a new benchmark for comfortable luxury.`,
    featuredImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
    additionalImage: "", // Optional image (intentionally blank to test the optional feature!)
    categories: ["Architecture", "Trends"],
    tags: ["Architecture", "2026 Trends", "Luxury Layouts"],
    author: "AID Concepts Editorial",
    readTime: "6 mins",
    createdAt: "2026-05-18T12:00:00.000Z",
    views: 210,
    likes: 68
  },
  {
    _id: 'mock-3',
    title: "The Ultimate Guide to Selecting Premium Lighting for High-End Spaces",
    summary: "Lighting is the unsung hero of interior styling. Learn how to layer ambient, task, and accent lighting to dramatically enhance visual depth.",
    content: `Many homeowners invest heavily in bespoke furniture and stucco walls, only to wash the entire space with flat, uninspired white light. Here is our step-by-step masterclass on lighting layering to create rich architectural shadows.

The Three Layers of Elite Lighting:
1. Ambient Layer: Recessed LED ceiling strips and custom POP channels that mimic natural sky illumination.
2. Task Layer: Dedicated directional lamps or pendants positioned over dining consoles, desks, or reading corners.
3. Accent Layer: Golden wall sconces and micro-spotlights targeting artwork, plants, or specific material textures.

Layering lighting isn't just aesthetic; it completely transforms the psychological mood of your space as day shifts to evening.`,
    featuredImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800",
    additionalImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800", // Optional illustration
    categories: ["Lighting", "Home Styling"],
    tags: ["Lighting Layering", "Bespoke Styling", "Luxury Living"],
    author: "AID Concepts Editorial",
    readTime: "5 mins",
    createdAt: "2026-05-18T08:00:00.000Z",
    views: 98,
    likes: 31
  }
];

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/blogs`);
      if (res.data.success && res.data.data.length > 0) {
        // Sort chronologically descending
        const sorted = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(sorted);
      } else {
        const sortedMock = MOCK_BLOGS.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(sortedMock);
      }
    } catch (err) {
      console.warn('Error fetching backend blogs. Using mock testing fallback blogs:', err.message);
      const sortedMock = MOCK_BLOGS.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBlogs(sortedMock);
    } finally {
      setLoading(false);
    }
  };

  // Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div className="min-h-screen bg-white font-Outfit pt-36 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
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
        <div className="space-y-12">
          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentBlogs.map((blog) => (
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
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                        <FaClock className="text-[#d2ab66]" />
                        {blog.readTime || '5 mins'}
                      </span>
                      {blog.categories.slice(0, 1).map((c, idx) => (
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
                    {blog.summary || blog.content}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider truncate">
                        By {blog.author || 'Admin'}
                      </span>
                      <span className="text-[8px] sm:text-[10px] text-gray-400 mt-0.5 font-medium whitespace-nowrap">
                        {blog.views || 0} views • {blog.likes || 0} likes
                      </span>
                    </div>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#d2ab66] group-hover:text-[#000000] transition-colors shrink-0"
                    >
                      Read Article <FaArrowRight className="text-[10px] sm:text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Premium Pagination Controls (renders when more than 10 blogs exist) */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-3 pt-12">
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.max(prev - 1, 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-full border border-[#d2ab66]/20 text-[#d2ab66] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#d2ab66] hover:text-[#0a0a0a] transition-all duration-300 font-bold text-sm"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-10 h-10 rounded-full border font-bold text-sm transition-all duration-300 ${
                    currentPage === pageNum
                      ? 'bg-[#d2ab66] border-transparent text-[#0a0a0a]'
                      : 'border-[#d2ab66]/20 text-[#d2ab66] hover:bg-[#d2ab66]/10'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => {
                  setCurrentPage(prev => Math.min(prev + 1, totalPages));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-full border border-[#d2ab66]/20 text-[#d2ab66] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#d2ab66] hover:text-[#0a0a0a] transition-all duration-300 font-bold text-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogList;
export { MOCK_BLOGS };
