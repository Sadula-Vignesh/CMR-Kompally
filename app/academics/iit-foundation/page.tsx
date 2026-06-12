import React from 'react';
import type { Metadata } from 'next';
import { BookOpen, Award, CheckCircle, ChevronRight } from 'lucide-react';
import InnerHero from '@/components/ui/InnerHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'IIT Foundation Program',
  description: 'Explore our specialized IIT Foundation program for Middle and High School students preparing for engineering entrance exams.',
};

const SUBJECTS = [
  {
    name: "Mathematics",
    color: "border-brand-navy",
    topics: [
      "Algebraic Identities & Factorization",
      "Number Theory & Cryptology basics",
      "Coordinate Geometry & Straight lines",
      "Trigonometric Angles & Identities",
      "Mensuration & Geometrical Theorems"
    ]
  },
  {
    name: "Physics",
    color: "border-brand-orange",
    topics: [
      "Kinematics & Translational Motion",
      "Newtonian Mechanics & Force vectors",
      "Geometrical Optics, Lenses & Prisms",
      "Hydrostatics & Fluid principles",
      "Current Electricity & Magnetic Induction"
    ]
  },
  {
    name: "Chemistry",
    color: "border-brand-green",
    topics: [
      "Atomic Structures & Sub-atomic orbitals",
      "Periodic Properties & Valence configurations",
      "Chemical Bonding & Mole Concepts",
      "Stoichiometric Equations & Acids-Bases",
      "Basic Organic Chemistry & Hydrocarbons"
    ]
  }
];

const BENEFITS = [
  "Highly Qualified & Experienced IIT-JEE Faculty members",
  "Weekly assessment tests with instant feedback analytics",
  "Comprehensive, custom-curated study material booklets",
  "National-level Mock Exams and rank forecasting metrics",
  "Focus on building logical deduction & analytical problem solving"
];

export default function IITFoundationPage() {
  return (
    <>
      <InnerHero
        title="IIT Foundation Program"
        breadcrumbs={[
          { label: "Academics", href: "/academics" },
          { label: "IIT Foundation" }
        ]}
      />

      {/* Program Details */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <SectionHeading
                title="Early Advantage for Competitive Success"
                subtitle="JEE / Olympiad Preparation"
                align="left"
              />
              <p className="text-gray-700 leading-relaxed font-body">
                Our specialized **IIT Foundation Program** is designed for students in Grades VI through VIII. It goes beyond the normal CBSE syllabus, focusing on higher-level reasoning, analytical models, and fundamental formulas required for national competitive exams like IIT-JEE, NEET, NTSE, and SOF Olympiads.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed font-body">
                By reinforcing logical thinking and mathematical deduction early, we ensure that students do not face a learning gap when they enter High School. Our methods build speed, accuracy, and confidence.
              </p>
              
              <div className="pt-4">
                <Button href="/admissions" variant="orange" className="shadow-md">
                  Enquire Now for Admissions
                </Button>
              </div>
            </div>

            {/* Benefit Indicators */}
            <div className="lg:col-span-5 bg-brand-cream/60 border border-brand-gold/15 p-8 rounded-2xl">
              <h3 className="font-body font-bold text-xl text-brand-navy mb-4">
                Program Benefits
              </h3>
              <ul className="space-y-3">
                {BENEFITS.map((benefit, index) => (
                  <li key={index} className="flex gap-2.5 items-start text-xs md:text-sm text-gray-700 font-body">
                    <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Subjects and Topics Grid */}
      <section className="py-16 md:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Core Subjects Covered"
            subtitle="Foundation Curriculum"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SUBJECTS.map((sub, idx) => (
              <Card
                key={idx}
                className={`border-t-4 ${sub.color} bg-white flex flex-col justify-between`}
              >
                <div>
                  <h3 className="font-body font-bold text-xl text-brand-navy mb-6 text-center border-b border-gray-100 pb-3">
                    {sub.name}
                  </h3>
                  <ul className="space-y-3">
                    {sub.topics.map((topic, index) => (
                      <li key={index} className="flex gap-2 items-center text-xs md:text-sm text-gray-600 font-body">
                        <ChevronRight className="w-4 h-4 text-brand-orange shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
