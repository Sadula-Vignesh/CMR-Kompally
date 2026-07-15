'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GalleryImage, CARD_ANIMATION_CONFIGS } from './GalleryConfig';
import GalleryCard from './GalleryCard';
import SectionHeading from '@/components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
  initialImages: GalleryImage[];
}

export default function GallerySection({ initialImages = [] }: GallerySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || initialImages.length === 0) return;

    const cards = section.querySelectorAll('.gallery-card');
    
    // Set initial off-screen properties for the entrance animations
    cards.forEach((cardEl) => {
      const idxAttr = cardEl.getAttribute('data-index');
      const idx = idxAttr ? parseInt(idxAttr, 10) : 0;
      const config = CARD_ANIMATION_CONFIGS[idx % CARD_ANIMATION_CONFIGS.length];
      
      gsap.set(cardEl, {
        opacity: 0,
        scale: 0.6,
        filter: "blur(20px)",
        x: config.x,
        y: config.y,
        rotate: config.rotate
      });
    });

    // Create the main pinned scroll-driven timeline scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=3500",
        scrub: 1, // small inertia on scroll scrub
        pin: true,
        pinSpacing: true,
        id: "gallery-scroll-timeline"
      }
    });

    // Fade out and translate the heading upwards as scrolling begins
    const heading = section.querySelector('.gallery-heading');
    if (heading) {
      tl.to(heading, {
        opacity: 0,
        y: -40,
        duration: 1.0,
        ease: "power2.out"
      }, 0);
    }

    // Choreograph each card's entrance sequence one after another
    cards.forEach((cardEl, idx) => {
      tl.to(cardEl, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        x: 0,
        y: 0,
        rotate: 0,
        duration: 1.5,
        ease: "power3.out"
      }, idx * 0.4 + 0.3); // Staggers the starts of each transition sequence with a tiny initial delay
    });

    return () => {
      // Clear trigger bindings to prevent duplicates on unmount
      ScrollTrigger.getById("gallery-scroll-timeline")?.kill();
    };
  }, [initialImages]);

  if (!initialImages || initialImages.length === 0) {
    return null;
  }

  // Display up to 15 images to maintain vertical screen balance
  const activeImages = initialImages.slice(0, 15);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white text-slate-900 overflow-hidden select-none"
    >
      {/* Pinned Title Layer */}
      <div className="gallery-heading absolute top-12 left-0 w-full px-6 md:px-8 xl:px-12 z-20 pointer-events-none">
        <SectionHeading
          title="School Gallery Showcase"
          subtitle="Moments Captured"
          align="left"
          light={false}
        />
      </div>

      {/* Subtle luxury radial glow mask */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-white/70 to-white pointer-events-none z-10" />
      
      <div className="w-full h-full flex items-center justify-center pt-24">
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[14px] sm:gap-[18px] xl:gap-6 w-full max-h-full px-[14px] sm:px-[18px] xl:px-6 relative z-10 py-6 items-center">
          {activeImages.map((img, idx) => (
            <GalleryCard key={img.url} img={img} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
