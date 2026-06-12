import React from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export default function AboutSnapshot() {
  return (
    <section className="bg-brand-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="flex flex-col space-y-6">
            <SectionHeading
              title="Welcome to CMR School Kompally"
              subtitle="Premier CBSE Institution"
              align="left"
            />
            <p className="text-gray-700 text-base md:text-lg leading-relaxed font-body">
              CMR School Kompally is a premier CBSE institution committed to providing world-class education in Hyderabad. We nurture young minds with a perfect blend of academic excellence, co-curricular activities, and value-based education. Our state-of-the-art campus spans 5 acres, equipped with modern laboratories, digital classrooms, and world-class sports facilities.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed font-body">
              Through student-centric learning methods, advanced technology integration, and an experienced faculty body, we prepare our scholars for 21st-century academic and professional achievements while cultivating deep moral virtues.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button href="/about" variant="primary" className="text-sm py-3 justify-center">
                About School
              </Button>
              <Button href="/about#features" variant="outline" className="text-sm py-3 justify-center">
                Salient Features
              </Button>
              <Button href="/co-curricular" variant="outline" className="text-sm py-3 justify-center">
                Beyond Curriculum
              </Button>
              <Button href="/contact?subject=Brochure" variant="orange" className="text-sm py-3 justify-center">
                Download Brochure
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Placement */}
          <div className="relative group overflow-hidden rounded-2xl shadow-xl h-[350px] md:h-[450px]">
            {/* Campus background image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/cmr_school.webp"
                alt="CMR School Kompally Campus"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent z-10" />
            
            {/* Visual labels overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white z-20">
              <span className="text-xs font-semibold text-brand-goldLight uppercase tracking-wider block mb-1">
                Kompally Campus
              </span>
              <h4 className="text-xl font-display font-bold mb-2">
                5-Acre State-of-the-Art Learning Environment
              </h4>
              <p className="text-xs text-gray-200">
                Spacious playground, digitally-enabled classrooms, and advanced innovation labs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
