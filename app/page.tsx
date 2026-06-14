import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import StatsBar from '@/components/home/StatsBar';
import CampusLifeShowcase from '@/components/home/CampusLifeShowcase';
import GalleryPreview from '@/components/home/GalleryPreview';
import AcademicExcellence from '@/components/home/AcademicExcellence';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FacilitiesSection from '@/components/home/FacilitiesSection';
import HomeContactSection from '@/components/home/HomeContactSection';

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSlider />

      {/* 2. Why CMR Section */}
      <WhyChooseUs />

      {/* 3. Statistics & Achievements */}
      <StatsBar />

      {/* 4. Campus Life Showcase */}
      <CampusLifeShowcase />

      {/* 5. Gallery Section */}
      <GalleryPreview />

      {/* 6. Academic Excellence */}
      <AcademicExcellence />

      {/* 7. Student Testimonials */}
      <TestimonialsSection />

      {/* 8. Facilities Showcase */}
      <FacilitiesSection />

      {/* 9. Admissions Section */}
      <HomeContactSection />
    </>
  );
}
