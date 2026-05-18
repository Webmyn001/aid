import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Logo from '../Image/AID-Logo.jpeg';

const NavItem = ({ to, children, className, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative px-4 py-2 transition-colors duration-300 font-bold tracking-wider text-sm ${
        isActive 
          ? 'text-white' 
          : 'text-[#d2ab66] hover:text-white'
      } ${className}`}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-4 right-4 h-[2px] bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-[#0a0a0a] border-b border-[#d2ab66]/15 shadow-2xl transition-all duration-300">
      {/* Premium Top Info Bar */}
      <div className="bg-[#000000] text-[#d2ab66] border-b border-[#d2ab66]/10 py-2.5 px-4 text-xs font-Outfit tracking-[0.15em]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d2ab66] animate-pulse"></span>
            <span className="font-semibold uppercase text-[10px] sm:text-xs">AID Concepts Ltd</span>
          </div>
          <span className="font-medium opacity-90 text-[10px] sm:text-xs">RC Number: 81107020</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={Logo}
              alt="Logo"
              className="h-12 w-12 rounded-full border border-[#d2ab66]/20 transition-all duration-300 hover:scale-105 shadow-lg"
            />
            <span className="font-extrabold text-white text-lg tracking-wider hidden sm:block">
              AID <span className="text-[#d2ab66]">Concepts</span>
            </span>
          </Link>

          {/* Desktop Navigation - Black Background, Gold Texts */}
          <div className="hidden md:flex items-center space-x-6">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/blog">Blog</NavItem>
            <NavItem to="/contact" className="p-0 hover:text-white">
              <button className="bg-[#d2ab66] hover:bg-transparent text-[#0a0a0a] hover:text-[#d2ab66] border-2 border-transparent hover:border-[#d2ab66] px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-md transform hover:scale-105">
                Contact Us
              </button>
            </NavItem>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#d2ab66] hover:text-white transition-colors"
            aria-label="Toggle navigation"
          >
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Solid Black Background, Gold Links with custom padding */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute w-full bg-[#0a0a0a] border-b border-[#d2ab66]/20 shadow-2xl"
        >
          <div className="px-6 pt-4 pb-8 space-y-4 font-Outfit">
            <NavItem 
              to="/" 
              className="block py-3 text-base border-b border-white/5" 
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavItem>
            <NavItem 
              to="/blog" 
              className="block py-3 text-base border-b border-white/5" 
              onClick={() => setIsOpen(false)}
            >
              Blog
            </NavItem>
            <div className="pt-4">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-[#d2ab66] text-[#0a0a0a] font-bold py-3.5 rounded-full hover:bg-transparent hover:text-[#d2ab66] border border-[#d2ab66] transition-all duration-300 shadow-lg">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;