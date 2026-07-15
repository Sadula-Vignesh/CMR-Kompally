import React from 'react';
import fs from 'fs';
import path from 'path';
import HeroSlider from '@/components/home/HeroSlider';
import OurCampuses from '@/components/home/OurCampuses';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import StatsBar from '@/components/home/StatsBar';
import CampusLifeShowcase from '@/components/home/CampusLifeShowcase';
import GalleryPreview from '@/components/home/GalleryPreview';
import AcademicExcellence from '@/components/home/AcademicExcellence';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FacilitiesSection from '@/components/home/FacilitiesSection';
import HomeContactSection from '@/components/home/HomeContactSection';

interface GalleryImage {
  url: string;
  title: string;
}

function getGalleryImages(): GalleryImage[] {
  const imageExtensions = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg'];
  
  const possiblePaths = [
    path.join(process.cwd(), 'public', 'images', 'gallery'),
    path.join(process.cwd(), 'public', 'images', 'gallery-images'),
  ];

  for (const dirPath of possiblePaths) {
    try {
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        const images = files
          .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
          .map(file => {
            const folderName = dirPath.includes('gallery-images') ? 'gallery-images' : 'gallery';
            const cleanName = file.replace(/\.[^/.]+$/, "");
            const title = cleanName
              .replace(/[_\\+\\-]/g, ' ')
              .replace(/\s+/g, ' ')
              .trim()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
              
            return {
              url: `/images/${folderName}/${file}`,
              title: title || 'Campus Highlight'
            };
          });
          
        if (images.length > 0) {
          return images;
        }
      }
    } catch (e) {
      console.error("Error reading directory", dirPath, e);
    }
  }

  return [];
}
export default function Home() {
  const galleryImages = getGalleryImages();

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSlider />

      {/* 1.5. Our Campuses Showcase */}
      <OurCampuses />

      {/* 2. Why CMR Section */}
      <WhyChooseUs />

      {/* 3. Statistics & Achievements */}
      <StatsBar />

      {/* 4. Campus Life Showcase */}
      <CampusLifeShowcase />

      {/* 5. Scrolling Parallax Gallery */}
      <GalleryPreview initialImages={galleryImages} />

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
