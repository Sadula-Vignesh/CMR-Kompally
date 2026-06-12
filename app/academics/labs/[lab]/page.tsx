import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ShieldAlert, CheckSquare } from 'lucide-react';
import InnerHero from '@/components/ui/InnerHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import { LAB_PAGES } from '@/lib/constants';

interface LabPageProps {
  params: Promise<{ lab: string }>;
}

export async function generateStaticParams() {
  return [
    { lab: 'space' },
    { lab: 'science' },
    { lab: 'maths' },
    { lab: 'computer' }
  ];
}

export async function generateMetadata({ params }: LabPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const labKey = resolvedParams.lab;
  const data = LAB_PAGES[labKey as keyof typeof LAB_PAGES];
  
  if (!data) {
    return {
      title: 'Lab Facilities',
    };
  }

  return {
    title: `${data.title} Facilities`,
    description: `Explore the equipment, specifications, and curricular activities in the ${data.title} at CMR School Kompally.`,
  };
}

export default async function LabDetailsPage({ params }: LabPageProps) {
  const resolvedParams = await params;
  const labKey = resolvedParams.lab;
  const data = LAB_PAGES[labKey as keyof typeof LAB_PAGES];

  if (!data) {
    notFound();
  }

  const labImages = [
    { url: "/images/building_image.webp", title: `${data.title} Research Hub` },
    { url: "/images/computer_class.jpg", title: "Smart Interactive Desk" },
    { url: "/images/cmr_school.webp", title: "Campus Central" },
    { url: "/images/children.jpg", title: "Activities Center" }
  ];

  return (
    <>
      <InnerHero
        title={data.title}
        breadcrumbs={[
          { label: "Academics", href: "/academics" },
          { label: "Labs", href: "/academics#labs" },
          { label: data.title }
        ]}
      />

      {/* Lab Details */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Description & Safety */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <SectionHeading
                title={`Advanced ${data.title}`}
                subtitle="Facility Overview"
                align="left"
              />
              
              <p className="text-gray-705 leading-relaxed font-body">
                {data.description}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed font-body">
                Practical hours are integrated with the daily academic scheduler. Under the strict supervision of subject coordinators and instructors, students complete project assemblies, chemical observations, arithmetic theorems testing, or computing projects matching the CBSE curriculum framework.
              </p>

              {/* Safety notice for Science / general labs */}
              <div className="bg-brand-cream/50 border border-brand-gold/20 p-5 rounded-xl flex gap-3 items-start">
                <ShieldAlert className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-body font-bold text-sm text-brand-navy">Safety and Guidelines</h4>
                  <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                    Safety aprons, digital smoke alarms, emergency aid boxes, and strict lab protocols are enforced across all laboratory halls.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Equipment Checklist */}
            <div className="lg:col-span-5 bg-brand-cream/40 border border-brand-navy/10 p-8 rounded-2xl">
              <h3 className="font-body font-bold text-xl text-brand-navy mb-6">
                Equipment & Inventory
              </h3>
              <ul className="space-y-4">
                {data.equipment.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm text-gray-700 font-body">
                    <CheckSquare className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Lab Photos Placeholder Grid */}
      <section className="py-16 bg-brand-cream/50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Lab Environments"
            subtitle="Explore Campus"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {labImages.map((img, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden shadow-sm h-48 group">
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors" />
                <span className="absolute bottom-4 left-4 text-xs font-semibold text-white z-10">
                  {img.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
