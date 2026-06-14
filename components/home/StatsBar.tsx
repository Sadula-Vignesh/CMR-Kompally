'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, GraduationCap, School, ShieldCheck } from 'lucide-react';
import { STATS } from '@/lib/constants';

const ICONS = [
  School,         // World-Class Facilities
  GraduationCap,  // Enrolled Students
  Award,          // Years of Legacy
  ShieldCheck     // Active Clubs (represented as secure holistic activities)
];

function CountUpNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setHasStarted(true);
    }
  }, [isInView]);

  useEffect(() => {
    if (!hasStarted) return;
    
    const startTime = performance.now();
    const end = value;
    const duration = 2000; // 2 seconds duration for all numbers
    
    let animationFrameId: number;
    
    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed >= duration) {
        setCount(end);
      } else {
        const progress = elapsed / duration;
        // Smooth ease-out quad animation curve
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        setCount(Math.floor(easeOutQuad * end));
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, value]);

  return (
    <span ref={elementRef} className="text-3xl md:text-5xl font-black font-display text-brand-orange select-none tracking-tight">
      {count}{suffix}
    </span>
  );
}

export default function StatsBar() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-brand-cream/40 backdrop-blur-xl rounded-3xl border border-brand-gold/15 shadow-xl px-6 py-8 md:px-10 md:py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/60"
        >
        {STATS.map((stat, idx) => {
          const IconComp = ICONS[idx] || Award;
          return (
            <div
              key={idx}
              className={`flex items-start gap-4 justify-start ${
                idx >= 2 ? 'pt-6 lg:pt-0 lg:pl-8' : 'pb-6 lg:pb-0 lg:pl-4'
              } ${idx === 1 || idx === 3 ? 'pl-2' : ''}`}
            >
              {/* Icon Container */}
              <div className="p-3 bg-brand-navy/5 text-brand-navy rounded-2xl shrink-0 group hover:bg-brand-navy hover:text-white transition-all duration-300">
                <IconComp className="w-6 h-6 stroke-[1.5]" />
              </div>

              {/* Number and Description Details */}
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <CountUpNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <span className="text-slate-500 text-xs md:text-sm font-bold font-body tracking-wide mt-1 leading-snug">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </motion.div>
      </div>
    </section>
  );
}
