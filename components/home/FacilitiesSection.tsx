'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Tv, Users, FlaskConical, ChevronRight, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const INFRASTRUCTURE = [
  {
    id: 0,
    title: "5 Acres Green Campus",
    icon: Building,
    image: "/images/cmr_school.webp",
    description: "A secure, pollution-free, spacious learning habitat tailored to foster student wellness and outdoor academic interactions.",
    stats: "Secure perimeter & open learning bays"
  },
  {
    id: 1,
    title: "Smart Classrooms",
    icon: Tv,
    image: "/images/children.jpg",
    description: "Airy smart classrooms with touchboards, high-resolution visual tools, and collaborative student desk configurations.",
    stats: "Full smart visual tech integration"
  },
  {
    id: 2,
    title: "Advanced Laboratories",
    icon: FlaskConical,
    image: "/images/IMG20240316114038-scaled.jpg",
    description: "Advanced experiment spaces for Chemistry, Physics, Biology, Vedic Maths, and our high-tech Space Space Lab.",
    stats: "10+ Specialized lab areas"
  },
  {
    id: 3,
    title: "World-Class Sports Fields",
    icon: Users,
    image: "/images/IMG20231227145159-scaled.jpg",
    description: "Large cricket nets, basketball courts, skating rinks, and athletics tracks to develop physical team discipline.",
    stats: "5-Acre sports play arena"
  }
];

export default function FacilitiesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const activeFacility = INFRASTRUCTURE[activeTab];

  return (
    <section className="bg-white py-24 md:py-32 text-slate-900 relative overflow-hidden border-t border-slate-100">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative top-line indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-brand-gold to-brand-green" />

      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          title="World-Class Infrastructure"
          subtitle="Our Campus"
          align="center"
          light={false}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-12">
          
          {/* Left Column: Interactive Tab Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {INFRASTRUCTURE.map((facility) => {
              const IconComp = facility.icon;
              const isActive = facility.id === activeTab;

              return (
                <div
                  key={facility.id}
                  onMouseEnter={() => setActiveTab(facility.id)}
                  onClick={() => setActiveTab(facility.id)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer select-none flex gap-4.5 items-start ${
                    isActive 
                      ? 'bg-slate-50 border-brand-orange shadow-lg shadow-slate-200/50' 
                      : 'bg-white border-slate-100 hover:bg-slate-50/50 hover:border-slate-200 shadow-sm'
                  }`}
                >
                  {/* Icon Frame */}
                  <div className={`p-3 rounded-xl shrink-0 transition-colors duration-300 ${
                    isActive ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <IconComp className="w-5.5 h-5.5 stroke-[2]" />
                  </div>

                  {/* Copy Details */}
                  <div className="flex flex-col space-y-1">
                    <h3 className="font-display font-extrabold text-lg md:text-xl text-slate-900">
                      {facility.title}
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm font-body leading-relaxed">
                      {facility.description}
                    </p>
                    {isActive && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange mt-2 inline-flex items-center gap-1.5 animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" />
                        {facility.stats}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Visual Showcase Container */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl min-h-[350px] md:min-h-[480px] border border-slate-100 flex items-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full z-0"
              >
                <Image
                  src={activeFacility.image}
                  alt={activeFacility.title}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Caption Panel (Frosted White) */}
            <div className="relative z-20 p-8 md:p-10 text-left w-full bg-white/95 backdrop-blur-md border-t border-slate-100/50">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2 font-body">
                CMR Kompally Campus Facilities
              </span>
              <h4 className="text-2xl md:text-3xl font-display font-black text-slate-900 leading-tight tracking-tight">
                {activeFacility.title}
              </h4>
              <p className="text-slate-600 text-xs md:text-sm mt-2 font-body max-w-xl leading-relaxed">
                Nurturing 21st-century minds in space, science, technology, arts, and physical domains.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
