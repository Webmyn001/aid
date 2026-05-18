import React from 'react'
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa"
import Logo from './Image/AID-Logo.jpeg'

function Footer() {
  const Year = new Date().getFullYear()
  
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#d2ab66]/10 font-Outfit text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-start">
          {/* Brand - Elegant Logo integration */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={Logo}
                alt="AID Concepts Logo"
                className="h-12 w-12 rounded-full border border-[#d2ab66]/20 shadow-lg transition-transform duration-300 hover:scale-105"
              />
              <div>
                <h2 className="text-xl font-bold tracking-wider leading-tight">
                  <span>AID </span>
                  <span className="text-[#d2ab66]">Concepts</span>
                </h2>
                <p className="text-[10px] text-[#d2ab66] font-bold uppercase tracking-[0.2em] mt-0.5">
                  Bespoke Design
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-sm">
              Transforming high-end spaces with exceptional interior design, luxury products, and architectural precision.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-3.5 md:text-right md:pt-2">
            <div className="flex items-center md:justify-end gap-2.5 text-sm text-gray-400">
              <FaPhoneAlt className="w-4 h-4 text-[#d2ab66]" />
              <a href="tel:+2349036918823" className="hover:text-white transition-all font-semibold duration-300">
                +234 903 691 8823
              </a>
            </div>
            <div className="flex items-center md:justify-end gap-2.5 text-sm text-gray-400">
              <FaEnvelope className="w-4 h-4 text-[#d2ab66]" />
              <a href="mailto:aidconcepts01@gmail.com" className="hover:text-white transition-all font-semibold duration-300">
                aidconcepts01@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Credits */}
        <div className="border-t border-white/5 pt-8 text-center space-y-2">
          <p className="text-xs sm:text-sm text-gray-500 font-light">
            © {Year} AID Concepts Ltd. All rights reserved.
          </p>
          <p className="text-[11px] sm:text-xs text-gray-500 tracking-wider">
            Website designed by{' '}
            <a 
              href="https://wa.me/2349164028798?text=Hello%20Webmyn%2C%20I%20visited%20the%20AID%20Concepts%20website%20and%20would%20like%20to%20discuss%20a%20project.%20I%20understand%20you%20are%20a%20MERN%20stack%20developer%20with%205%20years%20of%20experience.%20Here%20is%20what%20I%20would%20like%20to%20do%3A%20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d2ab66] font-bold hover:underline transition-all"
            >
              Webmyn
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer