import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import confetti from 'canvas-confetti';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaPlus, FaTrash, FaEdit, FaSignOutAlt, FaBlog, FaEnvelope, FaLock, FaImage, FaTag, FaUser, FaHeading, FaSearch, FaSpinner, FaEye, FaEyeSlash, FaChartBar, FaThumbsUp, FaShareAlt } from 'react-icons/fa';

const API_BASE = 'https://aidconcept.vercel.app/api';

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'blockquote', 'code-block',
  'link',
];

function AdminSecure() {
  const [token, setToken] = useState(
    localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken') || ''
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogBy, setBlogBy] = useState('');
  const [blogDescTitle, setBlogDescTitle] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const [blogKeywords, setBlogKeywords] = useState('');
  const [blogCategories, setBlogCategories] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [blogAdditionalImage, setBlogAdditionalImage] = useState(null);
  const [additionalImagePreview, setAdditionalImagePreview] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  const analytics = useMemo(() => {
    const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0);
    const totalLikes = blogs.reduce((sum, b) => sum + (b.likes || 0), 0);
    const totalShares = blogs.reduce((sum, b) => sum + (b.shares || 0), 0);
    const chartData = blogs.map(b => ({
      title: b.title.length > 22 ? b.title.substring(0, 22) + '...' : b.title,
      views: b.views || 0,
      likes: b.likes || 0,
      shares: b.shares || 0,
    })).sort((a, b) => b.views - a.views);
    return { totalViews, totalLikes, totalShares, chartData };
  }, [blogs]);

  const fireConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#d2ab66', '#0a0a0a', '#b73034', '#f3e1b9'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#d2ab66', '#0a0a0a', '#b73034', '#f3e1b9'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const blogRes = await axios.get(`${API_BASE}/blogs`);
      if (blogRes.data.success) {
        setBlogs(blogRes.data.data);
      }

      const contactRes = await axios.get(`${API_BASE}/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (contactRes.data.success) {
        setInquiries(contactRes.data.data);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      if (res.data.success) {
        const adminToken = res.data.token;
        if (rememberMe) {
          localStorage.setItem('adminToken', adminToken);
          sessionStorage.removeItem('adminToken');
        } else {
          sessionStorage.setItem('adminToken', adminToken);
          localStorage.removeItem('adminToken');
        }
        setToken(adminToken);
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminToken');
    setToken('');
    setBlogs([]);
    setInquiries([]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogAdditionalImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdditionalImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!blogTitle || !blogDescription) {
      setFormError('Title and description are required.');
      return;
    }

    if (!isEditing && !blogImage) {
      setFormError('Please select a featured image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('byName', blogBy);
    formData.append('descriptionTitle', blogDescTitle);
    formData.append('description', blogDescription);
    formData.append('keywords', blogKeywords);
    formData.append('categories', blogCategories);
    if (blogImage) {
      formData.append('image', blogImage);
    }
    if (blogAdditionalImage) {
      formData.append('additionalImage', blogAdditionalImage);
    }

    try {
      setSubmitting(true);
      let res;
      if (isEditing) {
        res = await axios.put(`${API_BASE}/blogs/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        res = await axios.post(`${API_BASE}/blogs`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      if (res.data.success) {
        setFormSuccess(isEditing ? 'Blog updated successfully!' : 'Blog created successfully!');
        fireConfetti();
        resetBlogForm();
        fetchDashboardData();
      }
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error processing request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditInit = (blog) => {
    setIsEditing(true);
    setEditId(blog._id);
    setBlogTitle(blog.title);
    setBlogBy(blog.byName || '');
    setBlogDescTitle(blog.descriptionTitle || '');
    setBlogDescription(blog.description || '');
    setBlogKeywords(blog.keywords || '');
    setBlogCategories(blog.categories.join(', '));
    setImagePreview(blog.featuredImage);
    setAdditionalImagePreview(blog.additionalImage || '');
    setBlogImage(null);
    setBlogAdditionalImage(null);
    setActiveTab('blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetBlogForm = () => {
    setIsEditing(false);
    setEditId('');
    setBlogTitle('');
    setBlogBy('');
    setBlogDescTitle('');
    setBlogDescription('');
    setBlogKeywords('');
    setBlogCategories('');
    setBlogImage(null);
    setImagePreview('');
    setBlogAdditionalImage(null);
    setAdditionalImagePreview('');
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      setDeletingId(id);
      const res = await axios.delete(`${API_BASE}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        fetchDashboardData();
      }
    } catch (err) {
      alert('Error deleting post');
    } finally {
      setDeletingId('');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 font-Outfit">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-[#d2ab66]/20">
          <div>
            <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-[#d2ab66]/10 text-[#d2ab66]">
              <FaLock className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Portal
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500 font-light">
              AID Concepts — Secure Access
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {loginError && (
              <div className="bg-[#b73034]/5 border border-[#b73034]/20 text-[#b73034] text-sm px-4 py-3 rounded-lg text-center font-medium">
                {loginError}
              </div>
            )}
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d2ab66]/30 focus:border-[#d2ab66]"
                  placeholder="admin@aidconcepts.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pr-11 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d2ab66]/30 focus:border-[#d2ab66]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-700 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#d2ab66] focus:ring-[#d2ab66] cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer select-none">
                Remember me
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loginLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-[#0a0a0a] hover:bg-[#d2ab66] hover:text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d2ab66] transition-all duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loginLoading ? (
                  <span className="flex items-center gap-2"><FaSpinner className="animate-spin" size={16} /> Signing In...</span>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-Outfit pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#0c0c0c] p-6 rounded-2xl shadow-lg border border-[#d2ab66]/20 mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Admin Control Panel</h1>
          <p className="text-gray-400 text-sm mt-1 font-light">Manage blog articles & client inquiries for <span className="text-[#d2ab66] font-semibold">AID Concepts</span></p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#d2ab66] hover:bg-[#0a0a0a] text-[#0a0a0a] hover:text-[#d2ab66] border border-transparent hover:border-[#d2ab66] px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md"
        >
          <FaSignOutAlt /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-2">
          <button
            onClick={() => { setActiveTab('blogs'); resetBlogForm(); }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'blogs'
                ? 'bg-[#d2ab66] text-[#0a0a0a] shadow-md'
                : 'text-gray-600 hover:bg-[#d2ab66]/5 hover:text-[#0a0a0a]'
            }`}
          >
            <FaBlog /> Manage Blogs
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'analytics'
                ? 'bg-[#d2ab66] text-[#0a0a0a] shadow-md'
                : 'text-gray-600 hover:bg-[#d2ab66]/5 hover:text-[#0a0a0a]'
            }`}
          >
            <FaChartBar /> Analytics
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'inquiries'
                ? 'bg-[#d2ab66] text-[#0a0a0a] shadow-md'
                : 'text-gray-600 hover:bg-[#d2ab66]/5 hover:text-[#0a0a0a]'
            }`}
          >
            <FaEnvelope /> Contact Inquiries
          </button>
        </div>

        <div className="lg:col-span-3 space-y-8">
          {activeTab === 'blogs' ? (
            <>
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                  <FaBlog className="text-[#d2ab66]" />
                  {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>

                <form onSubmit={handleBlogSubmit} className="space-y-6">
                  {formError && (
                    <div className="bg-[#b73034]/5 border border-[#b73034]/20 text-[#b73034] px-4 py-3 rounded-lg text-sm font-medium">
                      {formError}
                    </div>
                  )}
                  {formSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm font-medium">
                      {formSuccess}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Title</label>
                        <input
                          type="text"
                          required
                          value={blogTitle}
                          onChange={(e) => setBlogTitle(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2ab66]/20 focus:border-[#d2ab66]"
                          placeholder="e.g. 5 Modern Minimalist Dining Table Ideas"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FaUser className="inline mr-1.5 text-[#d2ab66]" size={12} /> By: Name
                        </label>
                        <input
                          type="text"
                          value={blogBy}
                          onChange={(e) => setBlogBy(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2ab66]/20 focus:border-[#d2ab66]"
                          placeholder="e.g. John Doe or AID Concepts Editorial"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FaHeading className="inline mr-1.5 text-[#d2ab66]" size={12} /> Description Title (Subtitle)
                        </label>
                        <textarea
                          rows={3}
                          value={blogDescTitle}
                          onChange={(e) => setBlogDescTitle(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2ab66]/20 focus:border-[#d2ab66] resize-none"
                          placeholder="A short subtitle or teaser for the article"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FaSearch className="inline mr-1.5 text-[#d2ab66]" size={12} /> Keywords (Meta SEO)
                        </label>
                        <input
                          type="text"
                          value={blogKeywords}
                          onChange={(e) => setBlogKeywords(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2ab66]/20 focus:border-[#d2ab66]"
                          placeholder="interior design, minimalist home, luxury decor (comma separated)"
                        />
                        {blogKeywords && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {blogKeywords.split(',').map((kw, idx) => (
                              <span key={idx} className="bg-[#d2ab66]/10 text-[#d2ab66] font-medium text-xs px-2.5 py-1 rounded-full">
                                {kw.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-gray-400 mt-1">Used for search engine optimization</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FaTag className="inline mr-1.5 text-[#d2ab66]" size={12} /> Categories / Tags
                        </label>
                        <input
                          type="text"
                          value={blogCategories}
                          onChange={(e) => setBlogCategories(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d2ab66]/20 focus:border-[#d2ab66]"
                          placeholder="Interior, Furniture, Lighting (comma separated)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FaImage className="inline mr-1.5 text-[#d2ab66]" size={12} /> Featured Image <span className="text-[#b73034]">*</span>
                        </label>
                        <div className="border-2 border-dashed border-[#d2ab66]/30 hover:border-[#d2ab66]/60 rounded-2xl p-3 flex flex-col items-center justify-center bg-[#fafafa] cursor-pointer transition-all duration-300 relative min-h-[160px]">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          {imagePreview ? (
                            <div className="relative w-full h-full max-h-[150px] overflow-hidden rounded-xl">
                              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl">
                                <span className="text-white text-xs font-medium flex items-center gap-1"><FaImage /> Change</span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center space-y-1.5">
                              <FaImage className="mx-auto text-3xl text-[#d2ab66]" />
                              <span className="block text-sm font-medium text-gray-600">Featured Image</span>
                              <span className="block text-xs text-gray-400">PNG, JPG (Max 5MB)</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <FaImage className="inline mr-1.5 text-[#d2ab66]" size={12} /> Additional Image <span className="text-gray-400 font-normal text-xs">(optional)</span>
                        </label>
                        <div className="border-2 border-dashed border-gray-200 hover:border-[#d2ab66]/40 rounded-2xl p-3 flex flex-col items-center justify-center bg-gray-50 cursor-pointer transition-all duration-300 relative min-h-[140px]">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAdditionalImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          {additionalImagePreview ? (
                            <div className="relative w-full h-full max-h-[130px] overflow-hidden rounded-xl">
                              <img src={additionalImagePreview} alt="Additional Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl">
                                <span className="text-white text-xs font-medium flex items-center gap-1"><FaImage /> Change</span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center space-y-1.5">
                              <FaImage className="mx-auto text-2xl text-gray-300" />
                              <span className="block text-sm font-medium text-gray-500">Additional Image</span>
                              <span className="block text-xs text-gray-400">Shown within the article body</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Blog Content)</label>
                    <div className="quill-wrapper">
                      <ReactQuill
                        theme="snow"
                        value={blogDescription}
                        onChange={setBlogDescription}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Write your article here... Use the toolbar above for bold, italic, headings, lists, etc."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                    {isEditing && (
                      <button
                        type="button"
                        onClick={resetBlogForm}
                        disabled={submitting}
                        className="px-6 py-2.5 rounded-full border border-gray-300 font-semibold text-gray-600 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-[#0a0a0a] hover:bg-[#d2ab66] hover:text-[#0a0a0a] text-white px-8 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2"><FaSpinner className="animate-spin" size={16} /> {isEditing ? 'Updating...' : 'Publishing...'}</span>
                      ) : (
                        <><span>{isEditing ? <FaEdit /> : <FaPlus />}</span> {isEditing ? 'Update Article' : 'Publish Article'}</>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">Published Articles</h2>

                {loading ? (
                  <div className="flex justify-center items-center py-16">
                    <FaSpinner className="animate-spin text-[#d2ab66]" size={32} />
                  </div>
                ) : blogs.length === 0 ? (
                  <div className="text-center py-12 bg-[#fafafa] rounded-2xl border border-dashed border-gray-200">
                    <FaBlog className="mx-auto text-4xl text-gray-300 mb-3" />
                    <span className="block font-medium text-gray-600">No blog posts found</span>
                    <span className="block text-sm text-gray-400 mt-1">Publish your first article above</span>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-700 font-semibold text-sm">
                          <th className="py-4 px-4">Image</th>
                          <th className="py-4 px-4">Title</th>
                          <th className="py-4 px-4">Categories</th>
                          <th className="py-4 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-sm">
                        {blogs.map((blog) => (
                          <tr key={blog._id} className="hover:bg-[#fafafa] transition-colors">
                            <td className="py-4 px-4">
                              <img src={blog.featuredImage} alt={blog.title} className="w-16 h-10 object-cover rounded-md border border-gray-200" />
                            </td>
                            <td className="py-4 px-4 font-semibold text-gray-900 max-w-[200px] truncate">{blog.title}</td>
                            <td className="py-4 px-4">
                              <div className="flex flex-wrap gap-1">
                                {blog.categories.map((c, idx) => (
                                  <span key={idx} className="bg-[#d2ab66]/10 text-[#d2ab66] font-medium text-xs px-2.5 py-0.5 rounded-full">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleEditInit(blog)}
                                  disabled={deletingId === blog._id}
                                  className="p-2.5 text-[#d2ab66] hover:bg-[#d2ab66]/10 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                  title="Edit Post"
                                >
                                  <FaEdit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlog(blog._id)}
                                  disabled={deletingId === blog._id}
                                  className="p-2.5 text-[#b73034] hover:bg-[#b73034]/10 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                  title="Delete Post"
                                >
                                  {deletingId === blog._id ? (
                                    <FaSpinner className="animate-spin" size={16} />
                                  ) : (
                                    <FaTrash size={16} />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : activeTab === 'analytics' ? (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                <FaChartBar className="text-[#d2ab66]" /> Analytics Dashboard
              </h2>

              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <FaSpinner className="animate-spin text-[#d2ab66]" size={32} />
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-12 bg-[#fafafa] rounded-2xl border border-dashed border-gray-200">
                  <FaChartBar className="mx-auto text-4xl text-gray-300 mb-3" />
                  <span className="block font-medium text-gray-600">No data yet</span>
                  <span className="block text-sm text-gray-400 mt-1">Publish articles to see analytics</span>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-[#0c0c0c] border border-[#d2ab66]/20 rounded-2xl p-6 text-center">
                      <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Total Articles</p>
                      <p className="text-3xl sm:text-4xl font-extrabold text-[#d2ab66] mt-2">{blogs.length}</p>
                    </div>
                    <div className="bg-[#0c0c0c] border border-[#d2ab66]/20 rounded-2xl p-6 text-center">
                      <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Total Views</p>
                      <p className="text-3xl sm:text-4xl font-extrabold text-[#d2ab66] mt-2">{analytics.totalViews}</p>
                    </div>
                    <div className="bg-[#0c0c0c] border border-[#d2ab66]/20 rounded-2xl p-6 text-center">
                      <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Total Likes</p>
                      <p className="text-3xl sm:text-4xl font-extrabold text-[#d2ab66] mt-2">{analytics.totalLikes}</p>
                    </div>
                    <div className="bg-[#0c0c0c] border border-[#d2ab66]/20 rounded-2xl p-6 text-center">
                      <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Total Shares</p>
                      <p className="text-3xl sm:text-4xl font-extrabold text-[#d2ab66] mt-2">{analytics.totalShares}</p>
                    </div>
                  </div>

                  <div className="bg-[#fafafa] rounded-2xl p-4 md:p-6 border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Views per Article</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analytics.chartData} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="title" tick={{ fontSize: 11, fill: '#6b7280' }} angle={-25} textAnchor="end" height={70} />
                        <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                        <Tooltip
                          contentStyle={{ borderRadius: '12px', border: '1px solid #d2ab66', fontSize: '13px' }}
                          labelStyle={{ fontWeight: 'bold', color: '#0a0a0a' }}
                        />
                        <Bar dataKey="views" fill="#d2ab66" radius={[6, 6, 0, 0]} barSize={36} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="overflow-x-auto">
                    <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Per-Article Breakdown</h3>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-700 font-semibold text-sm">
                          <th className="py-3 px-3">Article</th>
                          <th className="py-3 px-3 text-center"><FaEye className="inline mr-1" size={12} />Views</th>
                          <th className="py-3 px-3 text-center"><FaThumbsUp className="inline mr-1" size={11} />Likes</th>
                          <th className="py-3 px-3 text-center"><FaShareAlt className="inline mr-1" size={11} />Shares</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-sm">
                        {blogs.map((blog) => (
                          <tr key={blog._id} className="hover:bg-[#fafafa] transition-colors">
                            <td className="py-3 px-3 font-semibold text-gray-900 max-w-[280px] truncate">{blog.title}</td>
                            <td className="py-3 px-3 text-center font-medium text-gray-700">{blog.views || 0}</td>
                            <td className="py-3 px-3 text-center font-medium text-gray-700">{blog.likes || 0}</td>
                            <td className="py-3 px-3 text-center font-medium text-gray-700">{blog.shares || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">Client Contact Inquiries</h2>

              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <FaSpinner className="animate-spin text-[#d2ab66]" size={32} />
                </div>
              ) : inquiries.length === 0 ? (
                <div className="text-center py-12 bg-[#fafafa] rounded-2xl border border-dashed border-gray-200">
                  <FaEnvelope className="mx-auto text-4xl text-gray-300 mb-3" />
                  <span className="block font-medium text-gray-600">No contact inquiries yet</span>
                  <span className="block text-sm text-gray-400 mt-1">Client messages will appear here</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {inquiries.map((inq) => (
                    <div
                      key={inq._id}
                      className="p-6 rounded-2xl bg-[#fafafa] border border-gray-100 hover:border-[#d2ab66]/30 transition-all duration-300 space-y-4"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{inq.name}</h3>
                          <span className="text-[#d2ab66] font-medium text-sm">{inq.email}</span>
                        </div>
                        <span className="bg-[#d2ab66]/10 text-[#d2ab66] font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                          {inq.type}
                        </span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-line bg-white p-4 rounded-xl border border-gray-100 shadow-inner">
                        {inq.message}
                      </p>
                      <span className="block text-xs text-gray-400 font-medium">
                        Received on: {new Date(inq.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSecure;
