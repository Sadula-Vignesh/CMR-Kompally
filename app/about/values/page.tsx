import React from 'react';
import type { Metadata } from 'next';
import { Award, Compass, Lightbulb, Heart, HeartHandshake, ShieldAlert } from 'lucide-react';
import InnerHero from '@/components/ui/InnerHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Our School Values',
  description: 'Explore the core ethical pillars that guide students and staff at CMR School Kompally.',
};

const VALUES = [
  {
    icon: Award,
    title: "Excellence",
    description: "Striving for the highest standards in everything we do — academics, sports, leadership, and conduct.",
    colorClass: "text-brand-orange bg-brand-orange/10 border-brand-orange/20"
  },
  {
    icon: Compass,
    title: "Integrity",
    description: "Building moral strength and character through honesty, transparency, and ethical daily practices.",
    colorClass: "text-brand-navy bg-brand-navy/10 border-brand-navy/20"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Embracing new ideas, design thinking, and computational creativity to navigate a dynamic world.",
    colorClass: "text-brand-green bg-brand-green/10 border-brand-green/20"
  },
  {
    icon: Heart,
    title: "Compassion",
    description: "Caring deeply for every student's emotional, mental, and physical wellbeing to foster safety.",
    colorClass: "text-brand-gold bg-brand-gold/10 border-brand-gold/20"
  },
  {
    icon: HeartHandshake,
    title: "Respect",
    description: "Honoring cultural diversity, listening to varying view points, and treating everyone with dignity.",
    colorClass: "text-brand-navy bg-brand-navy/10 border-brand-navy/20"
  },
  {
    icon: ShieldAlert,
    title: "Responsibility",
    description: "Developing accountable, socially integrated, and civic-minded future citizens of the nation.",
    colorClass: "text-brand-orange bg-brand-orange/10 border-brand-orange/20"
  }
];

export default function ValuesPage() {
  return (
    <>
      <InnerHero
        title="Our Values"
        breadcrumbs={[
          { label: "About Us", href: "/about" },
          { label: "Our Values" }
        ]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16 text-center mx-auto">
            <SectionHeading
              title="The Foundations of Character"
              subtitle="Ethical Compass"
              align="center"
            />
            <p className="text-gray-700 leading-relaxed font-body mt-4">
              At CMR School Kompally, education goes beyond classrooms and scorecards. We are committed to nurturing the ethical foundation of each child, cultivating global citizens who lead with wisdom, courage, and responsibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <Card
                  key={idx}
                  className="flex flex-col space-y-4 p-8 border border-gray-100 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300"
                >
                  <div className={`p-3 rounded-lg w-fit ${val.colorClass}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-body font-bold text-xl text-brand-navy">
                    {val.title}
                  </h3>
                  
                  <p className="text-gray-650 text-sm leading-relaxed font-body">
                    {val.description}
                  </p>
                </Card>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
