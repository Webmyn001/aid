import React, { useEffect } from 'react'

import Image1 from '../Image/P1.jpg'
import Image2 from '../Image/P2.jpg'
import Image3 from '../Image/P3.jpg'
import Image4 from '../Image/P4.jpg'
import Image5 from '../Image/P5.jpg'
import Image6 from '../Image/P6.jpg'


import { Link, useLocation } from 'react-router-dom'

import AOS from "aos";
import "aos/dist/aos.css";





function WallDesign() {
  const location = useLocation()
  const data = location.state


  const Works = [
    {
        Image : Image1,
        Title : "Wall Designs",
    },   

    {
        Image : Image2,
        Title : "Wall Designs",
    },

    {
        Image : Image3,
        Title : "Wall Designs",
    },

    {
        Image : Image4,
        Title : "Wall Designs",
    },


    {
        Image : Image5,
        Title : "Wall Designs",
   },

   {
    Image : Image6,
    Title : "Wall Designs",
}
]


  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true,
      offset: 50
    })
  }, [])

  const ServiceCard = ({ image, title }) => (
    <div 
      className="group relative overflow-hidden bg-white rounded-2xl border border-[#d2ab66]/10 shadow-sm hover:shadow-xl hover:border-[#d2ab66]/30 transition-shadow duration-300"
      data-aos="fade-up"
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-4 text-center space-y-3">
        <h3 className="text-xl font-bold text-[#d2ab66]">{title}</h3>
        <p className="text-gray-600 text-sm">
          We specialize in creating perfect climate solutions for your space
        </p>
        <Link 
          to="/contact"
          className="inline-block bg-[#d2ab66] text-[#0a0a0a] px-6 py-2.5 rounded-full shadow-md hover:bg-[#0a0a0a] hover:text-[#d2ab66] border border-transparent hover:border-[#d2ab66] transition-colors duration-300 text-sm
                     font-medium"
        >
          Get Consultation
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white font-Outfit pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center my-12 text-[#d2ab66] " data-aos="fade-down">
          {data?.Title || "Our Air Conditioning Solutions"}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Works.map((work, i) => (
            <ServiceCard 
              key={`ac-${i}`}
              image={work.Image}
              title={work.Title}
              data-aos-delay={i * 50}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WallDesign