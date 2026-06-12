import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Compass, Award, Lightbulb, GraduationCap, CheckCircle } from 'lucide-react';
import InnerHero from '@/components/ui/InnerHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Academic Programs',
  description: 'Discover the academic pathways, CBSE curriculum, and educational methodology at CMR School Kompally.',
};

const PROGRAMS = [
  {
    name: "Pre-Primary",
    desc: "Interactive, play-based learning designed to foster motor skills, social habits, and fundamental numbers/letters concepts.",
    link: "/academics/curriculum"
  },
  {
    name: "Primary School",
    desc: "Rigorous focus on core languages, mathematics, environment study, arts, physical conditioning, and personal expression.",
    link: "/academics/curriculum"
  },
  {
    name: "Secondary School",
    desc: "CBSE aligned courses focusing on analytical science, advanced math, social sciences, digital skills, and second language options.",
    link: "/academics/curriculum"
  },
  {
    name: "High School Prep",
    desc: "Intensive training for board exams alongside targeted guidance for competitive exams like JEE/NEET and Olympiads.",
    link: "/academics/curriculum"
  }
];

const PILLARS = [
  {
    title: "Conceptual Learning",
    desc: "Bypassing rote memorization by using physical models, charts, and interactive classroom experiments to teach core concepts."
  },
  {
    title: "Practical Application",
    desc: "Hands-on projects inside our specialized labs (Space, Science, Maths, Computer) to bridge theory and physical practice."
  },
  {
    title: "Critical Thinking",
    desc: "Challenging students with mathematical puzzles, scientific reasoning questions, and debating forums to construct logical thoughts."
  }
];

export default function AcademicsOverviewPage() {
  return (
    <>
      <InnerHero
        title="Academic Excellence"
        breadcrumbs={[{ label: "Academics" }]}
      />

      {/* Curriculum Intro & CBSE */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <SectionHeading
                title="Rigorous CBSE Framework"
                subtitle="Curriculum Standards"
                align="left"
              />
              <p className="text-gray-700 leading-relaxed font-body">
                CMR School Kompally is affiliated with the Central Board of Secondary Education (CBSE), the premier educational board in India. Our learning guidelines follow the National Curriculum Framework (NCF), emphasizing formative evaluations, logical sciences, and multi-lingual proficiency.
              </p>
              
              <div className="space-y-3 pt-2">
                <span className="flex items-center gap-2.5 text-sm font-semibold text-brand-navy font-body">
                  <CheckCircle className="w-5 h-5 text-brand-green shrink-0" />
                  CBSE Affiliation and Formative Continuous Assessment
                </span>
                <span className="flex items-center gap-2.5 text-sm font-semibold text-brand-navy font-body">
                  <CheckCircle className="w-5 h-5 text-brand-green shrink-0" />
                  National Curriculum Framework (NCF) Standard textbooks
                </span>
                <span className="flex items-center gap-2.5 text-sm font-semibold text-brand-navy font-body">
                  <CheckCircle className="w-5 h-5 text-brand-green shrink-0" />
                  Integration of STEAM models and innovation lab hours
                </span>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/academics/curriculum" className="px-5 py-2.5 bg-brand-orange text-white rounded-lg hover:opacity-90 font-semibold text-sm transition-opacity">
                  View Detailed Curriculum
                </Link>
                <Link href="/academics/iit-foundation" className="px-5 py-2.5 bg-brand-navy text-white hover:bg-brand-navyLight rounded-lg font-semibold text-sm transition-colors">
                  IIT Foundation Program
                </Link>
              </div>
            </div>

            {/* Visual Panel */}
            <div className="lg:col-span-5 h-[320px] relative rounded-xl shadow-md p-8 text-white flex flex-col justify-between overflow-hidden">
              <Image
                src="/images/building_image.webp"
                alt="Interactive Laboratories"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/75 to-transparent z-0" />
              <div className="relative z-10">
                <span className="text-xs text-brand-gold font-bold uppercase tracking-wider">Lab Innovations</span>
                <h4 className="text-2xl font-display font-bold mt-2 mb-4 leading-tight">Interactive Laboratories</h4>
                <p className="text-gray-200 text-xs leading-relaxed">
                  We integrate conceptual topics with practical experiments in physics, chemistry, biology, math, astronomy, and robotics.
                </p>
              </div>
              <Link href="/academics/labs/space" className="text-xs text-brand-gold font-semibold hover:underline mt-4 z-10 block relative">
                Explore Our Space Lab →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Program levels */}
      <section className="py-16 md:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Academic Levels We Offer"
            subtitle="Curriculum Pathways"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROGRAMS.map((prog, idx) => (
              <Card key={idx} className="bg-white border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="font-body font-bold text-xl text-brand-navy mb-3">
                    {prog.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {prog.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-50">
                  <Link href={prog.link} className="text-brand-orange text-xs font-semibold hover:underline">
                    Learn More Curriculum Details →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Pedagogy Approach"
            subtitle="Three Pillars"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((p, idx) => (
              <div
                key={idx}
                className="flex flex-col space-y-4 p-6 border border-gray-100 rounded-xl hover:-translate-y-1 transition-all duration-300 hover:shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-display font-bold text-lg">
                  {idx + 1}
                </div>
                <h3 className="font-body font-bold text-lg text-brand-navy">
                  {p.title}
                </h3>
                <p className="text-gray-655 text-xs md:text-sm leading-relaxed font-body">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
