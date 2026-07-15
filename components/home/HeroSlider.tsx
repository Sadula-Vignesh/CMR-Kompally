'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  { id: 'innovation', label: 'Innovation in Education' },
  { id: 'excellence', label: 'Excellence & Growth' },
  { id: 'leaders', label: 'Future Leaders' }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-play interval - auto-advance every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((curr) => (curr + 1) % SLIDES.length);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [current]);

  const handleSlideSelect = (idx: number) => {
    setCurrent(idx);
  };

  return (
    <section id="hero" className="relative w-screen h-screen min-h-screen bg-slate-950 overflow-hidden m-0 p-0 z-0">

      {/* 1. Full-bleed background carousel with smooth slide/fade crossfade transition (0.8s ease-in-out) */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* HERO SLIDE #1 - Innovation in Education */}
            {current === 0 && (
              <div className="relative w-full h-full flex items-center">
                
                {/* Background image & overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/slide1.png"
                    alt="Innovation in Education"
                    fill
                    priority
                    className="object-cover object-center pointer-events-none"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-[#0F1E4B]/82 pointer-events-none z-[1]" />
                </div>
                
                {/* Floating Blur Orbs */}
                <motion.div
                  animate={{
                    x: [0, 40, -20, 0],
                    y: [0, -60, 40, 0],
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-blue-600/15 rounded-full blur-[90px] pointer-events-none z-[2]"
                />
                <motion.div
                  animate={{
                    x: [0, -50, 30, 0],
                    y: [0, 80, -40, 0],
                  }}
                  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-[15%] right-[25%] w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none z-[2]"
                />

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/40 rounded-full blur-[1px] pointer-events-none z-[2]"
                    style={{
                      top: `${15 + i * 11}%`,
                      left: `${10 + (i * 13) % 80}%`,
                    }}
                    animate={{
                      y: [0, -40, 0],
                      opacity: [0.2, 0.7, 0.2],
                    }}
                    transition={{
                      duration: 6 + i * 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {/* Floating Geometric Outline Shapes */}
                <motion.div
                  animate={{ rotate: 360, y: [0, 15, 0] }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                  className="absolute border border-white/10 rounded-full w-24 h-24 top-[20%] left-[45%] pointer-events-none z-[2]"
                />
                <motion.div
                  animate={{ rotate: -360, x: [0, -10, 0] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute border border-white/10 w-16 h-16 bottom-[25%] left-[15%] rounded-lg pointer-events-none z-[2]"
                />

                {/* Content on the Left */}
                <div className="absolute left-[5%] md:left-[8%] top-1/2 -translate-y-1/2 z-10 text-left max-w-[90%] md:max-w-[50%]">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
                    {"INNOVATION IN EDUCATION".split(" ").map((word, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                        className="font-montserrat font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-[1px] leading-tight"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="font-poppins text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg"
                  >
                    Empowering students with cutting-edge learning environments, high-tech labs, and futuristic stem skillsets.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <motion.a
                      href="/admissions"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(244, 130, 31, 0.6)" }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center px-8 py-4 bg-[#F4821F] text-white font-poppins font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,130,31,0.4)] relative overflow-hidden group w-fit"
                    >
                      <span className="relative z-10">Enroll Now 2026-27</span>
                      <span className="ml-2 relative z-10">→</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Spotlight Student Image on Right */}
                <div className="absolute right-[4%] md:right-[6%] lg:right-[8%] bottom-0 h-[88%] md:h-[94%] hidden md:block pointer-events-none z-10">
                  {/* Spotlight Background Aura */}
                  <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-blue-500/25 rounded-full blur-[100px] z-0 animate-pulse-glow" />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative h-full w-[380px] lg:w-[440px] xl:w-[480px] 2xl:w-[520px] flex items-end justify-center z-10"
                  >
                    <Image
                      src="/images/girlimage.png"
                      alt="Student Spotlight"
                      fill
                      priority
                      className="object-contain object-bottom pointer-events-none"
                      sizes="(max-width: 1024px) 380px, (max-width: 1280px) 440px, 520px"
                    />
                  </motion.div>
                </div>
              </div>
            )}

            {/* HERO SLIDE #2 - Excellence & Growth */}
            {current === 1 && (
              <div className="relative w-full h-full flex items-center">
                
                {/* Background image & overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/slide3.png"
                    alt="Excellence & Growth"
                    fill
                    priority
                    className="object-cover object-center pointer-events-none"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-[#0B1E4B]/80 pointer-events-none z-[1]" />
                </div>
                
                {/* SVG wave animation background */}
                <div className="absolute inset-x-0 bottom-0 h-48 overflow-hidden pointer-events-none z-[2]">
                  <svg className="absolute bottom-0 w-[200%] h-36 text-indigo-700/10 animate-wave-flow" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1350,20 1500,60 C1650,100 1850,20 2000,60 L2000,120 L0,120 Z" fill="currentColor" />
                  </svg>
                  <svg className="absolute bottom-0 w-[200%] h-28 text-white/5 animate-wave-flow" style={{ animationDirection: 'reverse', animationDuration: '24s' }} viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,50 C180,90 320,10 500,50 C680,90 820,10 1000,50 C1180,90 1320,10 1500,50 C1680,90 1820,10 2000,50 L2000,120 L0,120 Z" fill="currentColor" />
                  </svg>
                </div>

                {/* Content on Left */}
                <div className="absolute left-[5%] md:left-[8%] top-1/2 -translate-y-1/2 z-10 text-left max-w-[90%] md:max-w-[50%]">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-montserrat font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-[1px] leading-tight mb-4"
                  >
                    EXCELLENCE &amp; GROWTH
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="font-poppins text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg"
                  >
                    Fostering academic distinction, character development, and holistic success in a nurturing environment.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <motion.a
                      href="/admissions"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(244, 130, 31, 0.6)" }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center px-8 py-4 bg-[#F4821F] text-white font-poppins font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,130,31,0.4)] relative overflow-hidden group w-fit"
                    >
                      <span className="relative z-10">Enroll Now 2026-27</span>
                      <span className="ml-2 relative z-10">→</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Student Character Image on Right */}
                <div className="absolute right-[4%] md:right-[6%] lg:right-[8%] bottom-0 h-[92%] md:h-[98%] hidden md:block pointer-events-none z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    animate={{ opacity: 1, scale: 1.05, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative h-full w-[410px] lg:w-[470px] xl:w-[510px] 2xl:w-[550px] flex items-end justify-center z-10"
                  >
                    <Image
                      src="/images/boyimage.png"
                      alt="Student Excellence"
                      fill
                      priority
                      className="object-contain object-bottom pointer-events-none"
                      sizes="(max-width: 1024px) 380px, (max-width: 1280px) 440px, 520px"
                    />
                  </motion.div>
                </div>
              </div>
            )}

            {/* HERO SLIDE #3 - Future Leaders */}
            {current === 2 && (
              <div className="relative w-full h-full flex items-center">
                
                {/* Parallax Ken-Burns background image */}
                <motion.div
                  animate={{
                    scale: [1.02, 1.08, 1.02],
                    x: [0, -10, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 z-0 w-full h-full"
                >
                  <Image
                    src="/images/Building Straight.png"
                    alt="School Campus"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </motion.div>

                {/* Overlays for legibility */}
                <div className="absolute inset-0 bg-slate-950/40 z-5" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent z-5" />
                
                {/* Pulsing Glow Orbs */}
                <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-orange-500/20 rounded-full blur-[80px] z-5 animate-pulse-glow" />

                {/* Content on Left */}
                <div className="absolute left-[5%] md:left-[8%] top-1/2 -translate-y-1/2 z-10 text-left max-w-[90%] md:max-w-[50%]">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F4821F] via-orange-400 to-yellow-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-[1px] leading-tight mb-4"
                  >
                    EMPOWERING FUTURE LEADERS
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="font-poppins text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg"
                  >
                    Fostering discipline, confidence, and critical thinking to shape the global visionaries of tomorrow.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <motion.a
                      href="/academics"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 255, 255, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center px-8 py-4 bg-white text-slate-950 font-poppins font-bold rounded-full shadow-lg transition-all duration-300 border border-white/20 hover:bg-[#F4821F] hover:text-white group w-fit relative overflow-hidden"
                    >
                      <span className="relative z-10">Explore Academics</span>
                      <span className="ml-3 flex items-center relative z-10">
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.a>
                  </motion.div>
                </div>

                {/* Scaled Student Characters Image on Right */}
                <div className="absolute right-0 bottom-0 h-[75%] w-full md:w-[650px] lg:w-[800px] xl:w-[950px] 2xl:w-[1100px] hidden md:flex items-end justify-end pointer-events-none z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative w-full h-full"
                    style={{
                      filter: "drop-shadow(0px 15px 35px rgba(0,0,0,0.5))"
                    }}
                  >
                    <Image
                      src="/images/bothimage.png"
                      alt="Future Leaders"
                      fill
                      priority
                      className="object-contain object-bottom pointer-events-none"
                      sizes="(max-width: 1024px) 650px, (max-width: 1280px) 800px, 1100px"
                    />
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>



      {/* 3. Vertical Dots Navigation on Left Edge */}
      <div className="absolute left-[2%] top-1/2 -translate-y-1/2 z-20 flex flex-col gap-[10px] items-center">
        {SLIDES.map((_, idx) => {
          const isActive = idx === current;
          return (
            <button
              key={idx}
              onClick={() => handleSlideSelect(idx)}
              className={`h-[3px] rounded-[2px] cursor-pointer focus:outline-none transition-all duration-300 ${isActive ? 'w-[40px] bg-[#F4821F]' : 'w-[24px] bg-white/50 hover:bg-white'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}
