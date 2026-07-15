'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-white/10 py-[14px] px-6 md:px-8 shadow-lg' 
          : 'bg-transparent py-[19px] px-6 md:px-8'
      }`}>
        <div className="w-full flex justify-between items-center">
          
          {/* Logo (pinned left) */}
          <Link href="/" onClick={handleHomeClick} className="flex items-center select-none group shrink-0">
            <div className={`relative shrink-0 transition-all duration-300 group-hover:scale-105 bg-white px-4 py-2 rounded-2xl shadow-md flex items-center justify-center ${
              isScrolled 
                ? 'h-[51px] w-[163px]' 
                : 'h-[88px] w-[282px]'
            }`}>
              <Image
                src="/images/CMR-logo-cropped.png"
                alt="CMR Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
          </Link>

          {/* Right Section (Nav links + CTA) */}
          <div className="flex items-center gap-[38px]">
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-[38px] font-body">
              {NAV_LINKS.map((link) => {
                const hasChildren = !!link.children;
                const isHome = link.label === 'Home';
                const isActive = isHome 
                  ? pathname === '/' 
                  : pathname === link.href || link.children?.some(c => pathname === c.href);

                if (hasChildren) {
                  return (
                    <div
                      key={link.label}
                      className="relative group py-1.5"
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={`inline-flex items-center text-[17px] font-medium transition-colors gap-1.5 focus:outline-none cursor-pointer whitespace-nowrap ${
                          isActive
                            ? 'text-[#f97316]'
                            : 'text-white hover:text-[#f97316]'
                        }`}
                      >
                        {link.label}
                        <ChevronDown className="w-[19px] h-[19px] transition-transform duration-300 group-hover:rotate-180 text-white group-hover:text-[#f97316]" />
                      </button>

                      {/* Dropdown Menu (Frosted Glass Panel) */}
                      <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl shadow-xl bg-slate-900/90 backdrop-blur-md border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top group-hover:translate-y-0 -translate-y-2">
                        <div className="py-2 px-1.5">
                          {link.children?.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className={`block px-4 py-2 text-[16px] transition-all duration-200 rounded-xl font-medium text-slate-200 hover:bg-white/10 hover:text-[#f97316] whitespace-nowrap ${
                                pathname === child.href ? 'bg-white/10 text-[#f97316]' : ''
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
                    onClick={isHome ? handleHomeClick : undefined}
                    className={`text-[17px] font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-[#f97316]'
                        : 'text-white hover:text-[#f97316]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA Button */}
            <Link
              href="/admissions"
              className="hidden sm:inline-flex items-center justify-center bg-[#f97316] text-white px-[26px] py-[12px] rounded-[999px] text-[17px] font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] select-none whitespace-nowrap"
            >
              Admissions Open 2026-27
            </Link>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7 text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-45 bg-slate-950/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 bg-slate-900 border-l border-white/10 shadow-2xl p-6 md:hidden transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <div className="flex items-center">
            <div className="relative h-[55px] w-[176px] shrink-0 bg-white px-2 py-1 rounded-lg shadow-sm flex items-center justify-center">
              <Image
                src="/images/CMR-logo-cropped.png"
                alt="CMR Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none cursor-pointer rounded-full hover:bg-white/5"
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
                <div key={link.label} className="border-b border-white/5 pb-2">
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="w-full flex justify-between items-center text-sm font-bold text-white py-1.5 focus:outline-none text-left cursor-pointer hover:text-[#f97316]"
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
                          pathname === child.href ? 'text-[#f97316] font-bold' : 'text-slate-350 hover:text-[#f97316]'
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
                onClick={link.href === '/' ? () => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); } : () => setMobileMenuOpen(false)}
                className={`text-sm font-semibold py-1.5 border-b border-white/5 block transition-colors ${
                  pathname === link.href ? 'text-[#f97316]' : 'text-white hover:text-[#f97316]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Admissions CTA */}
        <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-white/10">
          <Link
            href="/admissions"
            className="w-full justify-center flex gap-2 bg-[#f97316] hover:bg-[#f97316]/95 text-white py-3 rounded-full text-xs font-bold items-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Admissions Open 2026-27
          </Link>
        </div>
      </div>
    </>
  );
}
