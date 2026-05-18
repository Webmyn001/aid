import React, { useEffect } from 'react'
import Service from './Service'
import Works from './Works'
import Certifications from './Certifications'
import AOS from "aos"
import "aos/dist/aos.css"
import { Link } from 'react-router-dom'
import { FiAward, FiCheckCircle, FiClock, FiShield } from 'react-icons/fi'

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50
    })
  }, [])

  return (
    <div className="overflow-hidden bg-[#fafafa] font-Outfit">
      {/* Luxury Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-8 lg:px-12">
        {/* Background Image with Premium Multi-Layer Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-10000 ease-out"
            style={{ 
              backgroundImage: `url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000)`,
            }}
          />
          {/* Elegant Dark Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d2ab66]/15 rounded-full blur-3xl" />

        {/* Hero Content Area - Shifted down using pt-36 sm:pt-44 to ensure navbar doesn't block "AID bespoke" text */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-12">
          
          {/* Left Text Block */}
          <div className="max-w-3xl text-left space-y-8" data-aos="fade-right" data-aos-delay="200">
            
            {/* Standard Brand Heading Accent */}
            <div className="inline-flex items-center space-x-3">
              <span className="h-px w-12 bg-[#d2ab66]" />
              <span className="text-[#d2ab66] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
                AID Concepts - Bespoke Interior Design
              </span>
            </div>

            {/* Bold Premium Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-[1.1] tracking-tight">
                Crafting <span className="text-[#d2ab66] bg-gradient-to-r from-[#d2ab66] to-[#f3e1b9] bg-clip-text text-transparent">Elegance</span>, <br />
                Inspiring Living.
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 font-light max-w-xl leading-relaxed pt-2">
                We transform high-end spaces into functional masterpieces. AID Concepts combines luxury, precision, and state-of-the-art craftsmanship to elevate your home.
              </p>
            </div>

            {/* Dual Gold/Black Button Group */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#d2ab66] hover:bg-transparent text-[#0a0a0a] hover:text-[#d2ab66] border-2 border-transparent hover:border-[#d2ab66] px-8 py-4 rounded-full text-sm font-bold tracking-wider transition-all duration-300 shadow-xl transform hover:scale-105 active:scale-95"
              >
                <span>Request Consultation</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                to="/works"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white px-8 py-4 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Explore Projects
              </Link>
            </div>

          </div>

          {/* Centered Operational Location & Contact Console - Perfectly centered for both Small and Large Screens */}
          <div 
            className="w-full flex justify-center pt-16 sm:pt-20" 
            data-aos="fade-up" 
            data-aos-delay="500"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-black/80 backdrop-blur-md border border-[#d2ab66]/20 p-4 sm:p-5 rounded-2xl shadow-xl max-w-full">
              {/* Cities List */}
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-[#d2ab66] animate-pulse"></span>
                <p className="text-white text-xs sm:text-sm tracking-wider uppercase font-bold text-center">
                  Ibadan • Lagos • Abuja • Ogun • Osun
                </p>
              </div>
              
              <span className="hidden sm:inline text-white/20">|</span>
              
              {/* Corporate Email Address */}
              <a href="mailto:aidconcepts01@gmail.com" className="text-[#d2ab66] text-xs sm:text-sm font-extrabold tracking-wide hover:underline transition-all">
                aidconcepts01@gmail.com
              </a>
            </div>
          </div>

        </div>

        {/* Minimal Scroll Indicator */}
        <div className="absolute bottom-8 left-8 hidden lg:block" data-aos="fade-up" data-aos-delay="600">
          <div className="flex items-center space-x-4">
            <span className="text-white/40 text-xs tracking-widest uppercase">Scroll to Discover</span>
            <div className="w-16 h-px bg-white/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1/2 bg-[#d2ab66] animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Trust Statistics Counter Bar - Shifted down using mt-12 to ensure layout visibility */}
      <section className="relative z-20 mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0c0c0c] border border-[#d2ab66]/20 rounded-3xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#d2ab66]/10">
          
          <div className="flex flex-col justify-center p-2" data-aos="zoom-in" data-aos-delay="100">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#d2ab66]">500+</span>
            <span className="text-gray-400 text-xs sm:text-sm font-light mt-1 uppercase tracking-wider">Bespoke Spaces</span>
          </div>

          <div className="flex flex-col justify-center p-2 pt-6 md:pt-2" data-aos="zoom-in" data-aos-delay="200">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#d2ab66]">100%</span>
            <span className="text-gray-400 text-xs sm:text-sm font-light mt-1 uppercase tracking-wider">Satisfaction Rate</span>
          </div>

          <div className="flex flex-col justify-center p-2 pt-6 md:pt-2" data-aos="zoom-in" data-aos-delay="300">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#d2ab66]">15+</span>
            <span className="text-gray-400 text-xs sm:text-sm font-light mt-1 uppercase tracking-wider">Years Combined Exp.</span>
          </div>

          <div className="flex flex-col justify-center p-2 pt-6 md:pt-2" data-aos="zoom-in" data-aos-delay="400">
            <span className="text-base sm:text-lg font-bold text-[#d2ab66]">RC-81107020</span>
            <span className="text-gray-400 text-xs sm:text-sm font-light mt-1 uppercase tracking-wider">CAC Registration</span>
          </div>

        </div>
      </section>

      {/* "Bespoke Excellence" Introduction (Brand Core Values Section) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text details */}
          <div className="space-y-6" data-aos="fade-right">
            <span className="text-xs font-bold text-[#d2ab66] tracking-[0.2em] uppercase bg-[#d2ab66]/10 px-3 py-1.5 rounded-full inline-block">
              Redefining Luxury
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Bespoke Spaces Crafted to Suit Your <span className="text-[#d2ab66]">Refined Taste</span>
            </h2>
            <p className="text-gray-600 font-light leading-relaxed">
              At AID Concepts, we do not just design rooms; we curate experiences. Our standard processes ensure that from concept drawings to complete handovers, your project benefits from continuous attention to details and global design benchmarks.
            </p>
            <div className="w-16 h-1 bg-[#d2ab66] rounded" />
          </div>

          {/* Right Core Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-aos="fade-left">
            
            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#d2ab66]/10 flex items-center justify-center text-[#d2ab66] mb-4">
                <FiAward size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Architectural Precision</h3>
              <p className="text-sm text-gray-500 font-light">Every blueprint is detailed with mathematical precision for flawless deployment.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#d2ab66]/10 flex items-center justify-center text-[#d2ab66] mb-4">
                <FiShield size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Absolute Integrity</h3>
              <p className="text-sm text-gray-500 font-light">Transparent billing, premium raw materials, and verified CAC licensing.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#d2ab66]/10 flex items-center justify-center text-[#d2ab66] mb-4">
                <FiCheckCircle size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Flawless Handovers</h3>
              <p className="text-sm text-gray-500 font-light">Exacting quality checks guarantee that spaces are completely spotless and ready.</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#d2ab66]/10 flex items-center justify-center text-[#d2ab66] mb-4">
                <FiClock size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Timely Deliveries</h3>
              <p className="text-sm text-gray-500 font-light">Agile project management models ensure we hit targeted dates every time.</p>
            </div>

          </div>

        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16 border-t border-b border-gray-100">
        <div data-aos="fade-up">
          <Service />
        </div>
      </section>

      {/* Works Section */}
      <section className="py-16">
        <div data-aos="fade-up">
          <Works />
        </div>
      </section>

      {/* Certifications Section */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div data-aos="fade-up">
          <Certifications />
        </div>
      </section>
    </div>
  )
}

export default Home