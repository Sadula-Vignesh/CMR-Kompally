'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, CheckCircle2, ChevronRight, GraduationCap, Compass, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

const ACADEMIC_STAGES = [
  {
    id: 'pre-primary',
    name: "Pre-Primary",
    subtitle: "Age 3 - 5 Years (Nursery, LKG, UKG)",
    icon: Sparkles,
    color: "brand-green",
    description: "Our Pre-Primary program lays the vital foundation for a lifetime of structured learning. Utilizing Montessori-inspired playfields, sensory exploration, and interactive puzzles, we nurture a child's natural curiosity and cognitive capacity.",
    outcomes: [
      "Sensory & motor coordination development",
      "Foundational language phonics and mathematical numeracy",
      "Social-emotional collaborative play habits",
      "Creative expression through clay modeling, coloring, and singing"
    ],
    features: "Equipped with dedicated indoor activity centers and safe learning playscapes.",
    link: "/academics/curriculum#pre-primary"
  },
  {
    id: 'primary',
    name: "Primary School",
    subtitle: "Grades I - V (Age 6 - 10 Years)",
    icon: BookOpen,
    color: "brand-orange",
    description: "The Primary curriculum steps into inquiry-based, structured disciplines. We integrate core languages, mathematics, environmental studies, and digital smart classrooms to cultivate independent reading, logic, and self-confidence.",
    outcomes: [
      "Critical reading, creative composition, and public articulation",
      "Conceptual mathematical operations and logic modeling",
      "Scientific curiosity through basic mathematics and science lab experiments",
      "Bilingual speaking competency and primary values instruction"
    ],
    features: "Smartboard visual lessons, weekly storytelling hours, and basic computing classes.",
    link: "/academics/curriculum#primary"
  },
  {
    id: 'secondary',
    name: "Secondary School",
    subtitle: "Grades VI - VIII (Age 11 - 13 Years)",
    icon: Compass,
    color: "brand-navy",
    description: "Our Secondary curriculum challenges scholars to apply theoretical calculations to hands-on solutions. Science, Social Sciences, Advanced Mathematics, and Computing tracks prepare students for challenging high-school criteria.",
    outcomes: [
      "Practical experiment design in fully-equipped Science & Maths Labs",
      "Robotics training, block coding, and core engineering concepts in Computer Labs",
      "Analytical reading, research projects, and structured presentations",
      "Active team participation in inter-school Olympiads, chess, and football"
    ],
    features: "IIT Foundation training, weekly lab periods, and mandatory active club participation.",
    link: "/academics/curriculum#secondary"
  },
  {
    id: 'high-school',
    name: "IIT Foundation & Beyond",
    subtitle: "Integrated Core Prep",
    icon: GraduationCap,
    color: "brand-gold",
    description: "Designed for competitive excellence, our advanced IIT Foundation program integrates CBSE guidelines with analytical prep worksheets. This ensures scholars develop solid problem-solving metrics for regional and national engineering / medical exams.",
    outcomes: [
      "Advanced problem-solving skill drills in Physics, Chemistry, and Mathematics",
      "High-altitude spatial observations and astronomical theories in Space Lab",
      "Structured competitive coaching for SOF Olympiads, NTSE, and JEE foundations",
      "Leadership development, public debates, and community volunteer programs"
    ],
    features: "Subject-matter experts, advanced study modules, and mock evaluation systems.",
    link: "/academics/iit-foundation"
  }
];

export default function AcademicExcellence() {
  const [activeStage, setActiveStage] = useState('pre-primary');

  const stage = ACADEMIC_STAGES.find(s => s.id === activeStage)!;
  const StageIcon = stage.icon;

  return (
    <section className="bg-white py-24 md:py-32 relative overflow-hidden">
      <div className="absolute left-10 bottom-10 w-96 h-96 rounded-full bg-brand-green/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          title="The Educational Journey"
          subtitle="Academic Path"
          align="center"
        />

        {/* 1. Interactive Staged Timelines Menu */}
        <div className="relative flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-16 border-b border-slate-150/60 pb-6">
          {ACADEMIC_STAGES.map((s, idx) => {
            const isActive = s.id === activeStage;
            const IconComponent = s.icon;
            
            return (
              <button
                key={s.id}
                onClick={() => setActiveStage(s.id)}
                className="flex items-center gap-4 text-left px-5 py-4 rounded-2xl transition-all duration-300 focus:outline-none cursor-pointer flex-grow basis-0 select-none group"
              >
                {/* Number or Icon Indicator */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-brand-navy text-white shadow-md' 
                    : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-brand-navy'
                }`}>
                  <IconComponent className="w-5 h-5 stroke-[2]" />
                </div>

                <div className="flex flex-col">
                  <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${
                    isActive ? 'text-brand-orange' : 'text-slate-400 group-hover:text-slate-500'
                  }`}>
                    Stage 0{idx + 1}
                  </span>
                  <span className={`text-base font-bold font-display transition-colors duration-300 ${
                    isActive ? 'text-brand-navy' : 'text-slate-500 group-hover:text-brand-navy'
                  }`}>
                    {s.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 2. Immersive Content Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-brand-cream/35 border border-brand-gold/15 p-8 md:p-12 rounded-3xl"
          >
            {/* Left: Progression details */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <div className={`p-3.5 rounded-2xl bg-white text-brand-navy shadow-sm`}>
                  <StageIcon className={`w-7 h-7 stroke-[1.8] ${
                    stage.color === 'brand-green' ? 'text-brand-green' :
                    stage.color === 'brand-orange' ? 'text-brand-orange' :
                    stage.color === 'brand-navy' ? 'text-brand-navy' :
                    'text-brand-gold'
                  }`} />
                </div>

                <div className="flex flex-col">
                  <h3 className="font-display font-black text-2xl md:text-3xl text-brand-navy leading-none">
                    {stage.name} Curriculum
                  </h3>
                  <span className="text-slate-500 text-xs md:text-sm font-semibold tracking-wide mt-1.5 font-body">
                    {stage.subtitle}
                  </span>
                </div>
              </div>

              <p className="text-slate-650 text-sm md:text-base leading-relaxed font-body">
                {stage.description}
              </p>

              <div className="p-4 bg-white/70 backdrop-blur-xs rounded-xl border border-slate-100/50">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">Salient Features</span>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed font-body">{stage.features}</p>
              </div>

              <div className="pt-4">
                <Button
                  href={stage.link}
                  className={`px-8 py-3.5 flex gap-2 items-center text-sm font-bold shadow-md ${
                    stage.color === 'brand-green' ? 'bg-brand-green hover:bg-brand-green/95 hover:shadow-brand-green/20' :
                    stage.color === 'brand-orange' ? 'bg-brand-orange hover:bg-brand-orange/95 hover:shadow-brand-orange/20' :
                    stage.color === 'brand-navy' ? 'bg-brand-navy hover:bg-brand-navyLight hover:shadow-brand-navy/20' :
                    'bg-brand-gold hover:bg-brand-gold/90 hover:shadow-brand-gold/20'
                  }`}
                >
                  Learn About {stage.name}
                  <ChevronRight className="w-4.5 h-4.5" />
                </Button>
              </div>
            </div>

            {/* Right: Key student outcomes */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:border-l lg:border-slate-150/60 lg:pl-10">
              <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">
                Expected Outcomes
              </span>

              <div className="space-y-4">
                {stage.outcomes.map((outcome, oIdx) => (
                  <div key={oIdx} className="flex gap-3.5 items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3.5]" />
                    </div>
                    <span className="text-slate-650 text-sm leading-relaxed font-body font-medium">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
