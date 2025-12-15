import React, { useEffect, useState } from 'react'
import Image1 from "./Image/certificate.jpg"
import Image2 from "./Image/certificate1.jpg"
import Image3 from "./Image/cert3.jpg"
import AOS from "aos";
import "aos/dist/aos.css";

// Certificate data array for scalability
const certificates = [
    {
        id: 1,
        image: Image1,
        title: "Certificate of Incorporation",
        issuedBy: "Certificate of Incorporation",
        year: "2024"
    },
    {
        id: 2,
        image: Image2,
        title: "Certifiacte Of Taxpayer Identification Number",
        issuedBy: "Joint Tax Board",
        year: "2024"
    },
    {
        id: 3,
        image: Image3,
        title: "Special Control Unit Against Money Laundering",
        issuedBy: "SCUML",
        year: "2024"
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
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <span className="inline-block text-[#99010e] text-sm font-medium tracking-widest uppercase mb-4">
                        Accreditations
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Certifications
                    </h2>
                    <div className="w-20 h-px bg-gray-300 mx-auto"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-6">
                        Recognized for excellence in interior design and home decor services
                    </p>
                </div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {certificates.map((cert, index) => (
                        <div
                            key={cert.id}
                            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Image Container with Overlay */}
                            <div 
                                className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                                onClick={() => openModal(cert)}
                            >
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-center p-4">
                                        <span className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </span>
                                        <p className="text-white font-medium text-sm">Click to view details</p>
                                    </div>
                                </div>
                                
                                {/* Certificate Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#99010e] text-white">
                                        Certified
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 md:p-6">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#99010e] transition-colors">
                                    {cert.title}
                                </h3>
                                
                                {/* Issuer and Year */}
                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <span className="font-medium">Issued by:</span>
                                        <span className="ml-1">{cert.issuedBy}</span>
                                    </div>
                                    
                                    <div className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="font-medium">Year:</span>
                                        <span className="ml-1">{cert.year}</span>
                                    </div>
                                </div>

                                {/* View Certificate Button */}
                                <button
                                    onClick={() => openModal(cert)}
                                    className="w-full mt-6 inline-flex items-center justify-center py-2.5 px-4 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300 hover:text-[#99010e]"
                                >
                                    <span>View Certificate</span>
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
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#99010e]/10 rounded-xl pointer-events-none transition-all duration-300" />
                        </div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 bg-gradient-to-r from-gray-50 to-white p-8 rounded-2xl border border-gray-200" data-aos="fade-up">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Our Certifications Matter</h3>
                        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
                            Our certifications validate our commitment to quality, professional standards, and 
                            continuous improvement in interior design services. They assure you of our expertise 
                            and adherence to industry best practices.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Quality Assurance",
                                    description: "Certified professionals delivering exceptional results"
                                },
                                {
                                    title: "Industry Standards",
                                    description: "Adherence to global interior design standards"
                                },
                                {
                                    title: "Client Confidence",
                                    description: "Verified expertise for your peace of mind"
                                }
                            ].map((item, index) => (
                                <div key={index} className="text-center p-4">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#99010e]/10 text-[#99010e] mb-4">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            {isModalOpen && selectedCertificate && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
                    onClick={closeModal}
                >
                    <div 
                        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{selectedCertificate.title}</h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    {selectedCertificate.issuedBy} • {selectedCertificate.year}
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="relative overflow-hidden rounded-lg border border-gray-200">
                                <img
                                    src={selectedCertificate.image}
                                    alt={selectedCertificate.title}
                                    className="w-full h-auto"
                                />
                            </div>
                            
 <div className="mt-6 sm:mt-8 bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-lg">
  <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">
    About This Certification
  </h4>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
    
    {/* Left Content */}
    <div>
      <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
        This certification demonstrates our expertise and commitment to maintaining 
        the highest standards in interior design and home decor services.
      </p>

      <ul className="space-y-2 sm:space-y-3">
        <li className="flex items-start text-sm sm:text-base text-gray-600">
          <svg
            className="w-4 h-4 mt-0.5 mr-2 text-green-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Verified professional standards</span>
        </li>

        <li className="flex items-start text-sm sm:text-base text-gray-600">
          <svg
            className="w-4 h-4 mt-0.5 mr-2 text-green-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Industry-recognized accreditation</span>
        </li>
      </ul>
    </div>

    {/* Right Card */}
    <div className="bg-white p-4 sm:p-5 rounded-lg border border-gray-200">
      <h5 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">
        Certificate Details
      </h5>

      <dl className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
          <dt className="text-gray-600">Issuing Authority</dt>
          <dd className="font-medium text-gray-900">
            {selectedCertificate.issuedBy}
          </dd>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
          <dt className="text-gray-600">Issue Date</dt>
          <dd className="font-medium text-gray-900">
            {selectedCertificate.year}
          </dd>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
          <dt className="text-gray-600">Status</dt>
          <dd className="font-medium text-green-600">
            Active and Valid
          </dd>
        </div>
      </dl>
    </div>

  </div>
</div>


                        </div>

                        {/* Modal Footer */}
                        {/* <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex items-center justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                            <button className="px-6 py-2.5 text-sm font-medium text-white bg-[#99010e] hover:bg-[#7a010b] rounded-lg transition-colors inline-flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Certificate
                            </button>
                        </div> */}
                    </div>
                </div>
            )}
        </section>
    )
}

export default Certifications;