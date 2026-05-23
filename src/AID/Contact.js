import React, { useEffect, useState } from 'react'
import { IoLogoWhatsapp } from 'react-icons/io'
import AOS from "aos"
import "aos/dist/aos.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import ManagerImage from './Image/manager5.jpg'

function Contact() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Message: '',
    Type: 'General'
  })

  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await axios.post("https://aidconcept.vercel.app/api/contact", {
        name: formData.Name,
        email: formData.Email,
        message: formData.Message,
        type: formData.Type
      })

      alert('Thank you! Your inquiry has been sent.')
      setFormData({ Name: '', Email: '', Message: '', Type: 'General' })
      setTimeout(() => navigate("/"), 1500)
    } catch (err) {
      console.error(err)
      alert('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-white font-Outfit pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 animate-fade-in">
        <span className="text-[#d2ab66] text-xs font-bold tracking-[0.25em] uppercase bg-[#d2ab66]/5 px-4 py-1.5 rounded-full">
          Get In Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Request a <span className="text-[#d2ab66]">Consultation</span>
        </h1>
        <p className="text-gray-500 font-light text-lg">
          We bring elegant design, luxury finishes, and professional styling to your personal spaces.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl border border-[#d2ab66]/10 shadow-xl overflow-hidden">
        {/* CEO & General Info */}
        <div className="lg:col-span-5 bg-gradient-to-br from-gray-50 to-[#d2ab66]/5 p-8 md:p-12 flex flex-col justify-between border-r border-gray-100">
          <div className="space-y-8">
            <div className="flex flex-col items-center md:items-start gap-6">
              <img 
                src={ManagerImage} 
                alt="Oladejo Abdul-Salam" 
                className="rounded-3xl w-40 h-40 object-cover shadow-md border-2 border-[#d2ab66] transition-transform duration-300 hover:scale-105"
              />
              <div className="text-center md:text-left space-y-1">
                <h2 className="text-2xl font-bold text-gray-900">Oladejo Abdul-Salam</h2>
                <p className="text-[#d2ab66] font-semibold text-sm uppercase tracking-wider">Chief Executive Officer</p>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-200">
              <ContactItem 
                label="Phone" 
                value="+234 903 691 8823" 
                href="tel:+2349036918823" 
              />
              <ContactItem 
                label="Email" 
                value="aidconcepts01@gmail.com" 
                href="mailto:aidconcepts01@gmail.com" 
              />
              <ContactItem 
                label="WhatsApp" 
                value="Chat directly with CEO" 
                href="https://wa.me/2349036918823"
                icon={<IoLogoWhatsapp className="text-xl text-[#25D366]" />}
              />
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-400 font-medium">
            AID Concepts Studio © 2026. All rights reserved.
          </div>
        </div>

        {/* Message / Inquiry Form */}
        <div className="lg:col-span-7 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-3 border-b border-[#d2ab66]/20">
            Submit your Inquiry
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d2ab66]/20 focus:border-[#d2ab66] transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Inquiry Type
                </label>
                <select
                  name="Type"
                  value={formData.Type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d2ab66]/20 focus:border-[#d2ab66] bg-white transition-all"
                >
                  <option value="General">General Inquiry</option>
                  <option value="Consultation">Request Consultation</option>
                  <option value="Inquiry">Product / Service Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d2ab66]/20 focus:border-[#d2ab66] transition-all"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                name="Message"
                value={formData.Message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d2ab66]/20 focus:border-[#d2ab66] transition-all"
                placeholder="Let us know what elegant space improvements you would like to make..."
                rows="5"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d2ab66] text-white py-3.5 px-6 rounded-full font-semibold hover:bg-[#d2ab66]/95 transition-all shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <Oval height={20} width={20} color="#fff" />
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const ContactItem = ({ label, value, href, icon }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-[#d2ab66]/30 transition-all duration-300">
    <span className="font-semibold text-gray-700 text-sm">{label}</span>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-900 hover:text-[#d2ab66] transition-colors font-medium flex items-center gap-2 text-sm"
    >
      {value} {icon}
    </a>
  </div>
)

export default Contact