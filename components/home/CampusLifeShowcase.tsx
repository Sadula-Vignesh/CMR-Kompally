'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Compass, ArrowLeft, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const CAMPUS_ITEMS = [
  {
    id: 1,
    title: "Space Lab Astronomy Session",
    category: "Clubs",
    image: "/images/IMG20240316114038-scaled.jpg",
    badgeColor: "bg-brand-orange text-white border-brand-orange/30",
    description: "Exploring the wonders of the cosmos through high-powered telescope arrays and interactive simulations.",
    tagline: "Cosmology & Science Exploration",
    date: "October 12, 2025",
    location: "Space Innovation Lab",
    details: "Students used automated Celestron telescopes to track planetary movements and observe lunar craters. The session included a briefing on stellar evolution and deep space objects, followed by hands-on celestial mapping."
  },
  {
    id: 2,
    title: "Annual Sports Meet - Track Arena",
    category: "Sports",
    image: "/images/IMG20231227145159-scaled.jpg",
    badgeColor: "bg-brand-green text-white border-brand-green/30",
    description: "A thrilling showcase of athletic excellence, team spirit, and competitive determination on our outdoor tracks.",
    tagline: "Sports & Physical Excellence",
    date: "November 20, 2025",
    location: "Main Sports Field",
    details: "The annual championship track events witnessed competitive runs in 100m, 200m, and relay races. Outstanding athletes were awarded medals by our guest coaches, celebrating team coordination and sportsmanship."
  },
  {
    id: 3,
    title: "Primary coding session in Computer lab",
    category: "Academics",
    image: "/images/computer_class.jpg",
    badgeColor: "bg-brand-navy text-white border-brand-navy/30",
    description: "Fostering early computational logic, programming concepts, and analytical problem-solving from primary grades.",
    tagline: "21st Century Skills",
    date: "September 18, 2025",
    location: "Computer Science Lab 2",
    details: "Young learners engaged in puzzle-based coding exercises using Scratch and Blockly. The session focused on developing structural programming concepts, loop logic, and creative troubleshooting skills."
  },
  {
    id: 4,
    title: "Smart Digital Classroom Integration",
    category: "Academics",
    image: "/images/digital_classroom.png",
    badgeColor: "bg-brand-navy text-white border-brand-navy/30",
    description: "Empowering interactive learning with virtual simulation labs and modern smartboard technology platforms.",
    tagline: "Advanced EdTech",
    date: "October 5, 2025",
    location: "Secondary Block - Class VIII",
    details: "Integrating visual curriculum layers with digital smartboards, this session demonstrated simulated science labs and active classroom polling, increasing student retention and visual learning depth."
  },
  {
    id: 5,
    title: "Group Coordination Exercises",
    category: "Sports",
    image: "/images/sports_field.png",
    badgeColor: "bg-brand-green text-white border-brand-green/30",
    description: "Building synergy, teamwork, and collaborative social dynamics through outdoor physical cooperative games.",
    tagline: "Teamwork & Synergy",
    date: "September 29, 2025",
    location: "Indoor Sports Hall",
    details: "Focused on building spatial awareness, motor skills, and group collaboration. Students participated in obstacle relays and team synergy challenges designed to promote healthy outdoor physical activity."
  },
  {
    id: 6,
    title: "Interactive Campus Life Festival",
    category: "Cultural",
    image: "/images/cmr_school.webp",
    badgeColor: "bg-brand-gold text-brand-dark border-brand-gold/30",
    description: "Celebrating creative arts, theatre, music, and regional heritage in our annual school festival gatherings.",
    tagline: "Art & Cultural Festivals",
    date: "December 15, 2025",
    location: "Main School Auditorium",
    details: "A colorful festival celebrating cultural diversity at CMR. The event featured traditional folk dances, drama acts, instrumental music showcases, and an art exhibition highlighting student-made sculptures and paintings."
  }
];

export default function CampusLifeShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play interval that pauses only when card is flipped
  useEffect(() => {
    if (isFlipped) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAMPUS_ITEMS.length);
    }, 4000); // Cycles every 4 seconds

    return () => clearInterval(interval);
  }, [isFlipped]);

  // Circular rotation indexing offset calculations
  const getCardPosition = (index: number) => {
    const N = CAMPUS_ITEMS.length;
    if (N === 0) return null;
    
    let diff = index - activeIndex;
    // Circular wrap logic
    diff = ((diff + Math.floor(N / 2)) % N + N) % N - Math.floor(N / 2);
    return diff;
  };

  // 3D positioning mapping
  const getStyles = (diff: number) => {
    const xOffset1 = isMobile ? 110 : 380;
    const xOffset2 = isMobile ? 200 : 720;
    
    if (diff === 0) {
      return {
        x: 0,
        z: 100,
        scale: 1,
        rotateY: 0,
        opacity: 1,
        zIndex: 30,
        filter: "blur(0px)",
        pointerEvents: 'auto' as const
      };
    } else if (diff === 1) {
      return {
        x: xOffset1,
        z: -80,
        scale: isMobile ? 0.78 : 0.85,
        rotateY: -30,
        opacity: isMobile ? 0.45 : 0.85,
        zIndex: 20,
        filter: "blur(0px)",
        pointerEvents: 'auto' as const
      };
    } else if (diff === -1) {
      return {
        x: -xOffset1,
        z: -80,
        scale: isMobile ? 0.78 : 0.85,
        rotateY: 30,
        opacity: isMobile ? 0.45 : 0.85,
        zIndex: 20,
        filter: "blur(0px)",
        pointerEvents: 'auto' as const
      };
    } else if (diff === 2) {
      return {
        x: xOffset2,
        z: -260,
        scale: isMobile ? 0.58 : 0.68,
        rotateY: -55,
        opacity: isMobile ? 0.15 : 0.4,
        zIndex: 10,
        filter: "blur(3px)",
        pointerEvents: 'auto' as const
      };
    } else if (diff === -2) {
      return {
        x: -xOffset2,
        z: -260,
        scale: isMobile ? 0.58 : 0.68,
        rotateY: 55,
        opacity: isMobile ? 0.15 : 0.4,
        zIndex: 10,
        filter: "blur(3px)",
        pointerEvents: 'auto' as const
      };
    } else {
      // Background items (far off)
      return {
        x: diff * (isMobile ? 150 : 340),
        z: -450,
        scale: 0.5,
        rotateY: diff > 0 ? -70 : 70,
        opacity: 0,
        zIndex: 5,
        filter: "blur(6px)",
        pointerEvents: 'none' as const
      };
    }
  };

  const handleCardClick = (idx: number) => {
    const diff = getCardPosition(idx);
    if (diff === 0) {
      setIsFlipped(!isFlipped);
    } else {
      setActiveIndex(idx);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setActiveIndex((prev) => (prev - 1 + CAMPUS_ITEMS.length) % CAMPUS_ITEMS.length);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setActiveIndex((prev) => (prev + 1) % CAMPUS_ITEMS.length);
  };

  // Background shifting color depending on center card category
  const currentCenterCard = CAMPUS_ITEMS[activeIndex];
  const bgStyles = {
    clubs: "bg-orange-50/50",
    sports: "bg-emerald-50/50",
    academics: "bg-sky-50/50",
    cultural: "bg-amber-50/50"
  };

  const currentBgClass = currentCenterCard 
    ? bgStyles[currentCenterCard.category.toLowerCase() as keyof typeof bgStyles] || "bg-slate-50/50"
    : "bg-slate-50/50";

  return (
    <section 
      ref={sectionRef}
      className={`py-24 md:py-32 relative overflow-hidden transition-colors duration-700 ease-in-out bg-grid-pattern ${currentBgClass}`}
    >
      {/* Decorative ambient glowing background circles */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-navy/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="mb-16">
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-navy/5 border border-brand-navy/10 rounded-full text-brand-navy text-xs font-bold uppercase tracking-wider mb-3 select-none">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
              Life at CMR
            </div>
            <SectionHeading
              title="Vibrant Campus Life"
              subtitle="Beyond the classroom, discovering passions and developing skills"
              align="left"
            />
          </div>
        </div>

        {/* 3D Perspective Orbit Wheel Carousel Container */}
        <div 
          className="relative w-full h-[500px] md:h-[620px] flex items-center justify-center select-none" 
          style={{ perspective: "1200px" }}
        >
          {CAMPUS_ITEMS.map((item, idx) => {
            const diff = getCardPosition(idx);
            if (diff === null) return null;
            
            const styles = getStyles(diff);
            const isCenter = diff === 0;
            
            return (
              <motion.div
                key={item.id}
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: styles.zIndex,
                  pointerEvents: styles.pointerEvents,
                  position: "absolute"
                }}
                animate={{
                  x: styles.x,
                  z: styles.z,
                  scale: styles.scale,
                  rotateY: styles.rotateY,
                  opacity: styles.opacity,
                  filter: styles.filter
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                  mass: 0.8
                }}
                className="w-[245px] h-[343px] md:w-[380px] md:h-[540px] cursor-pointer"
                onClick={() => handleCardClick(idx)}
              >
                
                {/* 3D Flipping container */}
                <motion.div
                  style={{
                    transformStyle: "preserve-3d",
                    width: "100%",
                    height: "100%",
                    position: "relative"
                  }}
                  animate={{ rotateY: (isCenter && isFlipped) ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full h-full rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  
                  {/* FRONT FACE */}
                  <div
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      position: "absolute",
                      inset: 0
                    }}
                    className="w-full h-full rounded-[2.5rem] overflow-hidden bg-white border border-slate-200/80 p-2"
                  >
                    <div className="relative w-full h-full rounded-[2.25rem] overflow-hidden bg-slate-900 group">
                      
                      {/* Photo Image */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover brightness-[0.9] group-hover:scale-105 transition-all duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={isCenter}
                      />
                      
                      {/* Gradient Dark Tint */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent z-10" />
 
                      {/* Content Layers */}
                      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-20 text-white">
                        
                        <div className="flex justify-between items-start">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-white/20 shadow-md ${item.badgeColor}`}>
                            {item.category}
                          </span>
                          
                          {isCenter && (
                            <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center text-white animate-pulse">
                              <Camera className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
 
                        <div className="space-y-2">
                          {isCenter && (
                            <div className="inline-flex items-center gap-1.5 text-brand-goldLight opacity-90">
                              <Compass className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
                              <span className="text-[9px] font-black uppercase tracking-wider">CLICK CARD TO FLIP DETAILS</span>
                            </div>
                          )}
                          <h3 className="font-display font-black text-white text-base md:text-xl leading-snug tracking-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>
 
                    </div>
                  </div>
 
                  {/* BACK FACE */}
                  <div
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      position: "absolute",
                      inset: 0
                    }}
                    className="w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-950 p-2 border border-white/10"
                  >
                    <div className="w-full h-full rounded-[2.25rem] bg-slate-900 p-6 md:p-8 flex flex-col justify-between text-white relative overflow-hidden">
                      {/* Decorative internal blob */}
                      <div className="absolute -top-12 -right-12 w-28 h-28 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />
 
                      <div className="space-y-5">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                          <span className={`px-3 py-1 rounded-full border ${item.badgeColor}`}>
                            {item.category}
                          </span>
                          <span>{item.date}</span>
                        </div>
 
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-extrabold text-brand-goldLight uppercase tracking-widest block">
                            {item.tagline}
                          </span>
                          <h3 className="text-lg md:text-xl font-display font-black leading-tight text-white">
                            {item.title}
                          </h3>
                        </div>
 
                        <p className="text-slate-300 font-body text-xs md:text-sm leading-relaxed border-t border-white/10 pt-4 max-h-[180px] md:max-h-[240px] overflow-y-auto">
                          {item.details}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2 text-slate-400 font-body text-[10px] font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                          <span>Venue: {item.location}</span>
                        </div>
                        
                        <button className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer select-none">
                          Click Card to Flip Back
                        </button>
                      </div>

                    </div>
                  </div>

                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Orbit navigation arrows */}
        {CAMPUS_ITEMS.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6 z-20 relative">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center hover:bg-brand-navy hover:text-white transition-all text-slate-600 cursor-pointer select-none"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-black text-slate-500 tracking-wider bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm min-w-[70px] text-center">
              0{activeIndex + 1} / 0{CAMPUS_ITEMS.length}
            </span>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center hover:bg-brand-navy hover:text-white transition-all text-slate-600 cursor-pointer select-none"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
