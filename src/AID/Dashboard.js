import { useState, useEffect } from 'react';
import { FiTrash2, FiUploadCloud, FiMessageSquare, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [works, setWorks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: ''
  });


   // Logout handler
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('Token');
      navigate('/login');
    }
  };


  // Custom fetch hook to reduce repetition
  const fetchData = async (endpoint, setter) => {
    try {
      const res = await axios.get(`https://aid-server.vercel.app/api/${endpoint}/get`);
      setter(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching data');
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(formData).every(Boolean)) return;
    
    setLoading(true);
    try {
      const res = await axios.post("https://aid-server.vercel.app/api/advert/add", formData);
      setWorks(prev => [...prev, res.data]);
      setFormData({ title: '', price: '', image: '' });
      alert('Uploaded successfully')
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  // Delete confirmation dialog
  const confirmDelete = (message, callback) => {
    if (window.confirm(message)) callback();
  };

  // Delete handlers
  const deleteItem = async (endpoint, id, successMessage) => {
    try {
      await axios.delete(`https://aid-server.vercel.app/api/${endpoint}/${id}`);
      endpoint === 'message' ? setMessages(prev => prev.filter(m => m._id !== id)) 
                            : setWorks(prev => prev.filter(w => w._id !== id));
      alert(successMessage);
    } catch (err) {
      console.error(err);
      alert('Deletion failed');
    }
  };

  // Initialization effects
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    if (!localStorage.getItem('Token')) navigate("/error", { replace: true });
    fetchData('message', setMessages);
    fetchData('advert', setWorks);
  }, [navigate]);

  return (
    <div className="min-h-screen font-Poppins bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 pt-[100px]">
          <h1 className="text-3xl md:text-4xl  font-bold bg-gradient-to-r from-[#d2ab66] to-[#f3e1b9] bg-clip-text text-transparent">
            Dashboard
          </h1>
        

         {/* Logout Button */}
         <button 
      onClick={handleLogout}
      className="flex items-center mt-2 gap-2 bg-[#d2ab66] hover:bg-[#f3e1b9] text-white px-4 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
    >
      <FiLogOut className="w-5 h-5 animate-pulse" />
      <span className="font-medium">Sign Out</span>
    </button>
          
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Messages Panel */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FiMessageSquare className="w-6 h-6 text-[#d2ab66]" />
              <h2 className="text-xl font-semibold text-gray-800">Client Messages</h2>
            </div>
            
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {messages.map((msg) => (
                <article 
                  key={msg._id}
                  className="group relative bg-gray-50 rounded-lg p-4 hover:bg-indigo-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{msg.Name}</h3>
                      <a href={`mailto:${msg.Email}`} className="text-sm text-[#d2ab66] hover:underline">
                        {msg.Email}
                      </a>
                    </div>
                    <button 
                      onClick={() => confirmDelete(
                        'Delete this message?',
                        () => deleteItem('message', msg._id, 'Message deleted')
                      )}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      aria-label="Delete message"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{msg.Message}</p>
                  <time className="text-xs text-gray-400">{msg.Time}</time>
                </article>
              ))}
            </div>
          </section>

          {/* Upload Panel */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FiUploadCloud className="w-6 h-6 text-[#d2ab66]" />
              <h2 className="text-xl font-semibold text-gray-800">Upload Works</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {['title', 'price', 'image'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {field === 'price' ? 'Price ' : field}
                  </label>
                  <input
                    type={field === 'price' ? 'text' : 'text'}
                    value={formData[field]}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#d2ab66] focus:border-transparent transition-all"
                    placeholder={
                      field === 'image' ? 'Paste image URL...' 
                      : field === 'price' ? '#0.00' 
                      : `Enter ${field}`
                    }
                    required
                  />
                </div>
              ))}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#d2ab66] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#0a0a0a] disabled:opacity-70 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Oval height={24} width={24} color="#fff" />
                ) : (
                  'Upload Item'
                )}
              </button>
            </form>

            {/* Recent Uploads Preview */}
            {formData.image && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="h-48 w-full object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-medium text-gray-800 truncate">{formData.title}</h4>
                  <p className="text-[#d2ab66] font-medium">{formData.price}</p>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Works Gallery */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {works.map((work, i) => (
              <article 
                key={work._id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                data-aos="fade-up"
                data-aos-delay={i * 50}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{work.title}</h3>
                    <button 
                      onClick={() => confirmDelete(
                        'Delete this work?',
                        () => deleteItem('advert', work._id, 'Work deleted')
                      )}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      aria-label="Delete work"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[#d2ab66] font-medium">{work.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}