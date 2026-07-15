'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, BookOpen, Cpu, Shield, Users2, Trophy, ArrowRight, Check } from 'lucide-react';
import Button from '@/components/ui/Button';

const FEATURES = [
  {
    icon: BookOpen,
    title: "CBSE Curriculum",
    description: "A rigorous, nationally-recognized board providing a strong academic foundation for competitive excellence.",
    color: "brand-orange"
  },
  {
    icon: Users2,
    title: "Expert Faculty",
    description: "Highly qualified mentors committed to personalized student growth and adaptive teaching methodologies.",
    color: "brand-navy"
  },
  {
    icon: Cpu,
    title: "Smart Classrooms",
    description: "Smart boards and integrated digital technology to visualize complex scientific and mathematical concepts.",
    color: "brand-green"
  },
  {
    icon: Trophy,
    title: "Sports Excellence",
    description: "A 5-acre green campus equipped with professional playfields and structured athletics coaching.",
    color: "brand-gold"
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Comprehensive CCTV coverage, security checks, and safe bus commute measures for every student.",
    color: "brand-orange"
  },
  {
    icon: Award,
    title: "Holistic Pillars",
    description: "Equal emphasis on core academics, visual & performing arts, public speaking, and leadership qualities.",
    color: "brand-navy"
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });

  return (
    <section ref={containerRef} className="bg-brand-cream/60 py-24 md:py-32 bg-grid-pattern relative overflow-hidden">
      {/* Decorative soft glowing backdrops */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Storytelling & Action (Sticky Wrapper) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col space-y-6"
            >
              <span className="text-brand-orange text-xs md:text-sm font-bold tracking-widest uppercase block">
                Core Strengths
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-brand-navy leading-tight tracking-tight">
                Why Parents Trust <span className="bg-gradient-to-r from-brand-orange to-brand-gold bg-clip-text text-transparent">CMR School</span>
              </h2>
              <p className="text-slate-650 text-base md:text-lg leading-relaxed font-body font-medium">
                We don't believe in boxy templates or old-school layouts. Our pedagogy is built around empowering the individual. At CMR, education is an active journey of discovery.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed font-body">
                For over 15 years, we have nurtured scholars to think critically, cooperate with empathy, and excel academically. Our balanced system prepares students for global opportunities.
              </p>

              <ul className="space-y-3 pt-2">
                {["100% CBSE Board Pass Rate", "Advanced Space Innovation Lab", "State-Level Sports Achievements"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-sm font-bold text-brand-navy">
                    <div className="w-5 h-5 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <Button href="/about" variant="primary" className="group/btn px-8 py-3.5 flex gap-2 items-center text-sm font-bold">
                  Learn About Our Philosophy
                  <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Staggered Asymmetric Card Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:pt-4">
            {FEATURES.map((feat, idx) => {
              const IconComp = feat.icon;
              // Determine translate offset for staggered look (Card 2, 4, 6 in right column)
              const isEven = idx % 2 === 1;
              
              return (
                <div
                  key={idx}
                  className={isEven ? 'lg:translate-y-8' : ''}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 120 : -120 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 120 : -120 }}
                    whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                    transition={{ 
                      duration: 0.7, 
                      delay: idx * 0.15, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    className="bg-white rounded-3xl p-7 border border-slate-100/80 shadow-md transition-all duration-300 hover:shadow-xl hover:border-slate-200/50 group flex flex-col justify-between h-full"
                  >
                    <div className="flex flex-col space-y-4">
                      {/* Dynamic colored icon box */}
                      <div className={`p-3.5 rounded-2xl w-fit transition-transform duration-300 group-hover:scale-110 ${
                        feat.color === 'brand-orange' ? 'bg-brand-orange/10 text-brand-orange' :
                        feat.color === 'brand-navy' ? 'bg-brand-navy/10 text-brand-navy' :
                        feat.color === 'brand-green' ? 'bg-brand-green/10 text-brand-green' :
                        'bg-brand-gold/10 text-brand-gold'
                      }`}>
                        <IconComp className="w-6 h-6 stroke-[1.8]" />
                      </div>

                      <h3 className="font-display font-extrabold text-xl text-brand-navy">
                        {feat.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-body">
                        {feat.description}
                      </p>
                    </div>

                    {/* Subtle hover detail indicator */}
                    <div className="pt-6 mt-4 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">Academic Pillar</span>
                      <ArrowRight className="w-4 h-4 text-brand-orange" />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
