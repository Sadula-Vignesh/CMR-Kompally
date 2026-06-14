'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Camera, Compass } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';

const CATEGORIES = ['All', 'Sports', 'Clubs', 'Cultural', 'Academics'];

const CAMPUS_ITEMS = [
  {
    id: 1,
    title: "Space Lab Astronomy Session",
    category: "Clubs",
    image: "/images/space_lab.png",
    gridClass: "col-span-1 md:col-span-2 row-span-2 h-[350px] md:h-[480px]",
    badgeVariant: "orange"
  },
  {
    id: 2,
    title: "Annual Sports Meet - Track Arena",
    category: "Sports",
    image: "/images/sports_field.png",
    gridClass: "col-span-1 row-span-2 h-[350px] md:h-[480px]",
    badgeVariant: "green"
  },
  {
    id: 3,
    title: "Primary coding session in Computer lab",
    category: "Academics",
    image: "/images/computer_class.jpg",
    gridClass: "col-span-1 md:col-span-2 row-span-1 h-[220px] md:h-[228px]",
    badgeVariant: "navy"
  },
  {
    id: 4,
    title: "Smart Digital Classroom Integration",
    category: "Academics",
    image: "/images/digital_classroom.png",
    gridClass: "col-span-1 row-span-1 h-[220px] md:h-[228px]",
    badgeVariant: "navy"
  },
  {
    id: 5,
    title: "Group Coordination Exercises",
    category: "Sports",
    image: "/images/children.jpg",
    gridClass: "col-span-1 md:col-span-2 row-span-1 h-[220px] md:h-[228px]",
    badgeVariant: "green"
  },
  {
    id: 6,
    title: "Interactive Campus Life Festival",
    category: "Cultural",
    image: "/images/cmr_school.webp",
    gridClass: "col-span-1 row-span-1 h-[220px] md:h-[228px]",
    badgeVariant: "gold"
  }
];

export default function CampusLifeShowcase() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredItems = activeTab === 'All' 
    ? CAMPUS_ITEMS 
    : CAMPUS_ITEMS.filter(item => item.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <section className="bg-white py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            title="Vibrant Campus Life"
            subtitle="Beyond the classroom"
            align="left"
          />
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0 bg-slate-50 p-1.5 rounded-full border border-slate-100 max-w-fit">
            {CATEGORIES.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-350 cursor-pointer select-none ${
                  activeTab === tab 
                    ? 'text-white' 
                    : 'text-slate-500 hover:text-brand-navy hover:bg-slate-100/60'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-brand-navy rounded-full z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid Layout with layout animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45 }}
                className={`group relative overflow-hidden rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer ${item.gridClass}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent z-10 transition-opacity duration-300 group-hover:from-brand-dark/95" />

                {/* Interactive Card Action Controls */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white z-20">
                  
                  {/* Top: Category Tag and Icon */}
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] md:text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-inner ${
                      item.badgeVariant === 'orange' ? 'bg-brand-orange/90 text-white' :
                      item.badgeVariant === 'green' ? 'bg-brand-green/90 text-white' :
                      item.badgeVariant === 'navy' ? 'bg-brand-navy/90 text-white' :
                      'bg-brand-gold/90 text-brand-dark'
                    }`}>
                      {item.category}
                    </span>

                    <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Bottom: Description & Title */}
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-lg md:text-2xl text-white leading-snug tracking-tight">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 pt-2 text-brand-goldLight opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-xs font-bold uppercase tracking-wider">Expand Moment</span>
                      <Compass className="w-4 h-4 animate-spin-slow" />
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
