import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Logo from '../Image/logo-1.jpg';

const NavItem = ({ to, children, className }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative px-4 py-2 transition-colors ${
        isActive ? ' text-[#99010e]  font-semibold' : 'text-[#99010e] '
      } ${className}`}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[2px] bg-[#99010e]"
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50  transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      {/* Top Info Bar */}
      <div className="bg-[#99010e] text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto font-Outfit flex justify-between items-center">
          <span>AYOOLA INTERIOR DESIGNS LTD</span>
          <span className='font-Playwrite'>RC Number: 81107020</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={Logo}
              alt="Logo"
              className="h-12 w-12 rounded-lg border-2 border-white transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/Login">Admin</NavItem>
            <NavItem to="/contact">
              <button className="bg-[#99010e] text-white px-6 py-2 rounded-full hover:bg-[#7a010b] transition-colors">
                Contact
              </button>
            </NavItem>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#99010e] hover:text-[#99010e] transition-colors"
            aria-label="Toggle navigation"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute w-full bg-white shadow-lg"
        >
          <div className="px-4 pt-2 pb-4 space-y-4">
            <NavItem to="/" className="block">Home</NavItem>
            <NavItem to="/Login" className="block">Admin</NavItem>
            <NavItem to="/contact" className="block">
              <button className="w-full bg-[#99010e] text-white px-6 py-2 rounded-full hover:bg-[#7a010b] transition-colors">
                Contact
              </button>
            </NavItem>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;