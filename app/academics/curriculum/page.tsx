import React from 'react';
import type { Metadata } from 'next';
import InnerHero from '@/components/ui/InnerHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'School Curriculum',
  description: 'Explore the academic syllabus, grade structure, and subject details matching CBSE standards at CMR School Kompally.',
};

const CURRICULUMS = [
  {
    level: "Pre-Primary",
    grades: "Nursery, PP1, PP2",
    subjects: "English Phonics, Number Work, General Awareness, Creative Art, Rhymes & Storytelling",
    pedagogy: "Play-Way Method & Montessori concepts. Focus on motor skills, hand-eye coordination, and sensory integration."
  },
  {
    level: "Primary School",
    grades: "Grade I to Grade IV",
    subjects: "English, Mathematics, Environmental Science (EVS), Hindi/Telugu (Second Language), Digital Literacy, Arts & Craft",
    pedagogy: "Activity-oriented conceptual learning. Building numeric foundation, reading habits, and curiosity about physical environments."
  },
  {
    level: "Secondary School",
    grades: "Grade V to Grade VII",
    subjects: "English Literature, Mathematics, Physics, Chemistry, Biology, Social Sciences (History, Civics, Geography), Hindi/Telugu, Sanskrit (Introductory), Computer Science",
    pedagogy: "Project-Based Learning and science labs exploration. Strengthening logical deduction, scientific inquiry, and language communication."
  },
  {
    level: "High School Prep",
    grades: "Grade VIII onwards",
    subjects: "CBSE aligned Advanced Mathematics, Science, Social Sciences, English Language, Second Language, Robotics & AI basics",
    pedagogy: "Structured Board Exam preparation integrated with mock papers and competitive exam foundation courses (JEE/NEET)."
  }
];

export default function CurriculumPage() {
  return (
    <>
      <InnerHero
        title="Our Curriculum"
        breadcrumbs={[
          { label: "Academics", href: "/academics" },
          { label: "Curriculum" }
        ]}
      />

      {/* Curriculum standards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            title="Syllabus & Subject Mapping"
            subtitle="CBSE Standardized"
            align="center"
          />

          {/* Responsive Table for Desktop, Cards for Mobile */}
          <div className="hidden lg:block overflow-x-auto shadow-md rounded-xl border border-gray-100">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-brand-navy text-white text-sm">
                  <th className="p-4 font-bold border-r border-white/10">Academic Level</th>
                  <th className="p-4 font-bold border-r border-white/10">Grades</th>
                  <th className="p-4 font-bold border-r border-white/10">Key Subjects</th>
                  <th className="p-4 font-bold">Pedagogical Methods</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-sm text-gray-700 font-body">
                {CURRICULUMS.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-brand-cream/30'}>
                    <td className="p-4 font-bold text-brand-navy border-r border-gray-100">{item.level}</td>
                    <td className="p-4 font-semibold text-brand-orange border-r border-gray-100">{item.grades}</td>
                    <td className="p-4 leading-relaxed border-r border-gray-100 max-w-[280px]">{item.subjects}</td>
                    <td className="p-4 leading-relaxed max-w-[340px] text-xs text-gray-600">{item.pedagogy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards Layout for Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
            {CURRICULUMS.map((item, idx) => (
              <Card key={idx} className="flex flex-col space-y-3 p-6 border border-gray-100">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="font-body font-bold text-lg text-brand-navy">{item.level}</span>
                  <span className="text-brand-orange text-xs font-semibold">{item.grades}</span>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase">Subjects:</h4>
                  <p className="text-xs text-gray-750 font-body mt-1 leading-relaxed">{item.subjects}</p>
                </div>
                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase">Pedagogy:</h4>
                  <p className="text-xs text-gray-600 font-body mt-1 leading-relaxed">{item.pedagogy}</p>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Pedagogical Approach */}
      <section className="py-16 md:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Active Learning Framework"
            subtitle="Our Pedagogy"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white">
              <h4 className="font-body font-bold text-lg text-brand-navy mb-2">Formative Assessment</h4>
              <p className="text-gray-650 text-xs md:text-sm leading-relaxed">
                Rather than evaluating students solely via year-end exams, we follow CBSE's Continuous and Comprehensive Evaluation (CCE) method. This measures project portfolios, class work, speech debates, and analytical quizzes.
              </p>
            </Card>

            <Card className="bg-white">
              <h4 className="font-body font-bold text-lg text-brand-navy mb-2">Interdisciplinary STEAM</h4>
              <p className="text-gray-650 text-xs md:text-sm leading-relaxed">
                Science, Technology, Engineering, Arts, and Mathematics (STEAM) are blended. For example, algebra equations are visualized via computer scripts, and physics parameters are tested through model building.
              </p>
            </Card>

            <Card className="bg-white">
              <h4 className="font-body font-bold text-lg text-brand-navy mb-2">Life Skills Integration</h4>
              <p className="text-gray-650 text-xs md:text-sm leading-relaxed">
                Leadership, public speaking, self-awareness, and environmental conservation topics are embedded directly in languages and environmental study programs, preparing scholars for responsible citizenship.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
