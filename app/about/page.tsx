import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import InnerHero from '@/components/ui/InnerHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import { Award, ShieldCheck, Cpu, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Our School',
  description: 'Learn about the history, vision, and mission of CMR School Kompally - one of Hyderabad’s most trusted CBSE schools.',
};

const VALUES = [
  { icon: Award, title: "Excellence", desc: "Striving for the highest academic and co-curricular standards in all our achievements." },
  { icon: ShieldCheck, title: "Integrity", desc: "Instilling deep ethical principles, accountability, and strong character in scholars." },
  { icon: Cpu, title: "Innovation", desc: "Embracing technology and creative problem-solving methods in everyday classrooms." },
  { icon: Heart, title: "Care", desc: "Nurturing emotional safety, self-expression, and general physical wellbeing." },
];

const PREVIEWS = [
  { url: "/images/cmr_school.webp", title: "Lush Green Campus" },
  { url: "/images/computer_class.jpg", title: "Smart Digital Classrooms" },
  { url: "/images/building_image.webp", title: "State-of-the-Art Space Lab" },
  { url: "/images/children.jpg", title: "Outdoor Sports Arena" }
];

export default function AboutPage() {
  return (
    <>
      <InnerHero
        title="About CMR School Kompally"
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* Story, Vision, Mission */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <SectionHeading
                title="Our Story"
                subtitle="Who We Are"
                align="left"
              />
              <p className="text-gray-700 leading-relaxed font-body">
                Founded with a vision to provide quality education, CMR School Kompally has grown into one of Hyderabad's most trusted CBSE institutions. Located in the rapidly developing Kompally area, we serve hundreds of families with a commitment to excellence.
              </p>
              <p className="text-gray-650 text-sm leading-relaxed font-body">
                We focus on integrating cognitive skill growth with hands-on practice, empowering students to adapt, learn, and grow in a fast-changing global society. Our balanced academic guidelines ensure that children emerge as well-rounded leaders.
              </p>
            </div>
            {/* Visual Image Panel */}
            <div className="lg:col-span-5 h-[300px] relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/images/cmr_school.webp"
                alt="CMR School Campus"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          <div id="features" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-brand-orange">
              <h3 className="font-display font-bold text-xl text-brand-navy mb-3">Our Vision</h3>
              <p className="text-gray-650 text-sm leading-relaxed">
                To be the leading institution that nurtures every child's potential through innovative teaching, state-of-the-art facilities, and a caring environment.
              </p>
            </Card>
            <Card className="border-l-4 border-brand-green">
              <h3 className="font-display font-bold text-xl text-brand-navy mb-3">Our Mission</h3>
              <p className="text-gray-650 text-sm leading-relaxed">
                To provide holistic education that develops intellectual, physical, emotional, and social skills, preparing students for a rapidly changing global society.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Core Pillars of CMR"
            subtitle="Our Values"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <Card key={idx} className="bg-white flex flex-col items-center text-center p-6">
                  <div className="p-3 bg-brand-navy/10 text-brand-navy rounded-full mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="font-body font-bold text-lg text-brand-navy mb-2">{val.title}</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">{val.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Gallery Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Campus in Action"
            subtitle="Campus Preview"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PREVIEWS.map((preview, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden shadow-sm h-48 group">
                <Image
                  src={preview.url}
                  alt={preview.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />
                <span className="absolute bottom-4 left-4 text-xs font-semibold text-white z-10">
                  {preview.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
