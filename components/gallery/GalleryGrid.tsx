'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { GalleryImage } from '@/lib/googleSheets';

interface GalleryGridProps {
  initialImages: GalleryImage[];
}

const CATEGORIES = ["All", "Sports", "Events", "Academics", "Cultural", "Infrastructure"];

const ASPECT_RATIOS = [
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[16/10]',
  'aspect-[4/5]',
  'aspect-[3/2]'
];

export default function GalleryGrid({ initialImages }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  // Swipe gesture references
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Ref to the active thumbnail in the lightbox strip
  const activeThumbnailRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll to center the active thumbnail
  useEffect(() => {
    if (lightboxIndex !== null && activeThumbnailRef.current) {
      activeThumbnailRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [lightboxIndex]);

  const filteredImages = initialImages;

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setDirection('next');
    setLightboxIndex((prev) => (prev! + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setDirection('prev');
    setLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, filteredImages]);

  // Touch Swipe handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] font-jakarta py-16 md:py-24 relative overflow-hidden">
      {/* CSS Styles for custom scrollbars */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Gallery Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, idx) => {
              const aspect = ASPECT_RATIOS[idx % ASPECT_RATIOS.length];
              return (
                <motion.div
                  layout
                  key={image.url}
                  initial={{ opacity: 0, scale: 0.92, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
                  onClick={() => {
                    setDirection('next');
                    setLightboxIndex(idx);
                  }}
                  className="break-inside-avoid-column mb-6 rounded-2xl overflow-hidden border border-[#1a1f4e]/5 bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer relative"
                >
                  {/* Image Container with Shimmer Skeleton placeholder */}
                  <div className={`relative w-full overflow-hidden shimmer-bg ${aspect}`}>
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-107"
                      loading="lazy"
                    />

                    {/* Category badge top-left corner */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-slate-100/90 border border-slate-200/50 text-slate-800 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-slate-500 font-medium"
          >
            No images found.
          </motion.div>
        )}

        {/* Lightbox / Fullscreen Viewer */}
        <AnimatePresence>
          {lightboxIndex !== null && filteredImages[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-50 flex flex-col justify-between bg-white/98 backdrop-blur-lg p-6 md:p-10"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Top Controls Bar */}
              <div className="w-full flex justify-between items-start text-slate-900 z-55 pointer-events-none">
                <div className="pr-4 pointer-events-auto">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#f5802b] px-3 py-1 bg-brand-orange/10 border border-brand-orange/20 rounded-full">
                    {filteredImages[lightboxIndex].category}
                  </span>
                  <h3 className="font-display font-extrabold text-base md:text-xl text-slate-900 mt-2 leading-tight">
                    {filteredImages[lightboxIndex].title}
                  </h3>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(null);
                  }}
                  className="p-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 rounded-full transition-all duration-300 cursor-pointer hover:rotate-90 shrink-0 pointer-events-auto shadow-sm"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Centered Image Showcase Area */}
              <div 
                className="relative max-w-5xl w-full mx-auto my-auto flex flex-col items-center justify-center px-4 md:px-12 z-52"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div className="relative w-full h-[55vh] md:h-[65vh] rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center bg-slate-50 shadow-xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lightboxIndex}
                      initial={{ 
                        opacity: 0, 
                        scale: 0.94, 
                        x: direction === 'next' ? 40 : -40 
                      }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.94, 
                        x: direction === 'next' ? -40 : 40 
                      }}
                      transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={filteredImages[lightboxIndex].url}
                        alt={filteredImages[lightboxIndex].title}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Left/Right Arrow Navigation inside the content wrapper */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-[-16px] md:left-[-32px] top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-100/90 hover:bg-slate-200 text-slate-800 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 cursor-pointer z-53 shadow-md"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-[-16px] md:right-[-32px] top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-100/90 hover:bg-slate-200 text-slate-800 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 cursor-pointer z-53 shadow-md"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                </button>
              </div>

              {/* Bottom details with Counter, Title and Thumbnail strip */}
              <div 
                className="w-full text-center text-slate-900 z-53 flex flex-col items-center gap-3 mt-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-1 max-w-2xl px-4">
                  <p className="text-xs text-slate-500 font-medium">CMR School Kompally, Hyderabad</p>
                </div>

                {/* Image Counter */}
                <div className="text-slate-600 text-xs md:text-sm font-semibold tracking-widest uppercase">
                  {lightboxIndex + 1} / {filteredImages.length}
                </div>

                {/* Horizontal Thumbnail strip */}
                <div className="w-full overflow-x-auto pb-1 flex gap-2.5 justify-start md:justify-center select-none no-scrollbar max-w-xl mx-auto px-4">
                  {filteredImages.map((img, idx) => (
                    <button
                      key={idx}
                      ref={lightboxIndex === idx ? activeThumbnailRef : null}
                      onClick={() => {
                        setDirection(idx > lightboxIndex! ? 'next' : 'prev');
                        setLightboxIndex(idx);
                      }}
                      className={`relative w-[60px] h-[45px] shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        lightboxIndex === idx
                          ? 'border-[#f5802b] opacity-100 scale-105 shadow-md'
                          : 'border-transparent opacity-50 hover:opacity-90'
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={img.title}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Hidden preloader for adjacent images */}
              <div className="hidden">
                <img src={filteredImages[(lightboxIndex - 1 + filteredImages.length) % filteredImages.length]?.url} alt="preload prev" />
                <img src={filteredImages[(lightboxIndex + 1) % filteredImages.length]?.url} alt="preload next" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
