import React, { useEffect, useState } from 'react'
import { BsFillTelephoneFill } from "react-icons/bs"
import { IoLogoWhatsapp } from 'react-icons/io'
import { AiOutlineMail } from 'react-icons/ai'
import Login from './Login'
import Signup from './Signup'
import Avatar from '../Image/AID-Logo.jpeg'
import AOS from "aos"
import "aos/dist/aos.css"

const Auth = () => {
  const [authType, setAuthType] = useState('login')
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50
    })
  }, [])

  const socialLinks = [
    {
      icon: <IoLogoWhatsapp className="text-[#25D366]"/>,
      href: 'https://wa.me/+2349036918823',
      label: 'WhatsApp'
    },
    {
      icon: <BsFillTelephoneFill className="text-[#0EBE2C]"/>,
      href: 'tel:+2349036918823',
      label: 'Phone'
    },
    {
      icon: <AiOutlineMail className="text-[#EA4335]"/>,
      href: 'mailto:aidconcepts01@gmail.com',
      label: 'Email'
    }
  ]

  return (
    <div className="min-h-screen font-josefins pb-[40px] pt-[100px] bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="p-8 space-y-6" data-aos="zoom-in">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <img 
              src={Avatar} 
              alt="Company Logo" 
              className="w-20 h-20 rounded-full object-cover border-4 border-[#d2ab66] transition-transform duration-500 hover:scale-110"
            />
            <h1 className="text-2xl font-bold text-gray-800">Welcome to AID</h1>
          </div>

          {/* Auth Toggle */}
          <div className="flex bg-gray-100 rounded-full p-1">
            {['login', 'signup'].map((type) => (
              <button
                key={type}
                onClick={() => setAuthType(type)}
                className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all duration-300 ${
                  authType === type 
                    ? 'bg-[#d2ab66] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {type === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            {authType === 'login' ? <Login /> : <Signup />}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-[#d2ab66] transition-all duration-300 group"
                aria-label={link.label}
              >
                {React.cloneElement(link.icon, {
                  className: `${link.icon.props.className} w-6 h-6 group-hover:text-white`
                })}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth