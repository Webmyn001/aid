import React, { useEffect, useState } from 'react'
import Image1 from "./Image/certificate.jpg"
import Image2 from "./Image/certificate1.jpg"
import Image3 from "./Image/cert3.jpg"
import AOS from "aos";
import "aos/dist/aos.css";
import { FiAward, FiBookmark, FiCheckCircle, FiFileText } from 'react-icons/fi';

// Certificate data array
const certificates = [
    {
        id: 1,
        image: Image1,
        title: "Certificate of Incorporation",
        issuedBy: "Corporate Affairs Commission (CAC), Nigeria",
        year: "2024",
        regNo: "RC-81107020",
        description: "Official incorporation certification authorizing standard commercial, architectural, and interior design operations nationwide."
    },
    {
        id: 2,
        image: Image2,
        title: "Taxpayer Identification Certification",
        issuedBy: "Joint Tax Board (JTB) & FIRS, Nigeria",
        year: "2024",
        regNo: "TIN-Verified",
        description: "Certification of state and national tax compliance verifying transparent trade practices and corporate financial integrity."
    },
    {
        id: 3,
        image: Image3,
        title: "Special Control Unit Against Money Laundering",
        issuedBy: "SCUML & EFCC, Nigeria",
        year: "2024",
        regNo: "SCUML-Approved",
        description: "Accreditation demonstrating complete compliance with anti-money laundering regulations and standard corporate ethics."
    }
];

function Certifications() {
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50
        });
    }, []);

    const openModal = (cert) => {
        setSelectedCertificate(cert);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; 
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto'; 
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white font-Outfit">
            <div className="max-w-7xl mx-auto">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-bold text-[#d2ab66] tracking-[0.25em] uppercase bg-[#d2ab66]/10 px-3.5 py-1.5 rounded-full inline-block mb-4">
                        Accreditations & Legals
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Verified Credentials
                    </h2>
                    <div className="w-24 h-[2px] bg-[#d2ab66] mx-auto mb-6"></div>
                    <p className="text-gray-500 font-light max-w-xl mx-auto text-sm leading-relaxed">
                        We operate with absolute transparency and legal compliance. Our verified state credentials guarantee your peace of mind.
                    </p>
                </div>

                {/* Certificates Grid - Beautiful Modular Arrangement */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert, index) => (
                        <div
                            key={cert.id}
                            className="group relative bg-[#fafafa] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#d2ab66]/20 flex flex-col justify-between"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            
                            <div>
                                {/* Visual Header / Miniature Lightbox Zoom */}
                                <div 
                                    className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-gray-150 border-b border-gray-100"
                                    onClick={() => openModal(cert)}
                                >
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="text-center">
                                            <span className="inline-flex items-center justify-center w-12 h-12 bg-[#d2ab66] text-[#0a0a0a] rounded-full mb-2 shadow-lg">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                </svg>
                                            </span>
                                            <p className="text-white font-bold text-xs uppercase tracking-wider">Preview Document</p>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase bg-[#0c0c0c] border border-[#d2ab66]/30 text-[#d2ab66] shadow-md">
                                            {cert.regNo}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="p-6 sm:p-8 space-y-4">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#d2ab66] transition-colors leading-tight">
                                        {cert.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-light leading-relaxed">
                                        {cert.description}
                                    </p>
                                </div>
                            </div>

                            {/* bottom metadata and controls */}
                            <div className="p-6 sm:p-8 pt-0 space-y-4">
                                <div className="border-t border-gray-100 pt-4 space-y-2">
                                    <div className="flex items-center text-xs text-gray-400">
                                        <FiBookmark className="mr-2 text-[#d2ab66]" />
                                        <span className="font-semibold text-gray-500 uppercase tracking-wider">Issued:</span>
                                        <span className="ml-1.5 font-light">{cert.issuedBy}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-400">
                                        <FiFileText className="mr-2 text-[#d2ab66]" />
                                        <span className="font-semibold text-gray-500 uppercase tracking-wider">Status:</span>
                                        <span className="ml-1.5 font-bold text-emerald-600">Active / CAC-Verified</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => openModal(cert)}
                                    className="w-full inline-flex items-center justify-center py-3 px-4 text-xs font-bold text-[#0a0a0a] bg-[#d2ab66] hover:bg-transparent border border-transparent hover:border-[#d2ab66] hover:text-[#d2ab66] rounded-full transition-all duration-300 shadow-sm"
                                >
                                    <span>Expand Certificate Details</span>
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Corporate Trust Badges - Very premium addition */}
                <div className="mt-20 bg-[#0c0c0c] border border-[#d2ab66]/20 p-8 rounded-3xl shadow-xl text-center" data-aos="fade-up">
                    <h3 className="text-xl font-bold text-white mb-6">Our Core Professional Assurances</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "100% Tax Compliant",
                                description: "State JTB registered credentials assuring smooth corporate honesy."
                            },
                            {
                                title: "Authorized Contractors",
                                description: "Full Corporate Affairs Commission registration: RC-81107020."
                            },
                            {
                                title: "Legal Safety SCUML",
                                description: "Approved anti-money laundering certifications backing all major transactions."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#d2ab66]/10 text-[#d2ab66] mb-3">
                                    <FiCheckCircle size={20} />
                                </div>
                                <h4 className="font-bold text-[#d2ab66] text-sm mb-1">{item.title}</h4>
                                <p className="text-xs text-gray-400 font-light leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Certificate modal Viewer */}
            {isModalOpen && selectedCertificate && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
                    onClick={closeModal}
                >
                    <div 
                        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{selectedCertificate.title}</h3>
                                <p className="text-[#d2ab66] text-xs font-bold uppercase tracking-wider mt-1">
                                    Reference: {selectedCertificate.regNo}
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            
                            {/* Certificate Image Frame */}
                            <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
                                <img
                                    src={selectedCertificate.image}
                                    alt={selectedCertificate.title}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                            
                            {/* Description and metadata */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-4 text-base">
                                    Legal Authority Details
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <p className="text-gray-500 font-light text-sm leading-relaxed">
                                            {selectedCertificate.description}
                                        </p>
                                        <div className="flex items-center text-xs text-[#d2ab66]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#d2ab66] mr-2"></span>
                                            <span className="font-bold uppercase tracking-wider">Officially Audited & Approved</span>
                                        </div>
                                    </div>

                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                        <h5 className="font-bold text-gray-900 mb-4 text-sm">
                                            Registry Metrics
                                        </h5>

                                        <dl className="space-y-3">
                                            <div className="flex justify-between text-xs border-b border-gray-50 pb-2">
                                                <dt className="text-gray-400">Authority</dt>
                                                <dd className="font-semibold text-gray-800">
                                                    {selectedCertificate.issuedBy}
                                                </dd>
                                            </div>

                                            <div className="flex justify-between text-xs border-b border-gray-50 pb-2">
                                                <dt className="text-gray-400">Registration ID</dt>
                                                <dd className="font-mono font-bold text-gray-800">
                                                    {selectedCertificate.regNo}
                                                </dd>
                                            </div>

                                            <div className="flex justify-between text-xs border-b border-gray-50 pb-2">
                                                <dt className="text-gray-400">Issue Year</dt>
                                                <dd className="font-semibold text-gray-800">
                                                    {selectedCertificate.year}
                                                </dd>
                                            </div>

                                            <div className="flex justify-between text-xs">
                                                <dt className="text-gray-400">Legitimacy Status</dt>
                                                <dd className="font-bold text-emerald-600">
                                                    Active and Legitimate
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </section>
    )
}

export default Certifications;