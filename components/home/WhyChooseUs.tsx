import React from 'react';
import { Award, BookOpen, Cpu, Shield, Users2, Trophy } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';

const FEATURES = [
  {
    icon: BookOpen,
    title: "CBSE Curriculum",
    description: "Nationally recognized board with strong academic foundation preparing students for competitive excellence."
  },
  {
    icon: Users2,
    title: "Expert Faculty",
    description: "Highly qualified and experienced teaching professionals committed to personalized student growth."
  },
  {
    icon: Cpu,
    title: "Digital Classrooms",
    description: "Equipped with smart boards and integrated technology to visualize complex scientific concepts."
  },
  {
    icon: Trophy,
    title: "Sports Excellence",
    description: "A 5-acre campus with fully-enabled outdoor playfields and professional training sessions."
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Comprehensive CCTV surveillance, security personnel, and safe commute measures for every student."
  },
  {
    icon: Award,
    title: "Holistic Development",
    description: "Equal emphasis on rigorous academics, creative fine arts, physical sports, and primary life skills."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-cream py-16 md:py-24 bg-grid-pattern relative overflow-hidden">
      {/* Decorative soft glowing backdrops */}
      <div className="absolute -right-24 -bottom-24 w-[350px] h-[350px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute -left-24 -top-24 w-[350px] h-[350px] bg-brand-green/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Why Parents Choose CMR"
          subtitle="Our Strengths"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <Card key={idx} className="flex gap-4 p-6 items-start bg-white/85 backdrop-blur-xs shadow-xs hover:shadow-md transition-all duration-300">
                <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-lg shrink-0">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="flex flex-col space-y-1">
                  <h3 className="font-body font-bold text-lg text-brand-navy">
                    {feat.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-body">
                    {feat.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
