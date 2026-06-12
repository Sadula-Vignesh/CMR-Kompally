import React from 'react';
import Image from 'next/image';
import { Building, Tv, Users, FlaskConical } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { FACILITIES } from '@/lib/constants';

const ICONS = {
  Building: Building,
  Tv: Tv,
  Users: Users,
  FlaskConical: FlaskConical,
};

export default function FacilitiesSection() {
  return (
    <section className="bg-brand-dark py-16 md:py-24 text-white relative overflow-hidden">
      {/* Background Image texture watermark */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Image
          src="/images/computer_class.jpg"
          alt="Classroom backdrop"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      
      {/* Decorative top-line indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gold z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="World-Class Facilities"
          subtitle="Our Infrastructure"
          align="center"
          light={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FACILITIES.map((facility, idx) => {
            const IconComponent = ICONS[facility.icon as keyof typeof ICONS] || FlaskConical;
            return (
              <div
                key={idx}
                className="bg-brand-navy border border-brand-gold/30 rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 hover:border-brand-gold"
              >
                <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-lg w-fit mb-4">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-body font-bold text-xl mb-2 text-white">
                  {facility.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed font-body">
                  {facility.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
