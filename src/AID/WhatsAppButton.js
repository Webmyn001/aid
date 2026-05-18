import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

function WhatsAppButton() {
  // Concise, professional WhatsApp pretext message
  const greetingText = `Hello, I would like to make an inquiry regarding your bespoke architectural designs, premium products, and interior styling services. I am interested in scheduling a consultation session with your team to discuss my project.

Best regards,
AID Concepts Team`;

  const encodedMessage = encodeURIComponent(greetingText);
  const whatsappNumber = '2349036918823'; // Chief Executive Officer WhatsApp number

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group"
      aria-label="Contact CEO on WhatsApp"
    >
      {/* Reduced WhatsApp Icon Size */}
      <FaWhatsapp className="w-6 h-6" />
      
      {/* Compact Text, limited slide-out exclusively to desktop (hover states) to preserve mobile spacing */}
      <span className="max-w-0 overflow-hidden md:group-hover:max-w-xs md:group-hover:ml-2 font-Outfit font-bold text-[11px] tracking-wider uppercase whitespace-nowrap transition-all duration-300 ease-in-out">
        Chat
      </span>
    </a>
  );
}

export default WhatsAppButton;
