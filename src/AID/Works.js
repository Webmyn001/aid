import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';

function Works() {
    const [recentWork, setRecentWork] = useState([])
    const [displayCount, setDisplayCount] = useState(4); // Initial number of works to show
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
        // Check if we need to show the Load More button
        setShowLoadMore(displayCount < recentWork.length)
    }, [displayCount, recentWork.length])

    const handleLoadMore = () => {
        // Show 3 more works each time (to match grid columns)
        const newCount = displayCount + 3;
        setDisplayCount(newCount);
        
        if (newCount >= recentWork.length) {
            setShowLoadMore(false);
        }
    }

    const handleShowLess = () => {
        // Reset to initial count
        setDisplayCount(4);
        setShowLoadMore(true);
    }

    // Get only the works to display
    const worksToDisplay = recentWork.slice(0, displayCount);

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <span className="inline-block text-[#99010e] text-sm font-medium tracking-widest uppercase mb-4">
                        Our Portfolio
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Recent Works
                    </h2>
                    <div className="w-20 h-px bg-gray-300 mx-auto"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-6">
                        A showcase of our latest interior design projects and transformations
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#99010e]"></div>
                        <p className="mt-4 text-gray-600">Loading our portfolio...</p>
                    </div>
                )}

                {/* Works Grid */}
                {!loading && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {worksToDisplay.map((work, index) => (
                                <div
                                    key={work.id || index}
                                    className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
                                    data-aos="fade-up"
                                    data-aos-delay={index % 3 * 100}
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={work.image}
                                            alt={work.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        
                                        {/* Project Badge */}
                                        <div className="absolute top-4 right-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800">
                                                Project
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 md:p-6">
                                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#99010e] transition-colors">
                                            {work.title}
                                        </h3>
                                        
                                        {/* Price */}
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                            <div>
                                                <span className="text-sm text-gray-500">Project Value</span>
                                                <p className="text-lg font-bold text-[#99010e]">
                                                    {work.price || "Price on request"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Effect Border */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#99010e]/10 rounded-xl pointer-events-none transition-all duration-300" />
                                </div>
                            ))}
                        </div>

                        {/* No Works State */}
                        {!loading && recentWork.length === 0 && (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Yet</h3>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    Our portfolio is currently being updated with our latest interior design projects. Check back soon!
                                </p>
                            </div>
                        )}

                        {/* Load More / Show Less Controls */}
                        {recentWork.length > 4 && (
                            <div className="mt-12 text-center">
                                {showLoadMore && (
                                    <button 
                                        onClick={handleLoadMore}
                                        className="inline-flex items-center justify-center py-3 px-8 text-sm font-medium text-white bg-[#99010e] hover:bg-[#7a010b] rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
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
                                
                                {displayCount > 4 && !showLoadMore && (
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
                                
                                {displayCount > 4 && showLoadMore && (
                                    <p className="mt-4 text-sm text-gray-500">
                                        Showing {displayCount} of {recentWork.length} projects
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Simple pagination indicator */}
                        {recentWork.length > 4 && (
                            <div className="mt-8 flex items-center justify-center space-x-2">
                                {[6, 9, 12].filter(count => count <= recentWork.length).map((count) => (
                                    <button
                                        key={count}
                                        onClick={() => {
                                            setDisplayCount(count);
                                            setShowLoadMore(count < recentWork.length);
                                        }}
                                        className={`w-3 h-3 rounded-full transition-all ${
                                            displayCount === count 
                                                ? 'bg-[#99010e] scale-125' 
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                        aria-label={`Show ${count} projects`}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

            {/* Call to Action */}
<div className="mt-12 sm:mt-16 px-4 text-center" data-aos="fade-up">
  <div className="bg-gradient-to-r from-gray-50 to-white 
                  p-6 sm:p-8 
                  rounded-xl sm:rounded-2xl 
                  border border-gray-200">

    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
      Have a Project in Mind?
    </h3>

    <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 
                  max-w-md sm:max-w-lg mx-auto">
      Let's discuss how we can transform your space into something extraordinary
    </p>

    <Link to="/contact" className="inline-block w-full sm:w-auto">
      <button
        className="w-full sm:w-auto
                   inline-flex items-center justify-center
                   py-3 px-6 sm:px-8
                   text-sm sm:text-base font-medium
                   text-white bg-gray-900 hover:bg-black
                   rounded-lg
                   transition-all duration-300
                   sm:hover:scale-105"
      >
        <span>Start Your Project</span>
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </Link>

  </div>
</div>

            </div>
        </section>
    )
}

export default Works