'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const SLIDES = [
  { image: "/images/cmr_school.webp" },
  { image: "/images/building_image.webp" },
  { image: "/images/computer_class.jpg" },
  { image: "/images/children.jpg" }
];

const WORDS = [
  { prefix: "Excellence in ", highlight: "Education", suffix: "" },
  { prefix: "Innovation in ", highlight: "Learning", suffix: "" },
  { prefix: "Character and ", highlight: "Values", suffix: "" },
  { prefix: "", highlight: "Success", suffix: " in All Fields" }
];

export default function HeroSlider() {
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Loop background images
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000); // Transition background every 6 seconds
    return () => clearInterval(interval);
  }, [mounted]);

  // Typewriter Loop
  useEffect(() => {
    if (!mounted) return;

    const word = WORDS[currentWordIndex];
    const fullText = word.prefix + word.highlight + word.suffix;
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      // Deleting speed
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, 30);
    } else {
      // Typing speed
      timer = setTimeout(() => {
        setCurrentText((prev) => fullText.slice(0, prev.length + 1));
      }, 70);
    }

    // Pause when word is fully typed
    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2500); // Hold the completed word for 2.5 seconds
    }

    // Go to next word once deleted
    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, mounted]);

  const word = WORDS[currentWordIndex];
  const typedPrefix = word ? currentText.slice(0, word.prefix.length) : "";
  const typedHighlight = word ? currentText.slice(word.prefix.length, word.prefix.length + word.highlight.length) : "";
  const typedSuffix = word ? currentText.slice(word.prefix.length + word.highlight.length) : "";

  // Render static first slide for SSR
  if (!mounted) {
    const firstSlide = SLIDES[0];
    return (
      <div className="relative w-full h-[70vh] md:h-screen bg-slate-950 overflow-hidden">
        {/* Static Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={firstSlide.image}
            alt="CMR School Background"
            fill
            priority
            className="object-cover opacity-80 select-none"
            sizes="100vw"
          />
        </div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 custom-gradient-overlay z-10 pointer-events-none" />

        {/* Pinned Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <div className="flex flex-col items-center justify-center text-white">
              <span className="text-brand-goldLight text-xs md:text-sm font-semibold tracking-widest uppercase mb-4 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm select-none">
                Welcome to CMR School Kompally
              </span>

              <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-tight min-h-[96px] md:min-h-[160px] max-w-4xl tracking-tight">
                Excellence in <span className="text-brand-gold">Education</span>
              </h1>

              <p className="text-base md:text-xl text-gray-200 font-body max-w-2xl mb-8 leading-relaxed select-none">
                Nurturing Minds, Building Futures at Hyderabad's Premier CBSE Campus.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
                <Button href="/admissions" variant="orange" className="w-full sm:w-auto shadow-md">
                  Admissions 2026-27
                </Button>
                <Button href="/about" variant="white" className="w-full sm:w-auto shadow-sm">
                  About School
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] md:h-screen bg-slate-950 overflow-hidden">
      {/* Background carousel utilizing custom React cross-fade transitions */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              idx === currentImageIndex ? 'opacity-80 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <Image
              src={slide.image}
              alt="CMR School Background"
              fill
              priority={idx === 0}
              className="object-cover select-none"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 custom-gradient-overlay z-10 pointer-events-none" />

      {/* Pinned Single Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="flex flex-col items-center justify-center text-white">
            <span className="text-brand-goldLight text-xs md:text-sm font-semibold tracking-widest uppercase mb-4 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm select-none">
              Welcome to CMR School Kompally
            </span>

            {/* Dynamic Typewriter Heading */}
            <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-tight min-h-[96px] md:min-h-[160px] max-w-4xl tracking-tight">
              <span>{typedPrefix}</span>
              <span className="text-brand-gold">{typedHighlight}</span>
              <span>{typedSuffix}</span>
              <span className="text-brand-orange border-r-4 border-brand-orange ml-1.5 animate-pulse"></span>
            </h1>

            <p className="text-base md:text-xl text-gray-200 font-body max-w-2xl mb-8 leading-relaxed select-none">
              Nurturing Minds, Building Futures at Hyderabad's Premier CBSE Campus.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
              <Button href="/admissions" variant="orange" className="w-full sm:w-auto shadow-md">
                Admissions 2026-27
              </Button>
              <Button href="/about" variant="white" className="w-full sm:w-auto shadow-sm">
                About School
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
