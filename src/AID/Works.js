import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';

function Works() {
    const [recentWork, setRecentWork] = useState([])
    const [displayCount, setDisplayCount] = useState(6); // Show 6 initially (standard portfolio count)
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50
        })

        // Fetch recent works
        axios.get("https://aid-server.vercel.app/api/advert/get")
            .then(res => {
                setRecentWork(res.data)
                setLoading(false)
                setShowLoadMore(res.data.length > displayCount)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        setShowLoadMore(displayCount < recentWork.length)
    }, [displayCount, recentWork.length])

    const handleLoadMore = () => {
        const newCount = displayCount + 3;
        setDisplayCount(newCount);
        if (newCount >= recentWork.length) {
            setShowLoadMore(false);
        }
    }

    const handleShowLess = () => {
        setDisplayCount(6);
        setShowLoadMore(true);
    }

    const worksToDisplay = recentWork.slice(0, displayCount);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white font-Outfit">
            <div className="max-w-7xl mx-auto">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-bold text-[#d2ab66] tracking-[0.25em] uppercase bg-[#d2ab66]/10 px-3.5 py-1.5 rounded-full inline-block mb-4">
                        Elite Portfolio
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Recent Projects
                    </h2>
                    <div className="w-24 h-[2px] bg-[#d2ab66] mx-auto mb-6"></div>
                    <p className="text-gray-500 font-light max-w-xl mx-auto text-sm leading-relaxed">
                        A curation of our recent high-end residential and commercial interior design transformations across Nigeria.
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-16">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#d2ab66]"></div>
                        <p className="mt-4 text-gray-400 font-light text-sm">Loading our portfolio...</p>
                    </div>
                )}

                {/* Works Grid */}
                {!loading && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {worksToDisplay.map((work, index) => (
                                <div
                                    key={work.id || index}
                                    className="group relative bg-[#fafafa] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#d2ab66]/20"
                                    data-aos="fade-up"
                                    data-aos-delay={index % 3 * 100}
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-video overflow-hidden bg-gray-50">
                                        <img
                                            src={work.image}
                                            alt={work.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        
                                        <div className="absolute top-4 right-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#d2ab66] text-[#0a0a0a]">
                                                Project
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-6">
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-[#d2ab66] transition-colors">
                                            {work.title}
                                        </h3>
                                        
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                            <div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Project Value</span>
                                                <p className="text-base font-extrabold text-[#d2ab66] mt-0.5">
                                                    {work.price || "Price on request"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Effect Border */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#d2ab66]/10 rounded-2xl pointer-events-none transition-all duration-300" />
                                </div>
                            ))}
                        </div>

                        {/* No Works State */}
                        {!loading && recentWork.length === 0 && (
                            <div className="text-center py-16">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-50 mb-4">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">No Projects Yet</h3>
                                <p className="text-gray-400 font-light max-w-sm mx-auto text-sm">
                                    Our portfolio is currently being updated with our latest interior design projects. Check back soon!
                                </p>
                            </div>
                        )}

                        {/* Load More / Show Less Controls */}
                        {recentWork.length > 6 && (
                            <div className="mt-16 text-center">
                                {showLoadMore && (
                                    <button 
                                        onClick={handleLoadMore}
                                        className="inline-flex items-center justify-center py-3.5 px-8 text-sm font-bold text-[#0a0a0a] bg-[#d2ab66] hover:bg-transparent border border-transparent hover:border-[#d2ab66] hover:text-[#d2ab66] rounded-full transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95"
                                        data-aos="fade-up"
                                    >
                                        <span>Load More Projects</span>
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
                                
                                {displayCount > 6 && !showLoadMore && (
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
                        )}

                        {/* pagination dots */}
                        {recentWork.length > 6 && (
                            <div className="mt-12 flex items-center justify-center space-x-2.5">
                                {[6, 9, 12].filter(count => count <= recentWork.length).map((count) => (
                                    <button
                                        key={count}
                                        onClick={() => {
                                            setDisplayCount(count);
                                            setShowLoadMore(count < recentWork.length);
                                        }}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                            displayCount === count 
                                                ? 'bg-[#d2ab66] scale-125' 
                                                : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                        aria-label={`Show ${count} projects`}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Outstanding Luxury Call to Action Box */}
                <div className="mt-24 px-4 text-center" data-aos="fade-up">
                    <div className="bg-[#0c0c0c] border border-[#d2ab66]/20 p-8 sm:p-16 rounded-3xl shadow-2xl relative overflow-hidden">
                        
                        {/* Glow Layer */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#d2ab66]/5 rounded-full blur-3xl" />
                        
                        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                                Let's Build Your Dream Space
                            </h3>
                            <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed">
                                Our consultants are available to plan, customize, and deliver premium, high-fidelity interior creations matched strictly to your corporate/residential tastes.
                            </p>
                            <div className="pt-4">
                                <Link to="/contact" className="inline-block">
                                    <button className="inline-flex items-center justify-center py-4 px-10 text-sm font-bold text-[#0a0a0a] bg-[#d2ab66] hover:bg-transparent border border-transparent hover:border-[#d2ab66] hover:text-[#d2ab66] rounded-full transition-all duration-300 shadow-xl transform hover:scale-105 active:scale-95">
                                        <span>Start Your Project Today</span>
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default Works