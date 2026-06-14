'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { TESTIMONIALS } from '@/lib/constants';

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-brand-dark py-24 md:py-32 text-white relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-brand-orange/15 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-brand-navyLight/20 blur-3xl pointer-events-none" />

      {/* Grid texture overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          title="Voice of Parents"
          subtitle="Testimonials"
          align="center"
          light={true}
        />

        <div className="relative flex flex-col items-center">
          
          {/* Main Slide Card */}
          <div className="w-full max-w-4xl min-h-[320px] md:min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-brand-navy/60 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl relative flex flex-col justify-between"
              >
                {/* Big decorative quote mark */}
                <Quote className="absolute top-6 right-8 w-20 h-20 text-white/5 pointer-events-none stroke-[1.5]" />

                <div className="space-y-6">
                  {/* Stars indicator */}
                  <div className="flex space-x-1">
                    {[...Array(TESTIMONIALS[active].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold stroke-none" />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-slate-200 italic text-base md:text-xl leading-relaxed font-body">
                    "{TESTIMONIALS[active].quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 mt-8 border-t border-white/10 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="font-display font-extrabold text-base md:text-lg text-white">
                      {TESTIMONIALS[active].name}
                    </span>
                    <span className="text-brand-gold text-xs font-semibold uppercase tracking-wider mt-1 block">
                      {TESTIMONIALS[active].role}
                    </span>
                  </div>

                  {/* Indicator count */}
                  <span className="text-xs text-slate-500 font-bold tracking-widest font-body uppercase">
                    0{active + 1} / 0{TESTIMONIALS.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3.5 bg-white/5 hover:bg-brand-orange border border-white/10 text-white rounded-full transition-all duration-300 cursor-pointer shadow-sm hover:scale-105"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Slider Dots */}
            <div className="flex space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-350 cursor-pointer ${
                    idx === active ? 'bg-brand-orange w-6' : 'bg-white/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3.5 bg-white/5 hover:bg-brand-orange border border-white/10 text-white rounded-full transition-all duration-300 cursor-pointer shadow-sm hover:scale-105"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
