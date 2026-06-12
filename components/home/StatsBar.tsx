'use client';

import React, { useEffect, useState, useRef } from 'react';
import { STATS } from '@/lib/constants';

function CountUpNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    let start = 0;
    const end = value;
    const duration = 1500; // 1.5 seconds animation
    const increment = Math.ceil(end / (duration / 16)); // ~60fps refresh rate
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, value]);

  return (
    <span ref={elementRef} className="text-4xl md:text-5xl font-bold font-body text-brand-orange select-none">
      {count}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-brand-navy py-10 border-y border-brand-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center items-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {STATS.map((stat, idx) => (
            <div key={idx} className={`flex flex-col items-center justify-center ${idx >= 2 ? 'pt-6 lg:pt-0' : 'pb-6 lg:pb-0'}`}>
              <CountUpNumber value={stat.value} suffix={stat.suffix} />
              <span className="text-gray-300 text-xs md:text-sm font-semibold uppercase tracking-wider mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
