'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const CAMPUSES = [
  {
    id: 'kompally',
    name: 'Kompally',
    subtitle: 'Main Campus',
    image: '/images/Building Straight.png',
    link: '#hero'
  },
  {
    id: 'lalgadi-malakpet',
    name: 'Lalgadi Malakpet',
    subtitle: 'Lalgadi Malakpet Campus',
    image: '/images/CMRlalgadimalakpet.png',
    link: 'https://www.cmrschoollalgadimalakpet.com/'
  },
  {
    id: 'medchal',
    name: 'Medchal',
    subtitle: 'NH-44 Campus',
    image: '/images/CMRmedchal.png',
    link: 'https://cmrschool.in/'
  }
];

export default function OurCampuses() {
  const upperRowRef = useRef<HTMLDivElement>(null);
  const lowerRowRef = useRef<HTMLDivElement>(null);

  // Trigger animations when the row is scrolled into view (once: true for smooth entry)
  const isUpperInView = useInView(upperRowRef, { once: true, amount: 0.2 });
  const isLowerInView = useInView(lowerRowRef, { once: true, amount: 0.2 });

  // Variants for "Our School" text sliding from below
  const titleVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  // Variants for Campus Cards flying in from the right edge
  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { x: '100vw', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 70, damping: 18, mass: 1.1 }
    }
  };

  // Variants for the lower section (image and content sliding up from below)
  const bottomImageVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }
    }
  };

  const bottomContentVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }
    }
  };

  return (
    <section className="bg-[#f5f6f8] text-slate-900 py-20 md:py-28 overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      {/* UPPER ROW: Heading & 3 Campus Cards */}
      <div ref={upperRowRef} className="w-[95%] max-w-none mx-auto px-0 md:px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Giant Title Column */}
          <div className="lg:col-span-3 flex items-center justify-start">
            <motion.div
              initial="hidden"
              animate={isUpperInView ? 'visible' : 'hidden'}
              variants={titleVariants}
              className="relative w-full h-[180px] sm:h-[240px] md:h-[200px] lg:h-[280px] xl:h-[340px] select-none"
            >
              <Image
                src="/images/ourschool1.png"
                alt="Our School"
                fill
                className="object-contain object-center lg:object-left"
                priority
              />
            </motion.div>
          </div>

          {/* 3 Campus Cards Column */}
          <div className="lg:col-span-9 overflow-visible">
            <motion.div
              initial="hidden"
              animate={isUpperInView ? 'visible' : 'hidden'}
              variants={cardContainerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {CAMPUSES.map((campus) => (
                <motion.div
                  key={campus.id}
                  variants={cardVariants}
                  className="group relative h-[280px] sm:h-[340px] md:h-[280px] lg:h-[320px] xl:h-[360px] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white border border-slate-100"
                >
                  <Link
                    href={campus.link}
                    className="block w-full h-full relative"
                    target={campus.link.startsWith('http') ? '_blank' : undefined}
                    rel={campus.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={(e) => {
                      if (campus.link === '#hero') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    {/* Campus Image */}
                    <Image
                      src={campus.image}
                      alt={`${campus.name} Campus`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

                    {/* Info Card Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 text-white">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="font-display font-extrabold text-2xl md:text-xl lg:text-2xl xl:text-3xl leading-none text-white">
                            {campus.name}
                          </h3>
                        </div>

                        {/* Interactive Arrow Circular Button */}
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-md group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300 shrink-0 ml-4">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* LOWER ROW: Student Image & About Details */}
      <div ref={lowerRowRef} className="w-[95%] max-w-none mx-auto px-0 md:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Arched Student Image Block (Slides from below) */}
          <motion.div
            initial="hidden"
            animate={isLowerInView ? 'visible' : 'hidden'}
            variants={bottomImageVariants}
            className="lg:col-span-5 flex justify-start"
          >
            {/* Custom Shield Shape with drop shadow */}
            <div className="relative shrink-0" style={{ filter: 'drop-shadow(0px 15px 30px rgba(15, 23, 42, 0.08))' }}>
              {/* Outer white shield border container */}
              <div
                className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[450px] lg:w-[320px] lg:h-[400px] xl:w-[380px] xl:h-[480px] bg-white flex items-center justify-center"
                style={{ clipPath: 'url(#shield-clip)' }}
              >
                {/* Inner image container (inset for border effect) */}
                <div
                  className="absolute inset-[10px] overflow-hidden bg-gradient-to-b from-[#fef3c7] via-[#fdf6e2] to-[#f5e0c3]"
                  style={{ clipPath: 'url(#shield-clip)' }}
                >
                  <Image
                    src="/images/girlimage.png"
                    alt="CMR School Student"
                    fill
                    className="object-cover object-top brightness-105 scale-[1.18] translate-y-2 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                  {/* Visual ambient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-200/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* About School Content Block (Slides from below) */}
          <motion.div
            initial="hidden"
            animate={isLowerInView ? 'visible' : 'hidden'}
            variants={bottomContentVariants}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-2">
              <h2 className="font-display font-black text-4xl sm:text-5xl text-brand-orange tracking-tight leading-none">
                About CMR School
              </h2>
            </div>

            <div className="space-y-4 text-slate-700 font-body text-sm sm:text-base leading-relaxed">
              <p>
                Learning is a journey of curiosity, character and confidence. Rooted in Indian values and enriched with global perspectives, the CMR group of schools offer an environment where students feel safe, inspired and supported to reach their full potential.
              </p>
              <p>
                With dedicated mentors, holistic programs and a culture that values both discipline and creativity, CMR School shapes well-rounded individuals ready to thrive in an ever-changing world.
              </p>
            </div>

            {/* Square Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 bg-brand-orange mt-1.5 shrink-0 rounded-sm" />
                <span className="font-body text-sm font-medium text-slate-800">
                  Global curricula, Indian foundation
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 bg-brand-orange mt-1.5 shrink-0 rounded-sm" />
                <span className="font-body text-sm font-medium text-slate-800">
                  Balance of academics, sports and arts
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 bg-brand-orange mt-1.5 shrink-0 rounded-sm" />
                <span className="font-body text-sm font-medium text-slate-800">
                  Personalised learning, low student-teacher ratio
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 bg-brand-orange mt-1.5 shrink-0 rounded-sm" />
                <span className="font-body text-sm font-medium text-slate-800">
                  Holistic growth through day and boarding life
                </span>
              </div>
            </div>

            {/* Read More Action */}
            <div className="pt-4">
              <Button href="/about" className="px-8 py-3 bg-brand-orange hover:bg-brand-navy text-white font-bold rounded-full text-sm transition-colors duration-300 shadow-md">
                Read More
              </Button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* SVG Clip Path Definition for the Shield Shape */}
      <svg className="w-0 h-0 absolute pointer-events-none" width="0" height="0">
        <defs>
          <clipPath id="shield-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5,1 C 0.12,0.85 0,0.68 0,0.48 V 0.28 A 0.5,0.28 0 0,1 1,0.28 V 0.48 C 1,0.68 0.88,0.85 0.5,1 Z" />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}
