import React from 'react'
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa"

function Footer() {
  const Year = new Date().getFullYear()
  
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#d2ab66]/10 font-Outfit text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold mb-2">
              <span>AID </span>
              <span className="text-[#d2ab66]">Concepts</span>
            </h2>
            <p className="text-sm text-gray-400 font-light">
              Transforming spaces with exceptional interior design and architectural precision.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-2 md:text-right">
            <div className="flex items-center md:justify-end gap-2 text-sm text-gray-400">
              <FaPhoneAlt className="w-4 h-4 text-[#d2ab66]" />
              <a href="tel:+2349036918823" className="hover:text-white transition-colors">
                +234 903 691 8823
              </a>
            </div>
            <div className="flex items-center md:justify-end gap-2 text-sm text-gray-400">
              <FaEnvelope className="w-4 h-4 text-[#d2ab66]" />
              <a href="mailto:aidconcepts01@gmail.com" className="hover:text-white transition-colors">
                aidconcepts01@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Credits */}
        <div className="border-t border-white/5 pt-6 text-center space-y-2">
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