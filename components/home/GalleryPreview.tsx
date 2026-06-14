'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Filter } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

const CATEGORIES = ['All', 'Academics', 'Sports', 'Events', 'Cultural'];

const PHOTOS = [
  { id: 1, title: "Annual Sports Day Sprint", category: "Sports", image: "/images/children.jpg" },
  { id: 2, title: "Science Olympiad Winners", category: "Academics", image: "/images/images_3.jpg" },
  { id: 3, title: "Space Lab Exploration Course", category: "Events", image: "/images/images_4.jpg" },
  { id: 4, title: "Classical Dance Performance", category: "Cultural", image: "/images/cmr_school.webp" },
  { id: 5, title: "Computer Science Coding Hub", category: "Academics", image: "/images/computer_class.jpg" },
  { id: 6, title: "Regional Chess Champions", category: "Sports", image: "/images/children.jpg" },
  { id: 7, title: "Fine Arts Exhibition Gallery", category: "Cultural", image: "/images/images_3.jpg" },
  { id: 8, title: "Physics Experiment Lab", category: "Academics", image: "/images/images_4.jpg" },
];

export default function GalleryPreview() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = activeFilter === 'All'
    ? PHOTOS
    : PHOTOS.filter(photo => photo.category.toLowerCase() === activeFilter.toLowerCase());

  // Handle keyboard arrows and escape for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section className="bg-brand-cream/35 py-24 md:py-32 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute right-10 top-10 w-[300px] h-[300px] bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title & Filter Options */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <SectionHeading
            title="School Gallery Showcase"
            subtitle="Moments Captured"
            align="left"
          />
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setLightboxIndex(null);
                }}
                className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Image Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxIndex(idx)}
                className="group relative overflow-hidden rounded-2xl h-64 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 cursor-pointer"
              >
                {/* Visual Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent z-10 transition-opacity duration-300 group-hover:from-brand-dark/90" />

                {/* Info & Icon details */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between text-white z-20">
                  <span className="w-fit text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white">
                    {photo.category}
                  </span>

                  <div className="space-y-1.5">
                    <h4 className="font-display font-extrabold text-base leading-snug text-white">
                      {photo.title}
                    </h4>
                    
                    <div className="flex items-center gap-1.5 text-brand-goldLight opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1.5 group-hover:translate-y-0">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Fullscreen View</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Button href="/gallery" variant="outline" className="px-8 py-3.5 font-bold text-sm">
            View Complete Gallery
          </Button>
        </div>

        {/* 6. Premium Lightbox Modal Slider */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/95 backdrop-blur-md">
              
              {/* Close Area */}
              <div className="absolute inset-0 cursor-zoom-out" onClick={() => setLightboxIndex(null)} />

              {/* Top Controls */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-white z-55 pointer-events-none">
                <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-slate-400">
                  {lightboxIndex + 1} / {filteredPhotos.length} — {filteredPhotos[lightboxIndex].category}
                </span>
                
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2.5 bg-white/5 hover:bg-brand-orange text-white rounded-full transition-colors cursor-pointer pointer-events-auto"
                  aria-label="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Image Slider with Motion */}
              <div className="relative w-full max-w-5xl h-[60vh] md:h-[75vh] flex items-center justify-center px-4 md:px-12 z-52">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                  >
                    <Image
                      src={filteredPhotos[lightboxIndex].image}
                      alt={filteredPhotos[lightboxIndex].title}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Left/Right Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-brand-orange text-white rounded-full transition-colors cursor-pointer z-53"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-brand-orange text-white rounded-full transition-colors cursor-pointer z-53"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>

              {/* Bottom Details panel */}
              <div className="absolute bottom-6 left-6 right-6 text-center text-white z-53 pointer-events-none">
                <h3 className="font-display font-bold text-lg md:text-xl text-white">
                  {filteredPhotos[lightboxIndex].title}
                </h3>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  CMR School Kompally Campus Activities
                </span>
              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
