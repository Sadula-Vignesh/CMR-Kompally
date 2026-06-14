'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { NAV_LINKS, SCHOOL_PHONE } from '@/lib/constants';

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
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 3 }}
          className={`pointer-events-auto max-w-[1480px] mx-auto w-[96%] lg:w-[96%] xl:w-[95%] bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-slate-100/80 px-4 sm:px-6 lg:px-6 xl:px-8 flex justify-between items-center transition-all duration-300 ${
            isScrolled ? 'py-1.5 shadow-xl border-slate-200/50' : 'py-2.5'
          }`}
        >
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 3.1, ease: "easeOut" }}
          >
            <Link href="/" className="flex items-center gap-3 select-none group shrink-0">
              <div className="relative w-10 h-10 md:w-11 md:h-11 overflow-hidden rounded-full shrink-0 border border-slate-100 bg-white p-0.5 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/cmr_logo.jpg"
                  alt="CMR Logo"
                  fill
                  sizes="44px"
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              
              {/* Divider Line */}
              <div className="h-8 w-[1.5px] bg-brand-navy/15 shrink-0" />
              
              {/* Logo Text - Unified vertical spacing gaps */}
              <div className="flex flex-col gap-[3px] font-display select-none text-left justify-center">
                <span className="font-black text-brand-navy text-[13px] leading-none tracking-tight transition-colors group-hover:text-brand-orange duration-350">
                  CMR
                </span>
                <span className="font-black text-brand-navy text-[13px] leading-none tracking-tight transition-colors group-hover:text-brand-orange duration-350">
                  SCHOOL
                </span>
                <span className="font-extrabold text-brand-orange text-[9.5px] leading-none tracking-wider uppercase">
                  KOMPALLY
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 3.2,
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center lg:space-x-1 xl:space-x-2.5 2xl:space-x-3.5 font-body"
          >
            {NAV_LINKS.map((link) => {
              const hasChildren = !!link.children;
              const isActive = pathname === link.href || link.children?.some(c => pathname === c.href);
              
              if (hasChildren) {
                return (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    key={link.label}
                    className="relative group py-1.5"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`inline-flex items-center text-xs xl:text-[13px] 2xl:text-sm font-bold transition-all duration-300 gap-1 focus:outline-none cursor-pointer px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-full whitespace-nowrap ${
                        isActive
                          ? 'bg-brand-navy/5 text-brand-orange'
                          : 'text-brand-navy hover:text-brand-orange hover:bg-brand-navy/5'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl shadow-xl bg-white/95 backdrop-blur-md border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top group-hover:translate-y-0 -translate-y-2">
                      <div className="py-2 px-1.5">
                        {link.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`block px-4 py-2 text-xs lg:text-sm transition-all duration-200 rounded-xl font-bold text-slate-700 hover:bg-brand-cream hover:text-brand-orange whitespace-nowrap ${
                              pathname === child.href ? 'bg-brand-cream/80 text-brand-orange font-bold' : ''
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  key={link.label}
                >
                  <Link
                    href={link.href}
                    className={`text-xs xl:text-[13px] 2xl:text-sm font-bold px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? 'bg-brand-navy/5 text-brand-orange'
                        : 'text-brand-navy hover:text-brand-orange hover:bg-brand-navy/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Call to Action & Hamburger */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 3.1, ease: "easeOut" }}
            className="flex items-center space-x-2 xl:space-x-3 shrink-0"
          >
            {/* Outline CALL US button */}
            <a
              href={`tel:${SCHOOL_PHONE}`}
              className="hidden xl:inline-flex items-center gap-1.5 px-4 py-2 border border-brand-navy/15 hover:border-brand-navy hover:bg-brand-navy/5 rounded-full text-xs font-bold text-brand-navy transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              CALL US
            </a>

            {/* Filled Admissions Open button */}
            <Link
              href="/admissions"
              className="hidden sm:inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orange/90 text-white px-4 py-2 xl:px-5 xl:py-2.5 rounded-full text-xs font-bold shadow-md hover:shadow-brand-orange/20 transition-all duration-300 select-none whitespace-nowrap hover:scale-[1.03] active:scale-[0.98]"
            >
              Admissions Open 2026-27
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-brand-navy hover:bg-brand-navy/5 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </motion.div>
        </motion.div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-45 bg-brand-dark/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 bg-white/95 backdrop-blur-md shadow-2xl p-6 lg:hidden transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-full shrink-0 border border-brand-orange/20 bg-white p-0.5">
              <Image
                src="/images/cmr_logo.jpg"
                alt="CMR Logo"
                fill
                sizes="40px"
                className="object-contain rounded-full"
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
            className="p-2 text-slate-500 hover:text-brand-navy focus:outline-none cursor-pointer rounded-full hover:bg-slate-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col space-y-3.5 overflow-y-auto max-h-[calc(100vh-220px)] pr-2">
          {NAV_LINKS.map((link) => {
            const hasChildren = !!link.children;
            const isDropdownActive = activeDropdown === link.label;
            
            if (hasChildren) {
              return (
                <div key={link.label} className="border-b border-slate-50 pb-2">
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="w-full flex justify-between items-center text-sm font-bold text-brand-navy py-1.5 focus:outline-none text-left cursor-pointer"
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownActive ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`pl-4 mt-1.5 space-y-2 overflow-hidden transition-all duration-300 ${
                      isDropdownActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {link.children?.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-xs font-semibold py-1.5 transition-colors ${
                          pathname === child.href ? 'text-brand-orange font-bold' : 'text-slate-650 hover:text-brand-orange'
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
                className={`text-sm font-semibold py-1.5 border-b border-slate-50 block transition-colors ${
                  pathname === link.href ? 'text-brand-orange' : 'text-brand-navy hover:text-brand-orange'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Admissions CTA */}
        <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-slate-100">
          <Link
            href="/admissions"
            className="w-full justify-center flex gap-2 bg-brand-orange hover:bg-brand-orange/95 text-white py-3 rounded-full text-xs font-bold items-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Phone className="w-4 h-4" />
            Admissions 2026-27
          </Link>
        </div>
      </div>
    </>
  );
}
