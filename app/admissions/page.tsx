import React from 'react';
import type { Metadata } from 'next';
import { Calendar, CheckSquare, Phone, Mail, Clock } from 'lucide-react';
import InnerHero from '@/components/ui/InnerHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import AdmissionsForm from '@/components/admissions/AdmissionsForm';
import { SCHOOL_PHONE, SCHOOL_EMAIL, SCHOOL_TIMINGS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Admissions 2026-27',
  description: 'Learn about the admissions criteria, timeline steps, list of documents, and submit your online registration application.',
};

const STEPS = [
  {
    num: "01",
    title: "Submit Enquiry Form",
    desc: "Fill out the online application form here or visit the school office to submit the paper enquiry card."
  },
  {
    num: "02",
    title: "Document Verification",
    desc: "Bring photocopies of your child's birth certificate, Aadhar, passport photos, and past class report cards."
  },
  {
    num: "03",
    title: "Interaction & Assessment",
    desc: "A brief conversational interaction with the student and parents to map primary skill levels."
  },
  {
    num: "04",
    title: "Admission Confirmation",
    desc: "Upon evaluation and fee payment approval, secure your child's seat and complete the profile details."
  }
];

const DOCUMENTS = [
  "Original Birth Certificate (+ 1 copy)",
  "Student's Aadhar Card photocopy",
  "Parents' Aadhar Card photocopies",
  "4 Passport size photographs of the child",
  "Previous Class Report Card (for Grade II onwards)",
  "Transfer Certificate (TC) signed by past block education officer"
];

export default function AdmissionsPage() {
  return (
    <>
      <InnerHero
        title="Admissions 2026-27"
        breadcrumbs={[{ label: "Admissions" }]}
      />

      {/* Now Accepting Banner */}
      <section className="bg-brand-orange text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 font-body">
          <div>
            <h2 className="font-bold text-lg md:text-xl">Admissions are Open for Session 2026-27!</h2>
            <p className="text-xs text-orange-100">Grades Nursery through Grade VIII. Enrol today to secure a seat.</p>
          </div>
          <span className="px-4 py-1.5 bg-white text-brand-orange font-bold text-xs uppercase rounded-full shadow-sm">
            Nursery - Grade VIII
          </span>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 md:py-24 bg-white font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            title="Our Admissions Process"
            subtitle="Four Simple Steps"
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-brand-cream/35 border border-brand-gold/15 p-6 rounded-xl flex flex-col items-start hover:-translate-y-1 transition-all duration-300 hover:border-brand-gold"
              >
                <span className="text-4xl font-display font-bold text-brand-goldLight select-none mb-4">
                  {step.num}
                </span>
                <h3 className="font-body font-bold text-lg text-brand-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-650 text-xs md:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist and Form */}
      <section className="py-16 md:py-24 bg-brand-cream/50 border-t border-b border-gray-150 font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Documents & Contacts */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              <div>
                <SectionHeading
                  title="Required Documents"
                  subtitle="Verification Checklist"
                  align="left"
                />
                <p className="text-gray-755 text-sm leading-relaxed mb-6 font-body">
                  Please keep physical copies of the following checklist ready during your scheduled visit to the school office:
                </p>
                <ul className="space-y-3">
                  {DOCUMENTS.map((doc, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm text-gray-700 font-body">
                      <CheckSquare className="w-4.5 h-4.5 text-brand-orange shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact card */}
              <Card className="bg-brand-navy text-white p-6 border-t-4 border-brand-gold">
                <h3 className="font-body font-bold text-lg text-white mb-4">Admissions Desk</h3>
                <div className="space-y-3 text-xs md:text-sm text-gray-300">
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-gold" />
                    {SCHOOL_PHONE}
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-gold" />
                    {SCHOOL_EMAIL}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-gold" />
                    {SCHOOL_TIMINGS}
                  </span>
                </div>
              </Card>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              <AdmissionsForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
