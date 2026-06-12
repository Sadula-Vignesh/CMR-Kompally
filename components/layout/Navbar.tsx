'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, PhoneCall, Phone } from 'lucide-react';
import { NAV_LINKS, SCHOOL_NAME, SCHOOL_PHONE } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pointer-events-none bg-transparent ${
          isScrolled ? 'pt-2' : 'pt-4 md:pt-5'
        }`}
      >
        <div
          className={`pointer-events-auto max-w-7xl mx-auto w-[92%] sm:w-[94%] md:w-full bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-gray-100 px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-300 ${
            isScrolled ? 'py-1.5 shadow-xl border-gray-200/50' : 'py-3'
          }`}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 select-none">
            <div className="relative w-10 h-10 md:w-11 md:h-11 overflow-hidden rounded-md shrink-0 border border-gray-100 bg-white">
              <Image
                src="/images/cmr_logo.jpg"
                alt="CMR Logo"
                fill
                sizes="44px"
                className="object-contain"
              />
            </div>
            
            {/* Divider Line */}
            <div className="h-8 md:h-9 w-[1.5px] bg-brand-navy/25 shrink-0" />
            
            {/* Text details matching reference image styling */}
            <div className="flex flex-col font-display leading-[1.05] select-none text-left">
              <span className="font-extrabold text-brand-navy text-sm md:text-base tracking-tight">
                CMR
              </span>
              <span className="font-extrabold text-brand-navy text-sm md:text-base tracking-tight">
                SCHOOL
              </span>
              <span className="font-bold text-brand-orange text-[9px] md:text-[10px] tracking-wider uppercase">
                KOMPALLY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 font-body">
            {NAV_LINKS.map((link) => {
              const hasChildren = !!link.children;
              const isActive = pathname === link.href || link.children?.some(c => pathname === c.href);
              
              if (hasChildren) {
                return (
                  <div
                    key={link.label}
                    className="relative group py-2"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`inline-flex items-center text-xs lg:text-sm font-semibold transition-all duration-200 gap-1 focus:outline-none cursor-pointer px-3 py-1.5 rounded-full ${
                        isActive
                          ? 'bg-brand-navy text-white shadow-sm'
                          : 'text-brand-navy hover:text-brand-orange hover:bg-brand-navy/5'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl shadow-xl bg-white border border-gray-100 ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top group-hover:translate-y-0 -translate-y-2">
                      <div className="py-2 px-1">
                        {link.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`block px-4 py-2 text-xs lg:text-sm transition-all rounded-xl font-medium text-gray-700 hover:bg-brand-cream hover:text-brand-navy ${
                              pathname === child.href ? 'bg-brand-cream/80 text-brand-orange font-semibold' : ''
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs lg:text-sm font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-brand-navy hover:text-brand-orange hover:bg-brand-navy/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Call to Action & Hamburger */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Outline CALL US button */}
            <a
              href={`tel:${SCHOOL_PHONE}`}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-brand-navy/20 hover:border-brand-navy/40 hover:bg-brand-navy/5 rounded-full text-xs font-bold text-brand-navy transition-all duration-300 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              CALL US
            </a>

            {/* Filled Admissions Open button */}
            <Link
              href="/admissions"
              className="hidden sm:inline-flex items-center justify-center bg-[#5fa592] hover:bg-[#4e8e7c] text-white px-4.5 py-2 rounded-full text-xs font-bold shadow-sm transition-all duration-300 select-none whitespace-nowrap"
            >
              Admissions Open 2026-27
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-brand-navy hover:bg-brand-navy/5 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-45 bg-brand-navy/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-2xl p-6 lg:hidden transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 overflow-hidden rounded-md shrink-0 border border-gray-100 bg-white">
              <Image
                src="/images/cmr_logo.jpg"
                alt="CMR Logo"
                fill
                sizes="32px"
                className="object-contain"
              />
            </div>
            
            {/* Divider Line */}
            <div className="h-7 w-[1.5px] bg-brand-navy/25 shrink-0" />
            
            {/* Text details matching reference image styling */}
            <div className="flex flex-col font-display leading-[1.05] select-none text-left">
              <span className="font-extrabold text-brand-navy text-xs tracking-tight">
                CMR
              </span>
              <span className="font-extrabold text-brand-navy text-xs tracking-tight">
                SCHOOL
              </span>
              <span className="font-bold text-brand-orange text-[8px] tracking-wider uppercase">
                KOMPALLY
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-gray-500 hover:text-brand-navy focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
          {NAV_LINKS.map((link) => {
            const hasChildren = !!link.children;
            const isDropdownActive = activeDropdown === link.label;
            
            if (hasChildren) {
              return (
                <div key={link.label} className="border-b border-gray-50 pb-2">
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="w-full flex justify-between items-center text-sm font-semibold text-brand-navy py-1.5 focus:outline-none text-left"
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownActive ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`pl-4 mt-1 space-y-1.5 overflow-hidden transition-all duration-300 ${
                      isDropdownActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {link.children?.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-xs font-medium py-1.5 transition-colors ${
                          pathname === child.href ? 'text-brand-orange font-bold' : 'text-gray-600 hover:text-brand-navy'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold py-1.5 border-b border-gray-50 block transition-colors ${
                  pathname === link.href ? 'text-brand-orange' : 'text-brand-navy hover:text-brand-orange'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Admissions CTA */}
        <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-gray-100">
          <Button
            href="/admissions"
            variant="orange"
            className="w-full justify-center flex gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <PhoneCall className="w-4 h-4" />
            Admissions 2026-27
          </Button>
        </div>
      </div>
    </>
  );
}
