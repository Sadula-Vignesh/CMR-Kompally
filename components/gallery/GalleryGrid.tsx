'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { X, Search } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { GalleryImage } from '@/lib/googleSheets';

interface GalleryGridProps {
  initialImages: GalleryImage[];
}

const CATEGORIES = ["All", "Sports", "Events", "Academics", "Cultural", "Infrastructure"];

const GRADIENTS = [
  "from-brand-navy to-brand-navyLight",
  "from-brand-orange to-brand-gold",
  "from-brand-green to-brand-navyLight",
  "from-brand-gold to-brand-orange",
  "from-brand-navyLight to-brand-green",
  "from-brand-orange to-brand-navy"
];

export default function GalleryGrid({ initialImages }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredImages = selectedCategory === "All"
    ? initialImages
    : initialImages.filter(img => img.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleCategorySelect = (category: string) => {
    startTransition(() => {
      setSelectedCategory(category);
    });
  };

  const getGradientForIndex = (idx: number) => {
    return GRADIENTS[idx % GRADIENTS.length];
  };

  return (
    <section className="py-16 md:py-24 bg-white font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 justify-center border-b border-gray-100 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4.5 py-2 text-sm font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-orange border-brand-orange text-white shadow-sm'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Info label about Sheets */}
        <div className="text-center text-xs text-gray-500 italic">
          * Note: In production, images are dynamically synced from the school's Google Sheets gallery database.
        </div>

        {/* Gallery Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
          {filteredImages.map((image, idx) => {
            const gradientClass = getGradientForIndex(idx);
            return (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative overflow-hidden rounded-xl shadow-sm border border-gray-100 h-64 hover:-translate-y-1 transition-all duration-300 hover:shadow-md cursor-pointer"
              >
                {/* Visual placeholder gradient */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${gradientClass} opacity-40`} />
                {image.url && (
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors" />

                {/* Glassmorphic Search Zoom Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="p-3 bg-white/25 backdrop-blur-md rounded-full border border-white/30 text-white shadow-lg">
                    <Search className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute inset-0 p-5 flex flex-col justify-between text-white z-0">
                  <div className="w-fit">
                    <Badge variant={
                      image.category.toLowerCase() === 'sports' ? 'navy' :
                      image.category.toLowerCase() === 'academics' ? 'green' :
                      image.category.toLowerCase() === 'events' ? 'orange' : 'gold'
                    } className="bg-white/95 text-brand-navy border-none shadow-xs">
                      {image.category}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg text-white leading-tight">
                      {image.title}
                    </h4>
                    <span className="text-[10px] text-gray-300 mt-1 block">Click to zoom</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No images found for category "{selectedCategory}".
          </div>
        )}

        {/* HeadlessUI Lightbox Dialog */}
        <Dialog
          open={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          className="relative z-50"
        >
          {/* Backdrop blur */}
          <div className="fixed inset-0 bg-brand-dark/80 backdrop-blur-md transition-opacity" />

          <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4 md:p-8">
            <DialogPanel className="w-full max-w-4xl bg-brand-dark border border-white/10 rounded-2xl p-6 shadow-2xl relative text-white">
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {lightboxIndex !== null && filteredImages[lightboxIndex] && (
                <div className="flex flex-col space-y-6">
                  {/* Large visual placeholder gradient representing image */}
                  <div className={`w-full h-[350px] md:h-[500px] rounded-xl bg-gradient-to-tr ${getGradientForIndex(lightboxIndex)} relative overflow-hidden flex items-center justify-center border border-white/10`}>
                    {filteredImages[lightboxIndex].url ? (
                      <Image
                        src={filteredImages[lightboxIndex].url}
                        alt={filteredImages[lightboxIndex].title}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <span className="text-white/40 font-display font-semibold text-lg select-none">
                        [ {filteredImages[lightboxIndex].category} Image Asset Preview ]
                      </span>
                    )}
                  </div>

                  {/* Image Details */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <DialogTitle className="font-display font-bold text-xl md:text-2xl text-white">
                        {filteredImages[lightboxIndex].title}
                      </DialogTitle>
                      <span className="text-xs text-gray-400 mt-1 block">CMR School Kompally, Hyderabad</span>
                    </div>
                    
                    <Badge variant="orange" className="bg-brand-orange text-white border-none py-1.5 px-3">
                      {filteredImages[lightboxIndex].category}
                    </Badge>
                  </div>
                </div>
              )}
            </DialogPanel>
          </div>
        </Dialog>

      </div>
    </section>
  );
}
