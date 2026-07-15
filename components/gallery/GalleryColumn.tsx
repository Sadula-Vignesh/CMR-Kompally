'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GalleryImage, ASPECT_RATIOS } from './GalleryConfig';

gsap.registerPlugin(ScrollTrigger);

interface GalleryColumnProps {
  images: GalleryImage[];
  speed: number;
  direction: 'up' | 'down';
  colIndex: number;
  className: string;
}

export default function GalleryColumn({
  images = [],
  speed,
  direction,
  colIndex,
  className
}: GalleryColumnProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const columnEl = innerRef.current;
    if (!columnEl || images.length === 0) return;

    let tl: gsap.core.Timeline;

    if (direction === 'up') {
      tl = gsap.timeline({
        repeat: -1,
        paused: true
      });
      tl.to(columnEl, {
        yPercent: -50,
        duration: speed,
        ease: "none"
      });
    } else {
      tl = gsap.timeline({
        repeat: -1,
        paused: true
      });
      // downward column moves from -50% to 0%
      tl.fromTo(columnEl,
        { yPercent: -50 },
        {
          yPercent: 0,
          duration: speed,
          ease: "none"
        }
      );
    }

    // ScrollTrigger to play timelines only when the section is inside the viewport
    const trigger = ScrollTrigger.create({
      trigger: columnEl.closest('section'),
      start: "top bottom",
      end: "bottom top",
      onEnter: () => tl.play(),
      onLeave: () => tl.pause(),
      onEnterBack: () => tl.play(),
      onLeaveBack: () => tl.pause()
    });

    // Handle initial state if section is already in viewport on page load
    if (trigger.isActive) {
      tl.play();
    }

    return () => {
      tl.kill();
      trigger.kill();
    };
  }, [images, direction, speed]);

  if (images.length === 0) return null;

  // Duplicate items internally so we have enough height to loop seamlessly
  let baseList = [...images];
  while (baseList.length < 8) {
    baseList = [...baseList, ...images];
  }

  // Duplicate for the infinite wrapping loop (Set 1 + Set 2)
  const duplicatedImages = [...baseList, ...baseList];

  return (
    <div className={`overflow-hidden h-full ${className}`}>
      <div
        ref={innerRef}
        className="flex flex-col gap-[14px] sm:gap-[18px] xl:gap-6 will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {duplicatedImages.map((img, idx) => {
          // Guarantee identical layouts for Set 1 and Set 2 by indexing the original list length
          const originalIndex = idx % baseList.length;
          const aspectClass = ASPECT_RATIOS[(originalIndex + colIndex) % ASPECT_RATIOS.length];

          return (
            <div
              key={`${img.url}-${idx}`}
              className={`relative w-full ${aspectClass} rounded-[10px] overflow-hidden bg-slate-50 border border-slate-100/30 group`}
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw, 20vw"
                className="object-cover transition-all duration-500 ease-out hover:scale-[1.04] hover:brightness-[1.05] cursor-pointer rounded-[10px]"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
