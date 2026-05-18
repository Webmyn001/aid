import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaEdit, FaSignOutAlt, FaBlog, FaEnvelope, FaLock, FaImage, FaTag } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api';

function AdminSecure() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState('blogs'); // 'blogs' or 'inquiries'
  const [blogs, setBlogs] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Blog Form State (Create / Edit)
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategories, setBlogCategories] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch blogs
      const blogRes = await axios.get(`${API_BASE}/blogs`);
      if (blogRes.data.success) {
        setBlogs(blogRes.data.data);
      }

      // Fetch inquiries
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
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      if (res.data.success) {
        const adminToken = res.data.token;
        localStorage.setItem('adminToken', adminToken);
        setToken(adminToken);
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Authentication failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setBlogs([]);
    setInquiries([]);
  };

  // Image change handler
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

  // Create or Update Blog
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!blogTitle || !blogContent) {
      setFormError('Title and content are required.');
      return;
    }

    if (!isEditing && !blogImage) {
      setFormError('Please select a featured image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('content', blogContent);
    formData.append('categories', blogCategories);
    if (blogImage) {
      formData.append('image', blogImage);
    }

    try {
      setLoading(true);
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
        resetBlogForm();
        fetchDashboardData();
      }
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error processing request');
    } finally {
      setLoading(false);
    }
  };

  const handleEditInit = (blog) => {
    setIsEditing(true);
    setEditId(blog._id);
    setBlogTitle(blog.title);
    setBlogContent(blog.content);
    setBlogCategories(blog.categories.join(', '));
    setImagePreview(blog.featuredImage);
    setBlogImage(null);
  };

  const resetBlogForm = () => {
    setIsEditing(false);
    setEditId('');
    setBlogTitle('');
    setBlogContent('');
    setBlogCategories('');
    setBlogImage(null);
    setImagePreview('');
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      setLoading(true);
      const res = await axios.delete(`${API_BASE}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        fetchDashboardData();
      }
    } catch (err) {
      alert('Error deleting post');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-Outfit">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-[#d2ab66]/20">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#b73034]/10 text-[#b73034]">
              <FaLock className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Portal
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              AID Concepts Security Access
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {loginError && (
              <div className="bg-[#b73034]/10 border border-[#b73034]/30 text-[#b73034] text-sm px-4 py-3 rounded-lg text-center font-medium">
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
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#b73034] focus:border-[#b73034]"
                  placeholder="admin@aidconcepts.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#b73034] focus:border-[#b73034]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-[#b73034] hover:bg-[#b73034]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b73034] transition-all duration-300 shadow-md"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-Outfit pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-lg border border-[#d2ab66]/10 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Manage blog articles and client inquiries for AID Concepts</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#b73034] hover:bg-[#b73034]/95 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md"
        >
          <FaSignOutAlt /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 bg-white p-4 rounded-2xl shadow-lg border border-[#d2ab66]/10 h-fit space-y-2">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'blogs'
                ? 'bg-[#b73034] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <FaBlog /> Manage Blogs
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'inquiries'
                ? 'bg-[#b73034] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <FaEnvelope /> Contact Inquiries
          </button>
        </div>

        {/* Dynamic Content Panel */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === 'blogs' ? (
            <>
              {/* Blog Form (Create / Edit) */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-[#d2ab66]/10">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-3 border-b border-[#d2ab66]/20">
                  <FaBlog className="text-[#b73034]" />
                  {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>

                <form onSubmit={handleBlogSubmit} className="space-y-6">
                  {formError && (
                    <div className="bg-[#b73034]/10 border border-[#b73034]/20 text-[#b73034] px-4 py-3 rounded-lg text-sm font-medium">
                      {formError}
                    </div>
                  )}
                  {formSuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b73034]/20 focus:border-[#b73034]"
                          placeholder="e.g. 5 Modern Minimalist Dining Table Ideas"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Categories / Tags</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <FaTag size={14} />
                          </span>
                          <input
                            type="text"
                            value={blogCategories}
                            onChange={(e) => setBlogCategories(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b73034]/20 focus:border-[#b73034]"
                            placeholder="Interior, Furniture, Lighting (comma separated)"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Image Upload Area */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Featured Image</label>
                      <div className="border-2 border-dashed border-[#d2ab66]/40 hover:border-[#b73034]/50 rounded-2xl p-4 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer transition-all duration-300 relative min-h-[190px]">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        {imagePreview ? (
                          <div className="relative w-full h-full max-h-[180px] overflow-hidden rounded-xl">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                              <span className="text-white text-sm font-medium flex items-center gap-1"><FaImage /> Change Image</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center space-y-2">
                            <FaImage className="mx-auto text-4xl text-[#d2ab66]" />
                            <span className="block text-sm font-medium text-gray-600">Drag & drop or Click to upload</span>
                            <span className="block text-xs text-gray-400">PNG, JPG, JPEG (Max 5MB)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Content</label>
                    <textarea
                      required
                      rows="8"
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b73034]/20 focus:border-[#b73034]"
                      placeholder="Write your beautiful article content here (supports formatting description style)..."
                    />
                  </div>

                  <div className="flex justify-end gap-4 pt-4 border-t border-[#d2ab66]/10">
                    {isEditing && (
                      <button
                        type="button"
                        onClick={resetBlogForm}
                        className="px-6 py-2.5 rounded-full border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="bg-[#b73034] hover:bg-[#b73034]/95 text-white px-8 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md flex items-center gap-2"
                    >
                      {isEditing ? <FaEdit /> : <FaPlus />}
                      {isEditing ? 'Update Article' : 'Publish Article'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Blog Listing Table */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-[#d2ab66]/10">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-[#d2ab66]/20">Published Articles</h2>
                
                {blogs.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <FaBlog className="mx-auto text-4xl text-gray-300 mb-3" />
                    <span className="block font-medium text-gray-600">No blog posts found</span>
                    <span className="block text-sm text-gray-400 mt-1">Publish your first article above</span>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#d2ab66]/20 text-gray-700 font-semibold text-sm">
                          <th className="py-4 px-4">Image</th>
                          <th className="py-4 px-4">Title</th>
                          <th className="py-4 px-4">Categories</th>
                          <th className="py-4 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {blogs.map((blog) => (
                          <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors">
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
                                  className="p-2.5 text-[#d2ab66] hover:bg-[#d2ab66]/10 rounded-full transition-colors"
                                  title="Edit Post"
                                >
                                  <FaEdit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlog(blog._id)}
                                  className="p-2.5 text-[#b73034] hover:bg-[#b73034]/10 rounded-full transition-colors"
                                  title="Delete Post"
                                >
                                  <FaTrash size={16} />
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
          ) : (
            /* inquiries Tab */
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-[#d2ab66]/10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-[#d2ab66]/20">Client Contact Inquiries</h2>

              {inquiries.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <FaEnvelope className="mx-auto text-4xl text-gray-300 mb-3" />
                  <span className="block font-medium text-gray-600">No contact inquiries yet</span>
                  <span className="block text-sm text-gray-400 mt-1">Client messages will appear here</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {inquiries.map((inq) => (
                    <div
                      key={inq._id}
                      className="p-6 rounded-2xl bg-gray-50/50 border border-gray-200/60 hover:border-[#d2ab66]/40 transition-all duration-300 space-y-4"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{inq.name}</h3>
                          <span className="text-[#d2ab66] font-medium text-sm">{inq.email}</span>
                        </div>
                        <span className="bg-[#b73034]/10 text-[#b73034] font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
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
