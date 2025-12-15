import React, { useEffect } from 'react'
import Service from './Service'
import Works from './Works'
import Certifications from './Certifications'
import AOS from "aos"
import "aos/dist/aos.css"

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50
    })
  }, [])

  return (
    <div className="overflow-hidden bg-gray-50">
      {/* Minimalist Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-8 lg:px-12">
        {/* Background Image with Subtle Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{ 
              backgroundImage: `url(https://www.floor-sanding.com/wp-content/uploads/2023/08/red-accessories-in-home-decor.jpg)`,
            }}
          />
          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/65" />
          {/* Subtle Vignette Effect */}
          <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.7)]" />
        </div>

        {/* Subtle Decorative Elements */}
        <div className="absolute top-20 left-5 w-32 h-32 bg-[#99010e]/5 rounded-full blur-2xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-5 w-48 h-48 bg-white/3 rounded-full blur-2xl" />

        {/* Main Content - Minimal & Professional */}
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4">
          <div 
            className="space-y-8 md:space-y-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Subtle Brand Indicator */}
            <div 
              className="inline-block mb-6"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#99010e] to-transparent mx-auto mb-4" />
              <span className="text-white/70 text-sm font-medium tracking-[0.3em] uppercase">
                Interior Design Studio
              </span>
            </div>

            {/* Main Heading - Clean & Impactful */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight">
                <span className="block">AID</span>
                <span className="block text-[#99010e]">Concepts</span>
              </h1>
              
              {/* Short, Powerful Tagline */}
              <p className="text-lg sm:text-xl text-white/80 font-light max-w-md mx-auto leading-relaxed pt-6 border-t border-white/10">
                Elegant spaces that inspire
              </p>
            </div>

            {/* Single CTA (Optional - Commented out but styled if needed) */}
            {/*
            <div 
              className="pt-8"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <button className="group relative inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/50 px-8 py-3 rounded-sm text-base font-medium tracking-wide transition-all duration-300">
                <span>View Portfolio</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            */}
          </div>
        </div>

        {/* Scroll Indicator - Minimal */}
        <div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/40 text-xs tracking-widest">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </div>

        {/* Contact Info Bar (Optional - Bottom Right) */}
        <div 
          className="absolute bottom-8 right-8 hidden md:block"
          data-aos="fade-left"
          data-aos-delay="800"
        >
          <div className="text-right">
            <p className="text-white/50 text-sm tracking-wide">Lagos • Ibadan • Abuja</p>
            <p className="text-white/30 text-xs mt-1">aidconcepts01@gmail.com</p>
          </div>
        </div>
      </section>

      {/* Spacer with Decorative Element */}
      <div className="relative py-12 bg-gray-50">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      {/* Content Sections with Improved Spacing */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Services Section */}
        <section className="py-20 md:py-28">
          <div data-aos="fade-up">
            <Service />
          </div>
        </section>

        {/* Works Section */}
        <section className="py-20 md:py-28 bg-white rounded-3xl md:rounded-[4rem] -mx-4 md:-mx-8 px-4 md:px-8">
         
          <div data-aos="fade-up">
            <Works />
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-20 md:py-28">
        
          <div data-aos="fade-up">
            <Certifications />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home