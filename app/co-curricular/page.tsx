import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Music, Palette, Crown, Flame, CircleDot, ShieldAlert, Target, Zap, Share2, Activity, Wind, Heart } from 'lucide-react';
import InnerHero from '@/components/ui/InnerHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import { CO_CURRICULAR_ACTIVITIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Co-Curricular Activities',
  description: 'Explore the clubs, fine arts classes, and indoor/outdoor sports available at CMR School Kompally.',
};

const ICONS = {
  Sparkles: Sparkles,
  Music: Music,
  Palette: Palette,
  Crown: Crown,
  Flame: Flame,
  CircleDot: CircleDot,
  ShieldAlert: ShieldAlert,
  Target: Target,
  Zap: Zap,
  Share2: Share2,
  Activity: Activity,
  Wind: Wind,
};

export default function CoCurricularPage() {
  const artsAndCulture = CO_CURRICULAR_ACTIVITIES.filter(act => act.category === "Arts & Culture");
  const sports = CO_CURRICULAR_ACTIVITIES.filter(act => act.category === "Indoor Sports" || act.category === "Outdoor Sports");

  return (
    <>
      <InnerHero
        title="Co-Curricular Activities"
        breadcrumbs={[{ label: "Co-Curricular" }]}
      />

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Beyond Academics"
            subtitle="Holistic Growth"
            align="center"
          />
          <p className="text-gray-700 leading-relaxed font-body mt-4">
            At CMR School Kompally, we believe that academic excellence is best supported by a rich, active co-curricular schedule. Our students are encouraged to participate in creative, strategic, and physical sports, discovering their innate talents and building primary life skills like cooperation, leadership, and emotional resilience.
          </p>
        </div>
      </section>

      {/* Arts & Culture */}
      <section className="py-16 bg-brand-cream border-t border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Fine Arts & Creative Clubs"
            subtitle="Arts & Culture"
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artsAndCulture.map((act) => {
              const IconComponent = ICONS[act.icon as keyof typeof ICONS] || Heart;
              return (
                <Card key={act.slug} className="bg-white flex flex-col justify-between border-t-4 border-brand-orange h-full">
                  <div className="flex flex-col space-y-4">
                    <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-lg w-fit">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-body font-bold text-xl text-brand-navy">{act.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{act.description}</p>
                  </div>
                  <div className="pt-6 mt-auto">
                    <Link href={`/co-curricular/${act.slug}`} className="text-brand-orange text-xs font-semibold hover:underline">
                      Explore Activity details →
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sports Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Physical Fitness & Sports"
            subtitle="Indoor & Outdoor Athletics"
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sports.map((act) => {
              const IconComponent = ICONS[act.icon as keyof typeof ICONS] || Heart;
              return (
                <Card key={act.slug} className="bg-white flex flex-col justify-between border-t-4 border-brand-navy h-full">
                  <div className="flex flex-col space-y-4">
                    <div className="p-3 bg-brand-navy/10 text-brand-navy rounded-lg w-fit flex items-center gap-2">
                      <IconComponent className="w-6 h-6" />
                      <span className="text-[10px] text-gray-500 font-semibold uppercase">{act.category}</span>
                    </div>
                    <h3 className="font-body font-bold text-xl text-brand-navy">{act.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{act.description}</p>
                  </div>
                  <div className="pt-6 mt-auto">
                    <Link href={`/co-curricular/${act.slug}`} className="text-brand-navy hover:text-brand-navyLight text-xs font-semibold hover:underline">
                      Explore Activity details →
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
