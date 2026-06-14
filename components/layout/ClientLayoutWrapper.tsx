'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from './SplashScreen';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  useEffect(() => {
    // Disable body scroll while splash is active
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSplash]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      {/* Main website layout fades and moves up gently once splash completes */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={!showSplash ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
        style={{ opacity: showSplash ? 0 : 1 }}
        className="min-h-screen flex flex-col w-full"
      >
        {children}
      </motion.div>
    </>
  );
}
