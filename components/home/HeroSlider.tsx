'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const SLIDES = [
  {
    image: "/images/1.png",
    title: "Nurturing Minds, Building Futures",
    subtitle: "Welcome to CMR School Kompally",
    highlight: "Futures",
    desc: "Hyderabad's premier CBSE educational institution where academic rigor meets holistic personal development in a state-of-the-art 5-acre campus."
  },
  {
    image: "/images/2.png",
    title: "Where Innovation Meets Education",
    subtitle: "Space & Science Exploration",
    highlight: "Innovation",
    desc: "Connecting theoretical core concepts with physical exploration in our advanced Space Innovation Labs and state-of-the-art learning modules."
  },
  {
    image: "/images/3.png",
    title: "Equipping Leaders of Tomorrow",
    subtitle: "21st Century Skills",
    highlight: "Leaders",
    desc: "Fostering digital literacy, programming competence, analytical reasoning, and creative problem solving from primary grades."
  },
  {
    image: "/images/4.png",
    title: "Discovering Strength on Playfields",
    subtitle: "Sports & Physical Excellence",
    highlight: "Strength",
    desc: "Nurturing discipline, synergy, and coordination with comprehensive outdoor courts and dedicated professional coaching tracks."
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-play interval using robust setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((curr) => (curr + 1) % SLIDES.length);
    }, 7000); // 7 seconds per slide

    return () => clearTimeout(timer);
  }, [current]);

  const handleSlideSelect = (idx: number) => {
    setCurrent(idx);
  };

  const handlePrev = () => {
    setCurrent((curr) => (curr - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrent((curr) => (curr + 1) % SLIDES.length);
  };

  const slide = SLIDES[current];

  return (
    <section className="relative w-full min-h-screen lg:h-screen bg-slate-950 overflow-hidden flex flex-col lg:block">
      
      {/* 1. CAROUSEL IMAGE CONTAINER */}
      {/* On desktop: full screen absolute layer. On mobile: takes 55% of viewport height (55vh) */}
      <div className="relative w-full h-[55vh] lg:h-full lg:absolute lg:inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover pointer-events-none"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dark Vignette Overlay (Only on desktop to preserve mobile color purity) */}
        <div className="absolute inset-0 bg-slate-950/45 lg:z-5 pointer-events-none hidden lg:block" />

        {/* Mobile-only slide counter badge pinned to the top-right corner of the image */}
        <div className="absolute top-28 right-4 lg:hidden z-20 bg-slate-950/70 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-[11px] font-black font-display tracking-widest select-none border border-white/10">
          0{current + 1} / 0{SLIDES.length}
        </div>
      </div>

      {/* 2. OVERLAY / STACKED CONTENT CARD */}
      {/* On desktop: floating glassmorphism card bottom-left. On mobile: solid dark #111827 card overlapping image by -20px */}
      <div className="relative lg:absolute lg:bottom-12 lg:left-12 xl:left-20 lg:right-auto lg:w-auto lg:max-w-xl xl:max-w-2xl bg-[#111827] lg:bg-[#0A0F2E]/70 lg:backdrop-blur-[20px] rounded-t-[24px] lg:rounded-[24px] border-t border-l border-r lg:border border-white/10 border-l-4 border-l-brand-orange lg:border-l-4 lg:border-l-brand-orange p-6 sm:p-8 md:p-10 shadow-2xl z-20 -mt-[20px] lg:mt-0 w-full flex-grow flex flex-col justify-between">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col text-left"
          >
            {/* Category tag in orange pill badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/15 border border-brand-orange/30 rounded-full text-brand-orange text-[10px] md:text-xs font-bold tracking-wider uppercase w-fit select-none font-display mb-3 md:mb-4 animate-pulse">
              {slide.subtitle}
            </div>

            {/* Large bold headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight tracking-tight mb-2 md:mb-4">
              {slide.title}
            </h1>

            {/* Tagline/Description (Grey color on mobile, translucent white on desktop) */}
            <p className="text-gray-450 lg:text-white/80 font-body text-xs sm:text-sm md:text-base leading-relaxed mb-6 max-w-xl">
              {slide.desc}
            </p>

            {/* CTA Buttons - Stacked on mobile, side-by-side on desktop */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button
                href="/admissions"
                variant="orange"
                className="group/btn relative px-8 py-3.5 shadow-lg hover:shadow-brand-orange/30 overflow-hidden font-bold flex gap-2 items-center justify-center text-xs sm:text-sm md:text-base w-full sm:w-auto"
              >
                Admissions 2026-27
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
              <Button
                href="/about"
                className="px-8 py-3.5 shadow-md font-bold text-xs sm:text-sm md:text-base border border-white/20 justify-center flex items-center bg-transparent text-white hover:bg-white hover:text-[#0A0F2E] transition-all duration-300 w-full sm:w-auto"
              >
                Explore Academy
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide dots at the bottom of the card on mobile/tablet */}
        <div className="flex lg:hidden justify-center space-x-3 mt-6 border-t border-white/5 pt-4">
          {SLIDES.map((_, idx) => {
            const isActive = idx === current;
            return (
              <button
                key={idx}
                onClick={() => handleSlideSelect(idx)}
                className="group relative flex flex-col items-center py-2 focus:outline-none cursor-pointer"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div
                  className={`h-[2.5px] transition-all duration-500 rounded-full ${
                    isActive
                      ? 'bg-brand-orange w-10 shadow-[0_0_8px_rgba(232,98,10,0.6)]'
                      : 'bg-white/30 group-hover:bg-brand-orange/50 w-6'
                  }`}
                />
              </button>
            );
          })}
        </div>

      </div>

      {/* 3. DESKTOP ONLY Slide Navigation Arrows (bottom-right corner) */}
      <div className="absolute bottom-12 right-12 lg:right-16 xl:right-20 z-20 hidden lg:flex items-center space-x-3">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg focus:outline-none"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg focus:outline-none"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
