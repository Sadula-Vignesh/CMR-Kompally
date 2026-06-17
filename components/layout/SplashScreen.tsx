'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // 3 seconds stay + exit animation delay
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -30,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      style={{ backgroundColor: '#ffffff' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto"
    >
      <div className="flex flex-col items-center space-y-6 md:space-y-8 px-6 text-center">
        {/* Rounded Premium Logo Ring */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-28 h-28 md:w-36 md:h-36 rounded-full p-1 border-2 border-brand-orange/20 bg-white shadow-xl flex items-center justify-center z-10"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/images/cmr_logo.png"
                alt="CMR Logo"
                fill
                className="object-contain p-2 rounded-full"
                priority
              />
            </div>
          </motion.div>
          
          {/* Animated decorative spinning outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute -inset-2 rounded-full border-2 border-transparent border-t-brand-orange/60 border-r-brand-navy/30 z-0"
          />
        </div>

        {/* Text reveals with premium tracking-wide */}
        <div className="space-y-2 select-none">
          <motion.h1
            initial={{ letterSpacing: '0.05em', opacity: 0, y: 15 }}
            animate={{ letterSpacing: '0.2em', opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-navy uppercase tracking-widest"
          >
            CMR SCHOOL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-xs sm:text-sm font-extrabold text-brand-orange tracking-widest uppercase"
          >
            Kompally, Hyderabad
          </motion.p>
        </div>
      </div>

      {/* Decorative smooth linear bottom loader line */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ left: '-100%', width: '30%' }}
          animate={{ left: '100%', width: '30%' }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="absolute top-0 bottom-0 bg-brand-orange rounded-full"
        />
      </div>
    </motion.div>
  );
}
