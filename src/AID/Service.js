import React, { useState, useEffect } from 'react'
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

// Service data
const services = [
    {
        Image: Image1,
        Title: "Furnitures",
        Description: "Home furniture includes essential pieces like sofas, beds, tables, and storage units that offer comfort, organization, and style. It comes in various materials and designs to suit different tastes and needs.",
        Link: "/furnitures"
    },
    {
        Image: Image2,
        Title: "Home Lighting",
        Description: "Home lighting includes ambient, task, and accent lighting to enhance functionality and atmosphere. It features fixtures like ceiling lights, lamps, and chandeliers, helping to illuminate spaces and create a comfortable, inviting environment.",
        Link: "/lightning"
    },
    {
        Image: Image3,
        Title: "Home Decor",
        Description: "Home decor includes furniture, textiles, and accessories that improve both the look and functionality of a space, reflecting personal style and creating a comfortable, attractive atmosphere.",
        Link: "/decor"
    },
    {
        Image: Image4,
        Title: "Full Home Interior",
        Description: "Full home interior involves designing and arranging all spaces in a home, including furniture, decor, lighting, and color schemes, to create a functional, comfortable, and visually appealing environment that reflects personal style.",
        Link: "/home-interior"
    },
    {
        Image: Image5,
        Title: "P.O.P Ceiling",
        Description: "A pop ceiling is a decorative, layered ceiling design made from materials like gypsum or plaster, often used to conceal wires and fixtures while enhancing the room's style and ambiance.",
        Link: "/pop"
    },
    {
        Image: Image6,
        Title: "Wall Designs",
        Description: "Wall panel design uses materials like wood or PVC to add texture and style to walls, enhancing aesthetics, soundproofing, and hiding imperfections.",
        Link: "/wall-pannel"
    },
    {
        Image: Image7,
        Title: "Stucco",
        Description: "Stucco is a durable plaster material used for exterior walls, made from sand, cement, lime, and water. It offers a smooth, textured finish, is weather-resistant, fireproof, and energy-efficient",
        Link: "/stucco"
    },
    {
        Image: Image8,
        Title: "Floor Designs",
        Description: "Floor interior design includes materials like marble, tiles, artificial grass, carpets, and interlocking pavers, each offering unique benefits in style, comfort, and durability.",
        Link: "/floor"
    },
    {
        Image: Image9,
        Title: "Window Setup",
        Description: "Interior window setups, like curtains, blinds, shades, and shutters, enhance privacy, light control, and aesthetics with options for softness, light management, minimalism, and elegance.",
        Link: "/window"
    },
    {
        Image: Image10,
        Title: "Air Conditioning",
        Description: "Keep your home cool and comfortable with our expert AC installation, maintenance, and repair services, ensuring your system runs smoothly year-round.",
        Link: "/ac"
    },
    {
        Image: Image11,
        Title: "CCTV Installation",
        Description: "Enhance your home's security with our expert CCTV installation services, providing reliable surveillance solutions for peace of mind year-round.",
        Link: "/cctv"
    },
    {
        Image: Image12,
        Title: "General Cleaning",
        Description: "Revitalize any space with our professional cleaning services, covering homes, mosques, schools, offices, and commercial properties, as well as renovation, carpet cleaning, and post-construction cleanup.",
        Link: "/cleaning"
    },
    {
        Image: Image13,
        Title: "Garden Design",
        Description: "Enhance your outdoor space with our professional garden and exterior design services, including landscaping, lawn maintenance, garden planning, water features, outdoor lighting, and driveway designs.",
        Link: "/garden"
    },
    {
        Image: Image14,
        Title: "Wall Console",
        Description: "Interior window setups, like curtains, blinds, shades, and shutters, enhance privacy, light control, and aesthetics with options for softness, light management, minimalism, and elegance.",
        Link: "/console"
    }
]

function Service() {
    const [displayCount, setDisplayCount] = useState(8); // Initial number of services to show
    const [showLoadMore, setShowLoadMore] = useState(true);
    
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        })
        
        // Check if we need to show the Load More button initially
        setShowLoadMore(displayCount < services.length);
    }, [displayCount])

    const handleLoadMore = () => {
        // Show 4 more services each time (adjust based on your grid columns)
        const newCount = displayCount + 4;
        setDisplayCount(newCount);
        
        // Hide button when all services are shown
        if (newCount >= services.length) {
            setShowLoadMore(false);
        }
    }

    const handleShowLess = () => {
        // Reset to initial count
        setDisplayCount(8);
        setShowLoadMore(true);
    }

    // Get only the services to display
    const servicesToDisplay = services.slice(0, displayCount);

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
            <span className="inline-block text-[#99010e] text-sm font-medium tracking-widest uppercase mb-4">
              Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <div className="w-20 h-px bg-gray-300 mx-auto"></div>
          </div>
                {/* Section Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <p className="text-gray-600 max-w-2xl mx-auto" data-aos="fade-down" data-aos-delay="100">
                        {displayCount} of {services.length} services shown
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {servicesToDisplay.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
                            data-aos="fade-up"
                            data-aos-delay={index % 4 * 100}
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square overflow-hidden">
                                <img
                                    src={service.Image}
                                    alt={service.Title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-5">
                                <h3 className="text-xs text-center sm:text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#99010e] transition-colors">
                                    {service.Title}
                                </h3>

                                {/* View Details Button */}
                                <Link
                                    to={service.Link}
                                    state={service}
                                    className="inline-flex items-center justify-center w-full py-2.5 px-2 text-xs font-medium text-white bg-[#99010e] hover:bg-[#7a010b] rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#99010e] focus:ring-offset-2"
                                >
                                    View Details
                                    <svg
                                        className="w-2 h-3 ml-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More / Show Less Controls */}
                <div className="mt-12 text-center">
                    {showLoadMore && (
                        <button 
                            onClick={handleLoadMore}
                            className="inline-flex items-center justify-center py-3 px-8 text-sm font-medium text-white bg-[#99010e] hover:bg-[#7a010b] rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                            data-aos="fade-up"
                        >
                            <span>Load More Services</span>
                            <svg
                                className="w-5 h-5 ml-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </button>
                    )}
                    
                    {displayCount > 8 && !showLoadMore && (
                        <button 
                            onClick={handleShowLess}
                            className="inline-flex items-center justify-center py-3 px-8 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                            data-aos="fade-up"
                        >
                            <span>Show Less</span>
                            <svg
                                className="w-5 h-5 ml-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                                />
                            </svg>
                        </button>
                    )}
                    
                    {displayCount > 8 && showLoadMore && (
                        <p className="mt-4 text-sm text-gray-500">
                            Showing {displayCount} of {services.length} services
                        </p>
                    )}
                </div>

                {/* Alternative: Simple pagination indicator */}
                <div className="mt-8 flex items-center justify-center space-x-2">
                    {[8, 12, services.length].map((count) => (
                        <button
                            key={count}
                            onClick={() => {
                                setDisplayCount(count);
                                setShowLoadMore(count < services.length);
                            }}
                            className={`w-3 h-3 rounded-full transition-all ${
                                displayCount === count 
                                    ? 'bg-[#99010e] scale-125' 
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Show ${count} services`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Service