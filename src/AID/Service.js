import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from "aos"
import "aos/dist/aos.css"

import Image1 from './Image/F4.jpg'
import Image2 from './Image/L2.jpg'
import Image3 from './Image/D4.jpg'
import Image4 from './Image/full-home1.jpg'
import Image5 from './Image/POP3.jpg'
import Image6 from './Image/P3.jpg'
import Image7 from './Image/ST5.jpg'
import Image8 from './Image/FL5.jpg'
import Image9 from './Image/W2.jpg'
import Image10 from './Image/AC1.jpg'
import Image11 from './Image/cctv2.jpg'
import Image12 from './Image/GC2.jpg'
import Image13 from './Image/GD4.jpg'
import Image14 from './Image/WC1.jpg'

// Service data moved to a separate configuration object
const services = [
    {
        Image : Image1,
        Title : "Furnitures",
        Description : "Home furniture includes essential pieces like sofas, beds, tables, and storage units that offer comfort, organization, and style. It comes in various materials and designs to suit different tastes and needs.",
        Link : "/furnitures"
    },

    {
        Image : Image2,
        Title : "Home Lightning ",
        Description : "Home lighting includes ambient, task, and accent lighting to enhance functionality and atmosphere. It features fixtures like ceiling lights, lamps, and chandeliers, helping to illuminate spaces and create a comfortable, inviting environment.",
        Link : "/lightning"
    },

    {
        Image : Image3,
        Title : " Home Decor",
        Description : "Home decor includes furniture, textiles, and accessories that improve both the look and functionality of a space, reflecting personal style and creating a comfortable, attractive atmosphere.",
        Link : "/decor"
    },

    {
        Image : Image4,
        Title : " Full home Interior",
        Description : "Full home interior involves designing and arranging all spaces in a home, including furniture, decor, lighting, and color schemes, to create a functional, comfortable, and visually appealing environment that reflects personal style.",
        Link : "/home-interior"
    },

    {
        Image : Image5,
        Title : "P.O.P Ceiling",
        Description : "A pop ceiling is a decorative, layered ceiling design made from materials like gypsum or plaster, often used to conceal wires and fixtures while enhancing the room's style and ambiance.",
        Link : "/pop"
    },

    {
        Image : Image6,
        Title : " Wall  Designs",
        Description : "Wall panel design uses materials like wood or PVC to add texture and style to walls, enhancing aesthetics, soundproofing, and hiding imperfections.",
        Link  : "/wall-pannel"
    },

    {
        Image : Image7,
        Title : " Stucco",
        Description : "Stucco is a durable plaster material used for exterior walls, made from sand, cement, lime, and water. It offers a smooth, textured finish, is weather-resistant, fireproof, and energy-efficient",
        Link  : "/stucco"
    },

    {
        Image : Image8,
        Title : "Floor Designs",
        Description : "Floor interior design includes materials like marble, tiles, artificial grass, carpets, and interlocking pavers, each offering unique benefits in style, comfort, and durability.",
        Link : "/floor"
    },

    {
        Image : Image9,
        Title : "Window Setup",
        Description : "Interior window setups, like curtains, blinds, shades, and shutters, enhance privacy, light control, and aesthetics with options for softness, light management, minimalism, and elegance.",
        Link : "/window"
    },

    {
        Image : Image10,
        Title : "Air Conditioning",
        Description : "Keep your home cool and comfortable with our expert AC installation, maintenance, and repair services, ensuring your system runs smoothly year-round.",
        Link : "/ac"
    },

    {
        Image : Image11,
        Title : "CCTV Installation",
        Description : "Enhance your home’s security with our expert CCTV installation services, providing reliable surveillance solutions for peace of mind year-round.",
        Link : "/cctv"
    },

    {
        Image : Image12,
        Title : "General Cleaning Service",
        Description : "Revitalize any space with our professional cleaning services, covering homes, mosques, schools, offices, and commercial properties, as well as renovation, carpet cleaning, and post-construction cleanup.",
        Link : "/cleaning"
    },

    {
        Image : Image13,
        Title : "Garden exterior design",
        Description : "Enhance your outdoor space with our professional garden and exterior design services, including landscaping, lawn maintenance, garden planning, water features, outdoor lighting, and driveway designs.",
        Link : "/garden"
    },

    {
        Image : Image14,
        Title : "Wall Console",
        Description : "Interior window setups, like curtains, blinds, shades, and shutters, enhance privacy, light control, and aesthetics with options for softness, light management, minimalism, and elegance.",
        Link : "/console"
    }

]

function Service() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50
    })
  }, [])

  return (
    <section className="py-12 px-4  sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#251e3d] mb-4" data-aos="fade-down">
            Our Services
          </h1>
          <p className="text-xl text-[#251e3d] opacity-90" data-aos="fade-down" data-aos-delay="100">
            Transforming Spaces with Premium Interior Solutions
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link 
              key={index}
              to={service.Link}
              state={service}
              className="group block overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <figure className="relative aspect-square overflow-hidden">
                <img
                  src={service.Image}
                  alt={service.Title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </figure>
              
              <div className="bg-white h-full p-6">
                <h2 className="text-xl font-semibold text-[#99010e] mb-2 transition-colors group-hover:text-[#7a010b]">
                  {service.Title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.Description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Service