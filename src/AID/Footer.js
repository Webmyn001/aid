import React from 'react'
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa"
import { Link } from 'react-router-dom'

function Footer() {
  const Year = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 font-Poppins text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold mb-2">
              <span>AID</span>
              <span className="text-[#99010e]">Concepts</span>
            </h2>
            <p className="text-sm text-gray-400">
              Transforming spaces with exceptional interior design.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaPhoneAlt className="w-4 h-4" />
              <a href="tel:+2349036918823" className="hover:text-white">
                +234 903 691 8823
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaEnvelope className="w-4 h-4" />
              <a href="mailto:aidconcepts01@gmail.com" className="hover:text-white">
                aidconcepts01@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-4 text-center">
          <p className="text-sm text-gray-400">
            © {Year} AID Concepts Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer