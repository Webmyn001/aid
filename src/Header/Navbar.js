import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import Navlinks from "./Navlinks"
import Logo from "../Image/logo-1.jpg"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleMenuToggle = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-white text-gray-700 py-2 px-4 sm:px-6 flex justify-between items-center text-sm border-b">
        <p>AYOOLA INTERIOR DESIGNS LTD</p>
        <p className="font-semibold">
          RC Number: <span className="font-normal">81107020</span>
        </p>
      </div>

      {/* Main Navigation */}
      <nav className={`bg-[#99010e] transition-all ${isScrolled ? "shadow-lg" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src={Logo}
                alt="Ayoola Interior Designs Logo"
                className="h-12 w-12 rounded-lg border-2 border-white"
              />
              <span className="sr-only">Home</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8 flex-grow justify-end">
              <Navlinks />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMenuToggle}
              className="md:hidden p-2 text-white hover:text-gray-200 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="bg-[#99010e] h-full w-3/4 ml-auto shadow-2xl p-6">
            <div className="flex flex-col h-full justify-between">
              <Navlinks alternative={true} handleClick={closeMenu} />
              <button
                onClick={closeMenu}
                className="mt-8 self-end text-white hover:text-gray-200"
                aria-label="Close menu"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMenu}
          />
        )}
      </nav>
    </header>
  )
}

export default Navbar