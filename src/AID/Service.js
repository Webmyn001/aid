import React, { useEffect, useState } from 'react'
import Image1 from "./Image/F4.jpg"
import Image2 from "./Image/L2.jpg"
import Image3 from "./Image/D4.jpg"
import Image4 from "./Image/full-home1.jpg"
import Image5 from "./Image/POP3.jpg"
import Image6 from "./Image/P3.jpg"
import Image7 from "./Image/ST5.jpg"
import Image8 from "./Image/FL5.jpg"
import Image9 from "./Image/W2.jpg"
import Image10 from "./Image/AC1.jpg"
import Image11 from "./Image/cctv2.jpg"
import Image12 from "./Image/GC2.jpg"
import Image13 from "./Image/GD4.jpg"
import Image14 from "./Image/WC1.jpg"

import { Link } from 'react-router-dom';

import AOS from "aos";
import "aos/dist/aos.css";

const services = [
    {
        id: 1,
        Image: Image4,
        Title: "Full Home Interior",
        Link: "/home-interior"
    },
    {
        id: 2,
        Image: Image1,
        Title: "Furnitures",
        Link: "/furnitures"
    },
    {
        id: 3,
        Image: Image3,
        Title: "Decor Accessories",
        Link: "/decor"
    },
    {
        id: 4,
        Image: Image2,
        Title: "Lighting Solutions",
        Link: "/lightning"
    },
    {
        id: 5,
        Image: Image5,
        Title: "P.O.P Ceiling",
        Link: "/pop"
    },
    {
        id: 6,
        Image: Image7,
        Title: "Stucco Painting",
        Link: "/stucco"
    },
    {
        id: 7,
        Image: Image6,
        Title: "Wall Panels",
        Link: "/wall-pannel"
    },
    {
        id: 8,
        Image: Image8,
        Title: "Floor Tiling",
        Link: "/floor"
    },
    {
        id: 9,
        Image: Image9,
        Title: "Window Blind Setup",
        Link: "/Window"
    },
    {
        id: 10,
        Image: Image10,
        Title: "Air Conditioning",
        Link: "/ac"
    },
    {
        id: 11,
        Image: Image11,
        Title: "CCTV Installation",
        Link: "/cctv"
    },
    {
        id: 12,
        Image: Image13,
        Title: "Garden Landscaping",
        Link: "/garden"
    },
    {
        id: 13,
        Image: Image12,
        Title: "Industrial Cleaning",
        Link: "/cleaning"
    },
    {
        id: 14,
        Image: Image14,
        Title: "Tv Console Wall Setup",
        Link: "/console"
    }
];

function Service() {
    const [displayCount, setDisplayCount] = useState(8);
    const [showLoadMore, setShowLoadMore] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50
        });
    }, []);

    const handleLoadMore = () => {
        const nextDisplayCount = displayCount + 4;
        setDisplayCount(nextDisplayCount);
        if (nextDisplayCount >= services.length) {
            setShowLoadMore(false);
        }
    };

    const handleShowLess = () => {
        setDisplayCount(8);
        setShowLoadMore(true);
    };

    const servicesToDisplay = services.slice(0, displayCount);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white font-Outfit">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <span className="text-xs font-bold text-[#d2ab66] tracking-[0.25em] uppercase bg-[#d2ab66]/10 px-3.5 py-1.5 rounded-full inline-block mb-4">
                        Innovative Services
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        What We Offer
                    </h2>
                    <div className="w-24 h-[2px] bg-[#d2ab66] mx-auto"></div>
                </div>

                {/* Section Header */}
                <div className="text-center mb-12">
                    <p className="text-gray-400 max-w-2xl mx-auto font-light text-sm">
                        Showing {displayCount} of {services.length} services
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {servicesToDisplay.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-[#fafafa] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#d2ab66]/20"
                            data-aos="fade-up"
                            data-aos-delay={index % 4 * 100}
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square overflow-hidden bg-gray-50">
                                <img
                                    src={service.Image}
                                    alt={service.Title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-5 text-center">
                                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-[#d2ab66] transition-colors">
                                    {service.Title}
                                </h3>

                                {/* View Details Button - Gold outline with transition */}
                                <Link
                                    to={service.Link}
                                    state={service}
                                    className="inline-flex items-center justify-center w-full py-2.5 px-4 text-xs font-bold text-[#0a0a0a] bg-transparent hover:bg-[#d2ab66] border border-[#d2ab66] hover:border-transparent rounded-full transition-all duration-300 shadow-sm"
                                >
                                    View Details
                                    <svg
                                        className="w-2 h-3 ml-1.5 transition-transform group-hover:translate-x-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More / Show Less Controls */}
                <div className="mt-16 text-center">
                    {showLoadMore && (
                        <button 
                            onClick={handleLoadMore}
                            className="inline-flex items-center justify-center py-3.5 px-8 text-sm font-bold text-[#0a0a0a] bg-[#d2ab66] hover:bg-transparent border border-transparent hover:border-[#d2ab66] hover:text-[#d2ab66] rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95"
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
                            className="inline-flex items-center justify-center py-3.5 px-8 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95"
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
                </div>

                {/* pagination dots - strictly Gold/Charcoal */}
                <div className="mt-12 flex items-center justify-center space-x-2.5">
                    {[8, 12, services.length].map((count) => (
                        <button
                            key={count}
                            onClick={() => {
                                setDisplayCount(count);
                                setShowLoadMore(count < services.length);
                            }}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                displayCount === count 
                                    ? 'bg-[#d2ab66] scale-125' 
                                    : 'bg-gray-200 hover:bg-gray-300'
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