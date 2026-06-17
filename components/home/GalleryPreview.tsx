'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

const PHOTOS = [
  { id: 1, title: "Science Lab Experiments", category: "Academics", image: "/images/gallery-images/AHR09106.webp" },
  { id: 2, title: "Space Lab Exploration", category: "Academics", image: "/images/gallery-images/AHR09127.webp" },
  { id: 3, title: "Annual Sports Day Athletics", category: "Sports", image: "/images/gallery-images/AHR09237.webp" },
  { id: 4, title: "Inter-House Football Match", category: "Sports", image: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 01_45_47 PM.png" },
  { id: 5, title: "Investiture Ceremony 2026", category: "Events", image: "/images/gallery-images/AHR09134.webp" },
  { id: 6, title: "Science Model Exhibition Fair", category: "Events", image: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 03_49_25 PM.png" },
  { id: 7, title: "Classical Dance Performance", category: "Cultural", image: "/images/gallery-images/AHR09164.webp" },
  { id: 8, title: "Fine Arts Painting Gallery", category: "Cultural", image: "/images/gallery-images/ChatGPT Image Jun 16, 2026, 04_07_33 PM.png" },
];

export default function GalleryPreview() {
  return (
    <section className="bg-brand-cream/35 py-24 md:py-32 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute right-10 top-10 w-[300px] h-[300px] bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block without Filter Options */}
        <div className="mb-12">
          <SectionHeading
            title="School Gallery Showcase"
            subtitle="Moments Captured"
            align="left"
          />
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PHOTOS.map((photo) => (
            <Link key={photo.id} href="/gallery" className="block group">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl h-64 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 cursor-pointer"
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
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">View Gallery</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Button href="/gallery" variant="outline" className="px-8 py-3.5 font-bold text-sm">
            View Complete Gallery
          </Button>
        </div>

      </div>
    </section>
  );
}
