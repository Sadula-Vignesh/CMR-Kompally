import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import StatsBar from '@/components/home/StatsBar';
import AboutSnapshot from '@/components/home/AboutSnapshot';
import ProgramsSection from '@/components/home/ProgramsSection';
import FacilitiesSection from '@/components/home/FacilitiesSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import GalleryPreview from '@/components/home/GalleryPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsPreview from '@/components/home/NewsPreview';
import FAQSection from '@/components/home/FAQSection';
import HomeContactSection from '@/components/home/HomeContactSection';

export default function Home() {
  return (
    <>
      {/* 1. Hero Slider Section */}
      <HeroSlider />

      {/* 2. Animated Stats Bar Section */}
      <StatsBar />

      {/* 3. About School Snapshot */}
      <AboutSnapshot />

      {/* 4. Academic Programs Grid */}
      <ProgramsSection />

      {/* 5. World-Class Infrastructure Facilities */}
      <FacilitiesSection />

      {/* 6. Why Parents Choose CMR */}
      <WhyChooseUs />

      {/* 7. Gallery Highlights */}
      <GalleryPreview />

      {/* 8. Parents Testimonials */}
      <TestimonialsSection />

      {/* 9. Latest News & Blog Updates */}
      <NewsPreview />

      {/* 10. Frequently Asked Questions Accordion */}
      <FAQSection />

      {/* 11. Admissions Enquiry Form & Map */}
      <HomeContactSection />
    </>
  );
}
