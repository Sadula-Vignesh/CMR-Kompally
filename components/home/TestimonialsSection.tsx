import React from 'react';
import { Star } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { TESTIMONIALS } from '@/lib/constants';

export default function TestimonialsSection() {
  return (
    <section className="bg-[#101F4C] py-16 md:py-24 text-white relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gold/30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Parents Say"
          subtitle="Testimonials"
          align="center"
          light={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-brand-cream text-brand-navy rounded-xl p-8 shadow-md border border-brand-gold/20 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 relative group"
            >
              {/* Decorative Quote Mark */}
              <span className="absolute top-4 right-6 text-7xl font-serif text-brand-gold/20 select-none pointer-events-none group-hover:text-brand-gold/30 transition-colors">
                “
              </span>

              <div className="flex flex-col space-y-4">
                {/* Stars */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-gray-700 italic text-sm md:text-base leading-relaxed font-body">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author details */}
              <div className="pt-6 mt-6 border-t border-brand-navy/10 flex flex-col">
                <span className="font-body font-bold text-base text-brand-navy">
                  {testimonial.name}
                </span>
                <span className="text-brand-orange text-xs font-semibold uppercase tracking-wider mt-0.5">
                  {testimonial.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
