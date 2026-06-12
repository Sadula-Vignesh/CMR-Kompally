import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, GraduationCap, Compass } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import { PROGRAMS } from '@/lib/constants';

const ICONS = {
  'Pre-Primary': Sparkles,
  'Primary': BookOpen,
  'Secondary': Compass,
  'High School': GraduationCap,
};

const BORDERS = {
  green: 'border-t-4 border-brand-green',
  orange: 'border-t-4 border-brand-orange',
  navy: 'border-t-4 border-brand-navy',
  gold: 'border-t-4 border-brand-gold',
};

const TEXT_COLORS = {
  green: 'text-brand-green bg-brand-green/10',
  orange: 'text-brand-orange bg-brand-orange/10',
  navy: 'text-brand-navy bg-brand-navy/10',
  gold: 'text-brand-gold bg-brand-gold/10',
};

export default function ProgramsSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Academic Programs"
          subtitle="Educational Levels"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROGRAMS.map((program) => {
            const IconComponent = ICONS[program.name as keyof typeof ICONS] || BookOpen;
            const borderClass = BORDERS[program.accent as keyof typeof BORDERS] || 'border-t-4 border-brand-navy';
            const colorClass = TEXT_COLORS[program.accent as keyof typeof TEXT_COLORS] || 'text-brand-navy';

            return (
              <Card
                key={program.name}
                className={`${borderClass} flex flex-col justify-between h-full`}
              >
                <div className="flex flex-col space-y-4">
                  <div className={`p-3 rounded-lg w-fit ${colorClass}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-body font-bold text-xl text-brand-navy">
                    {program.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {program.description}
                  </p>
                </div>
                
                <div className="pt-6 mt-auto">
                  <Link
                    href={program.link}
                    className={`inline-flex items-center text-sm font-semibold transition-colors duration-200 ${
                      program.accent === 'green' ? 'text-brand-green hover:underline' :
                      program.accent === 'orange' ? 'text-brand-orange hover:underline' :
                      program.accent === 'gold' ? 'text-brand-gold hover:underline' :
                      'text-brand-navy hover:underline'
                    }`}
                  >
                    Learn More →
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
