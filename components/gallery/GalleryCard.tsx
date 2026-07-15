'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GalleryImage } from './GalleryConfig';

interface GalleryCardProps {
  img: GalleryImage;
  idx: number;
}

export default function GalleryCard({ img, idx }: GalleryCardProps) {

  // Responsive visibility bounds to keep viewport fitting on all devices
  let visibilityClass = '';
  if (idx < 6) {
    visibilityClass = 'block'; // Mobile (6 cards: 2x3 grid)
  } else if (idx < 9) {
    visibilityClass = 'hidden sm:block'; // Tablet (9 cards: 3x3 grid)
  } else if (idx < 15) {
    visibilityClass = 'hidden lg:block'; // Desktop (15 cards: 5x3 grid)
  } else {
    visibilityClass = 'hidden';
  }

  // Floating animations staggered based on index
  const floatType = idx % 3;
  const floatClass = floatType === 0 ? 'animate-float-slow' : floatType === 1 ? 'animate-float-medium' : 'animate-float-fast';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatSlow {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(2px, -3px, 0); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-3px, 2px, 0); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(2px, 3px, 0); }
        }
        .animate-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: floatMedium 10s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: floatFast 12s ease-in-out infinite;
        }
      ` }} />
      <Link 
        href="/gallery"
        className={`gallery-card block relative w-full rounded-[20px] overflow-hidden bg-slate-50 border border-slate-100/30 ${visibilityClass}`}
        data-index={idx}
      >
        <div className={`w-full ${floatClass}`}>
          <Image
            src={img.url}
            alt={img.title}
            width={600}
            height={400}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw, 20vw"
            style={{ width: '100%', height: 'auto' }}
            className="transition-all duration-500 ease-out hover:scale-[1.04] hover:brightness-[1.05] cursor-pointer rounded-[20px]"
            loading="lazy"
          />
        </div>
      </Link>
    </>
  );
}
