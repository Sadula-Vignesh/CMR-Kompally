import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SCHOOL_NAME, SCHOOL_ADDRESS, SCHOOL_PHONE, SCHOOL_EMAIL, SCHOOL_TIMINGS, SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t-4 border-brand-gold relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Column 1: Logo & Socials */}
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="font-display font-bold text-2xl text-white">CMR</h3>
            <span className="text-xs font-semibold text-brand-goldLight uppercase tracking-wider block mt-0.5">School Kompally</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            CMR School Kompally is dedicated to providing high-quality CBSE education, fostering academic excellence, holistic development, and moral character in young minds.
          </p>
          {/* Social media icons */}
          <div className="flex space-x-3 pt-2">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-brand-orange text-white rounded-full transition-colors duration-200" aria-label="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-brand-orange text-white rounded-full transition-colors duration-200" aria-label="Instagram">
              <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-brand-orange text-white rounded-full transition-colors duration-200" aria-label="YouTube">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-brand-orange text-white rounded-full transition-colors duration-200" aria-label="Twitter">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-display font-semibold text-lg text-brand-gold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-brand-orange">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-brand-goldLight transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-brand-goldLight transition-colors">About Us</Link></li>
            <li><Link href="/academics" className="hover:text-brand-goldLight transition-colors">Academics</Link></li>
            <li><Link href="/co-curricular" className="hover:text-brand-goldLight transition-colors">Co-Curricular</Link></li>
            <li><Link href="/gallery" className="hover:text-brand-goldLight transition-colors">Gallery</Link></li>
            <li><Link href="/news" className="hover:text-brand-goldLight transition-colors">Blog & News</Link></li>
            <li><Link href="/contact" className="hover:text-brand-goldLight transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Academics Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-display font-semibold text-lg text-brand-gold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-brand-orange">
            Academics
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/academics/curriculum" className="hover:text-brand-goldLight transition-colors">CBSE Curriculum</Link></li>
            <li><Link href="/academics/iit-foundation" className="hover:text-brand-goldLight transition-colors">IIT Foundation</Link></li>
            <li><Link href="/academics/labs/space" className="hover:text-brand-goldLight transition-colors">Space Lab</Link></li>
            <li><Link href="/academics/labs/science" className="hover:text-brand-goldLight transition-colors">Science Labs</Link></li>
            <li><Link href="/academics/labs/maths" className="hover:text-brand-goldLight transition-colors">Mathematics Lab</Link></li>
            <li><Link href="/academics/labs/computer" className="hover:text-brand-goldLight transition-colors">Computer Lab</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-display font-semibold text-lg text-brand-gold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-brand-orange">
            Contact Info
          </h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-2">
              <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <span>{SCHOOL_ADDRESS}</span>
            </li>
            <li className="flex gap-2 items-center">
              <Phone className="w-4 h-4 text-brand-orange shrink-0" />
              <span>{SCHOOL_PHONE}</span>
            </li>
            <li className="flex gap-2 items-center">
              <Mail className="w-4 h-4 text-brand-orange shrink-0" />
              <span>{SCHOOL_EMAIL}</span>
            </li>
            <li className="flex gap-2 items-center">
              <Clock className="w-4 h-4 text-brand-orange shrink-0" />
              <span>{SCHOOL_TIMINGS}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">
        <span>© 2026 {SCHOOL_NAME}. All Rights Reserved.</span>
        <span>Designed with ❤️ for Education</span>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href={SOCIAL_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center border border-white/20"
        aria-label="Chat on WhatsApp"
      >
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
}
