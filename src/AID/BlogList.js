import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaArrowRight, FaClock, FaSearch, FaTimes } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api';

const MOCK_BLOGS = [
  {
    _id: 'mock-1',
    title: "The Art of Modern Minimalist Living: Less is More",
    byName: "AID Concepts Editorial",
    descriptionTitle: "Discover the beauty of minimalist luxury in modern interiors",
    description: `<p>Luxury minimalism is not about lack; it is about perfect balance. In this article, we explore the integration of organic textures, muted earth tones, and bespoke wooden accents to elevate small and large spaces alike.</p><h2>Key Elements of Modern Minimalism</h2><p><strong>1. Multi-Functional Furniture:</strong> Selecting tailored consoles and built-ins that keep clutter hidden.</p><p><strong>2. Natural Lighting:</strong> Maximizing window apertures and using sheer treatments to invite clean sunlight.</p><p><strong>3. High-Contrast Textures:</strong> Mixing raw stucco wall finishes with ultra-soft fabrics to create depth without relying on busy colors.</p><p>Minimalism doesn't mean boring. By choosing a refined <em>HSL/Gold color palette</em> and incorporating selected statement plants, your space will feel both lavish and peaceful.</p>`,
    keywords: "minimalist interior design, luxury minimalism, modern home decor, clutter-free living",
    featuredImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
    additionalImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
    categories: ["Interior Design", "Minimalism"],
    tags: ["Minimalism", "Luxury", "Living Room"],
    readTime: "4 mins",
    createdAt: "2026-05-18T10:00:00.000Z",
    views: 145,
    likes: 42
  },
  {
    _id: 'mock-2',
    title: "5 Architectural Trends Setting the Standard in 2026",
    byName: "AID Concepts Editorial",
    descriptionTitle: "Curved geometry, biophilic design, and smart automation are reshaping modern architecture",
    description: `<p>Architecture is undergoing a paradigm shift. Designers are focusing on <strong>biophilic spaces</strong> that merge indoor comfort with organic outdoor ecosystems, utilizing smart automation and energy-efficient lighting panels.</p><h2>Top Trends We Are Deploying Today</h2><ul><li><strong>Curved Arches & Organic Silhouettes:</strong> Breaking away from flat rectangular boxes to create fluid transitions.</li><li><strong>Integrated Smart Automation:</strong> Blinds, HVAC controls, and security interfaces blending seamlessly into custom wall panels.</li><li><strong>Luxury Biophilic Courtyards:</strong> Indoor garden alcoves that clean the air and offer deep mental tranquility.</li></ul><p>By combining cutting-edge structural precision with timeless natural elements, modern architecture is setting a new benchmark for <em>comfortable luxury</em>.</p>`,
    keywords: "architecture trends 2026, biophilic design, smart home automation, curved architecture",
    featuredImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
    additionalImage: "",
    categories: ["Architecture", "Trends"],
    tags: ["Architecture", "2026 Trends", "Luxury Layouts"],
    readTime: "6 mins",
    createdAt: "2026-05-18T12:00:00.000Z",
    views: 210,
    likes: 68
  },
  {
    _id: 'mock-3',
    title: "The Ultimate Guide to Selecting Premium Lighting for High-End Spaces",
    byName: "AID Concepts Editorial",
    descriptionTitle: "Master the art of lighting layering to transform your interiors",
    description: `<p>Many homeowners invest heavily in bespoke furniture and stucco walls, only to wash the entire space with flat, uninspired white light. Here is our step-by-step masterclass on <strong>lighting layering</strong> to create rich architectural shadows.</p><h2>The Three Layers of Elite Lighting</h2><ol><li><strong>Ambient Layer:</strong> Recessed LED ceiling strips and custom POP channels that mimic natural sky illumination.</li><li><strong>Task Layer:</strong> Dedicated directional lamps or pendants positioned over dining consoles, desks, or reading corners.</li><li><strong>Accent Layer:</strong> Golden wall sconces and micro-spotlights targeting artwork, plants, or specific material textures.</li></ol><p>Layering lighting isn't just aesthetic; it completely transforms the <em>psychological mood</em> of your space as day shifts to evening.</p>`,
    keywords: "premium lighting design, luxury lighting guide, ambient lighting, accent lighting, home illumination",
    featuredImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800",
    additionalImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800",
    categories: ["Lighting", "Home Styling"],
    tags: ["Lighting Layering", "Bespoke Styling", "Luxury Living"],
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

  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Load tag/search query from URL on mount or URL change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tagParam = params.get('tag');
    const searchParam = params.get('search');
    const catParam = params.get('category');

    setSelectedTag(tagParam || '');
    setSearchQuery(searchParam || '');
    setSelectedCategory(catParam || '');
  }, [location.search]);

  // Fetch blogs when query parameters or active filters change
  useEffect(() => {
    fetchBlogs();
  }, [searchQuery, selectedTag, selectedCategory]);

  const updateFilters = (query, tag, category) => {
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (tag) params.set('tag', tag);
    if (category) params.set('category', category);
    
    const newSearch = params.toString() ? `?${params.toString()}` : '';
    if (location.search !== newSearch) {
      navigate(`/blog${newSearch}`, { replace: true });
    }
  };

  const filterMockBlogs = () => {
    return MOCK_BLOGS.filter(blog => {
      if (selectedTag) {
        const tagMatch = blog.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase());
        if (!tagMatch) return false;
      }
      if (selectedCategory) {
        const catMatch = blog.categories.some(c => c.toLowerCase() === selectedCategory.toLowerCase());
        if (!catMatch) return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = blog.title.toLowerCase().includes(query);
        const matchesDescTitle = (blog.descriptionTitle || '').toLowerCase().includes(query);
        const matchesDesc = (blog.description || '').toLowerCase().includes(query);
        const matchesBy = (blog.byName || '').toLowerCase().includes(query);
        const matchesKeywords = (blog.keywords || '').toLowerCase().includes(query);
        const matchesTags = blog.tags.some(t => t.toLowerCase().includes(query));
        const matchesCategories = blog.categories.some(c => c.toLowerCase().includes(query));
        return matchesTitle || matchesDescTitle || matchesDesc || matchesBy || matchesKeywords || matchesTags || matchesCategories;
      }
      return true;
    });
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedTag) params.tag = selectedTag;
      if (selectedCategory) params.category = selectedCategory;

      const res = await axios.get(`${API_BASE}/blogs`, { params });
      if (res.data.success) {
        // Sort chronologically descending
        const sorted = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(sorted);
      } else {
        const sortedMock = filterMockBlogs().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(sortedMock);
      }
    } catch (err) {
      console.warn('Error fetching backend blogs. Using mock testing fallback blogs:', err.message);
      const sortedMock = filterMockBlogs().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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

      {/* Search and Filters Section */}
      <div className="max-w-4xl mx-auto mb-12 space-y-6">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search articles by title, tags, or content..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              updateFilters(e.target.value, selectedTag, selectedCategory);
            }}
            className="w-full bg-gray-50/50 focus:bg-white text-gray-900 placeholder-gray-400 font-light px-6 py-4 pl-12 pr-10 rounded-2xl border border-gray-200 focus:border-[#d2ab66] focus:ring-2 focus:ring-[#d2ab66]/10 outline-none transition-all shadow-sm group-hover:border-[#d2ab66]/30 text-base font-Outfit"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#d2ab66] transition-colors">
            <FaSearch size={18} />
          </span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                updateFilters('', selectedTag, selectedCategory);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <FaTimes size={16} />
            </button>
          )}
        </div>

        {/* Filter Badges & Reset */}
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            {/* Tag Badge */}
            {selectedTag && (
              <span className="inline-flex items-center gap-1.5 bg-[#d2ab66]/10 text-[#d2ab66] text-xs font-bold px-3 py-1.5 rounded-full border border-[#d2ab66]/20">
                Tag: {selectedTag}
                <button
                  onClick={() => {
                    setSelectedTag('');
                    updateFilters(searchQuery, '', selectedCategory);
                  }}
                  className="hover:text-black transition-colors ml-1"
                >
                  <FaTimes size={10} />
                </button>
              </span>
            )}
            
            {/* Category Badge */}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 bg-[#d2ab66]/10 text-[#d2ab66] text-xs font-bold px-3 py-1.5 rounded-full border border-[#d2ab66]/20">
                Category: {selectedCategory}
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    updateFilters(searchQuery, selectedTag, '');
                  }}
                  className="hover:text-black transition-colors ml-1"
                >
                  <FaTimes size={10} />
                </button>
              </span>
            )}

            {/* Popular Tags List */}
            {!selectedTag && !selectedCategory && !searchQuery && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Popular Tags:</span>
                {['Minimalism', 'Luxury', 'Architecture', 'Lighting'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(tag);
                      updateFilters(searchQuery, tag, selectedCategory);
                    }}
                    className="bg-gray-100 hover:bg-[#d2ab66]/10 hover:text-[#d2ab66] text-gray-600 px-3 py-1 rounded-full font-medium transition-all"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear All Button */}
          {(searchQuery || selectedTag || selectedCategory) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('');
                setSelectedCategory('');
                navigate('/blog', { replace: true });
              }}
              className="text-xs font-bold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-wider"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d2ab66]"></div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-[#d2ab66]/25 max-w-md mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-500 mb-6 font-light">Try adjusting your keywords or clearing the active filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('');
              setSelectedCategory('');
              navigate('/blog', { replace: true });
            }}
            className="inline-flex items-center gap-2 bg-[#d2ab66] text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:bg-[#d2ab66]/95 transition-all"
          >
            Clear Filters
          </button>
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
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedCategory(c);
                            updateFilters(searchQuery, selectedTag, c);
                          }}
                          className="flex items-center gap-0.5 bg-[#d2ab66]/5 hover:bg-[#d2ab66]/15 text-[#d2ab66] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider scale-90 transition-all cursor-pointer"
                        >
                          <FaTag size={8} /> {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#d2ab66] transition-colors duration-300 leading-snug line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-500 font-light text-sm line-clamp-3 flex-grow leading-relaxed">
                    {blog.descriptionTitle || blog.summary || (blog.description ? blog.description.replace(/<[^>]*>/g, '').substring(0, 200) : '')}
                  </p>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {blog.tags.map((t, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedTag(t);
                            updateFilters(searchQuery, t, selectedCategory);
                          }}
                          className="text-[10px] font-medium bg-gray-50 hover:bg-[#d2ab66]/10 hover:text-[#d2ab66] text-gray-500 border border-gray-100 rounded px-2.5 py-1 transition-all cursor-pointer"
                        >
                          #{t}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider truncate">
                        By {blog.byName || 'Admin'}
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
