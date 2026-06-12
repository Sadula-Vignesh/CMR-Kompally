import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle, Trophy, Sparkles } from 'lucide-react';
import InnerHero from '@/components/ui/InnerHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CO_CURRICULAR_ACTIVITIES } from '@/lib/constants';

interface ActivityPageProps {
  params: Promise<{ activity: string }>;
}

export async function generateStaticParams() {
  return CO_CURRICULAR_ACTIVITIES.map(act => ({
    activity: act.slug
  }));
}

export async function generateMetadata({ params }: ActivityPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.activity;
  const act = CO_CURRICULAR_ACTIVITIES.find(a => a.slug === slug);
  
  if (!act) {
    return {
      title: 'Co-Curricular Clubs',
    };
  }

  return {
    title: `${act.name} Club`,
    description: `Learn about our student participation, benefits, and achievements in the ${act.name} program at CMR School Kompally.`,
  };
}

export default async function ActivityDetailsPage({ params }: ActivityPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.activity;
  const act = CO_CURRICULAR_ACTIVITIES.find(a => a.slug === slug);

  if (!act) {
    notFound();
  }

  const activityImages = [
    { url: "/images/children.jpg", title: "Practice Ground" },
    { url: "/images/computer_class.jpg", title: "Student Club Hub" },
    { url: "/images/cmr_school.webp", title: "Campus Courtyard" },
    { url: "/images/building_image.webp", title: "Activity Lab Room" }
  ];

  return (
    <>
      <InnerHero
        title={`${act.name} Program`}
        breadcrumbs={[
          { label: "Co-Curricular", href: "/co-curricular" },
          { label: act.name }
        ]}
      />

      {/* Main Details */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Description & Highlights */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <SectionHeading
                title={`About ${act.name}`}
                subtitle="Club & Activity details"
                align="left"
              />
              
              <div className="text-gray-700 space-y-4 text-sm md:text-base leading-relaxed font-body">
                <p>
                  {act.description}
                </p>
                <p>
                  At CMR School Kompally, the {act.name} program is designed to develop practical mastery and long-term interest. Club sessions are held during regular school hours and special practice slots under the tutelage of expert coaches.
                </p>
                <p>
                  Students learn not only the technical rules and strategies but also the importance of respect, cooperation, and sporting code conduct. Periodic intra-house challenges and city level inter-school registrations are arranged to expose scholars to competitive settings.
                </p>
              </div>

              {/* Achievements banner */}
              <div className="bg-brand-cream/50 border border-brand-gold/20 p-5 rounded-xl flex gap-3 items-center">
                <Trophy className="w-6 h-6 text-brand-orange shrink-0" />
                <div>
                  <h4 className="font-body font-bold text-sm text-brand-navy">Club Highlight</h4>
                  <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{act.achievements}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Benefits Checklist */}
            <div className="lg:col-span-5 bg-brand-cream/40 border border-brand-navy/15 p-8 rounded-2xl flex flex-col justify-between h-fit">
              <div>
                <h3 className="font-body font-bold text-xl text-brand-navy mb-6">
                  Key Benefits & Growth
                </h3>
                <ul className="space-y-4 mb-8">
                  {act.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm text-gray-700 font-body">
                      <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button href="/admissions" variant="orange" className="w-full text-sm py-3 justify-center shadow-md">
                Register for this Activity
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* Photo Placeholders Grid */}
      <section className="py-16 bg-brand-cream/40 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`${act.name} Gallery`}
            subtitle="Campus Moments"
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activityImages.map((img, idx) => (
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
