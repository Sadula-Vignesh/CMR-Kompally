import React from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const PREVIEW_PHOTOS = [
  { title: "Annual Sports Day Meet", category: "Sports", image: "/images/children.jpg" },
  { title: "Science Olympiad Project", category: "Academics", image: "/images/images_3.jpg" },
  { title: "Space Lab Astronomy Session", category: "Events", image: "/images/images_4.jpg" },
  { title: "Classical Dance Performance", category: "Cultural", image: "/images/cmr_school.webp" },
  { title: "Computer Lab Coding Class", category: "Academics", image: "/images/computer_class.jpg" },
  { title: "Inter-School Chess Finals", category: "Sports", image: "/images/children.jpg" },
  { title: "Exhibition Painting Showcase", category: "Cultural", image: "/images/cmr_school.webp" },
  { title: "Interactive Smart Board Demo", category: "Academics", image: "/images/computer_class.jpg" },
];

export default function GalleryPreview() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <SectionHeading
            title="Life at CMR School"
            subtitle="Campus Moments"
            align="left"
          />
          <div className="mb-8 md:mb-0">
            <Button href="/gallery" variant="outline" className="text-sm">
              View All Photos
            </Button>
          </div>
        </div>

        {/* Masonry-like responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PREVIEW_PHOTOS.map((photo, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-xl shadow-sm h-64 border border-gray-100 hover:-translate-y-1 transition-all duration-300 hover:shadow-md cursor-pointer"
            >
              {/* Photo background image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent z-10" />
              
              {/* Badge & Info Overlay */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white z-20">
                <div className="w-fit">
                  <Badge variant={
                    photo.category === 'Sports' ? 'navy' :
                    photo.category === 'Academics' ? 'green' :
                    photo.category === 'Events' ? 'orange' : 'gold'
                  } className="bg-white/90 text-brand-navy border-none shadow-sm">
                    {photo.category}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="font-body font-semibold text-lg text-white leading-tight">
                    {photo.title}
                  </h3>
                  <span className="text-[10px] text-gray-300 mt-1 block">
                    CMR Kompally Campus
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
