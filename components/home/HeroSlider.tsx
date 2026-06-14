'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

const SLIDES = [
  {
    image: "/images/cmr_school.webp",
    title: "Nurturing Minds, Building Futures",
    subtitle: "Welcome to CMR School Kompally",
    highlight: "Futures",
    desc: "Hyderabad's premier CBSE educational institution where academic rigor meets holistic personal development in a state-of-the-art 5-acre campus."
  },
  {
    image: "/images/space_lab.png",
    title: "Where Innovation Meets Education",
    subtitle: "Space & Science Exploration",
    highlight: "Innovation",
    desc: "Connecting theoretical core concepts with physical exploration in our advanced Space Innovation Labs and state-of-the-art learning modules."
  },
  {
    image: "/images/computer_class.jpg",
    title: "Equipping Leaders of Tomorrow",
    subtitle: "21st Century Skills",
    highlight: "Leaders",
    desc: "Fostering digital literacy, programming competence, analytical reasoning, and creative problem solving from primary grades."
  },
  {
    image: "/images/sports_field.png",
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

  const slide = SLIDES[current];

  return (
    <section className="relative w-full h-[85vh] md:h-screen bg-slate-950 overflow-hidden flex items-center justify-center">
      {/* 1. Immersive Image Layer with Ken Burns Pan/Zoom */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full animate-ken-burns"
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
      </div>

      {/* 2. Ambient Floating Glowing Blobs */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-brand-orange/15 rounded-full blur-[120px] animate-blob-1" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-navyLight/20 rounded-full blur-[140px] animate-blob-2" />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-brand-gold/10 rounded-full blur-[110px] animate-blob-3" />
      </div>

      {/* 3. Dark Cinematic Gradient Overlay */}
      <div className="absolute inset-0 custom-gradient-overlay z-15 pointer-events-none" />

      {/* 4. Content Showcase */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left mt-12 md:mt-20">
        <div className="max-w-4xl flex flex-col space-y-6 md:space-y-8">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 backdrop-blur-md rounded-full text-brand-goldLight text-xs md:text-sm font-semibold tracking-wider uppercase w-fit select-none"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[2] animate-pulse" />
            {slide.subtitle}
          </motion.div>

          {/* Heading with smooth words reveal */}
          <div className="overflow-hidden">
            <motion.h1
              key={current}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
              className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white leading-[1.1] tracking-tight"
            >
              {slide.title.split(' ').map((word, wIdx) => {
                const isHighlight = word.toLowerCase().includes(slide.highlight.toLowerCase());
                return (
                  <span
                    key={wIdx}
                    className={`inline-block mr-3 md:mr-4 ${
                      isHighlight
                        ? 'bg-gradient-to-r from-brand-orange via-brand-gold to-brand-goldLight bg-clip-text text-transparent filter drop-shadow-sm font-black'
                        : ''
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </motion.h1>
          </div>

          {/* Description Block */}
          <motion.p
            key={`desc-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-250 font-body text-base md:text-xl leading-relaxed max-w-2xl font-medium select-none"
          >
            {slide.desc}
          </motion.p>

          {/* CTA Group with high-fidelity animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center pt-2 md:pt-4 w-full sm:w-auto"
          >
            <Button
              href="/admissions"
              variant="orange"
              className="group/btn relative px-8 py-4 shadow-lg hover:shadow-brand-orange/30 overflow-hidden font-bold flex gap-2 items-center text-sm md:text-base"
            >
              Admissions 2026-27
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </Button>
            <Button
              href="/about"
              variant="white"
              className="px-8 py-4 shadow-md font-bold text-sm md:text-base border border-slate-200"
            >
              Explore Academy
            </Button>
          </motion.div>
        </div>
      </div>

      {/* 5. Modern Bottom Progress Navigation Tabs (Sequential Filling) */}
      <div className="absolute bottom-8 left-0 right-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="grid grid-cols-4 gap-6 border-t border-white/10 pt-4">
          {SLIDES.map((item, idx) => {
            const isActive = idx === current;
            const isCompleted = idx < current;
            
            return (
              <button
                key={idx}
                onClick={() => handleSlideSelect(idx)}
                className="flex flex-col text-left group focus:outline-none cursor-pointer"
              >
                {/* Horizontal Progress Bar indicator */}
                <div className="w-full h-[3px] bg-white/20 rounded-full mb-3 overflow-hidden">
                  {isActive ? (
                    <motion.div
                      key={current} // resets width animation on slide mount
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 7, ease: "linear" }}
                      className="h-full bg-brand-orange rounded-full"
                    />
                  ) : (
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCompleted ? 'bg-brand-orange/40 w-full' : 'bg-transparent w-0'
                      }`}
                    />
                  )}
                </div>
                {/* Category label details */}
                <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${
                  isActive ? 'text-brand-gold' : 'text-slate-400 group-hover:text-white'
                }`}>
                  0{idx + 1}. {item.subtitle.split(' & ')[0]}
                </span>
                <span className={`text-xs font-bold font-display line-clamp-1 mt-1 transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-slate-550 group-hover:text-slate-300'
                }`}>
                  {item.title.split(' in ')[0].split(' on ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
