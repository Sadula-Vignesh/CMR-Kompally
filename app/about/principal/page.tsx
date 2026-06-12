import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import InnerHero from '@/components/ui/InnerHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: "Principal's Desk",
  description: "Read the welcoming message from our Principal, Mrs. B. Uma Devi Sharma, detailing our academic philosophy and commitment.",
};

export default function PrincipalPage() {
  return (
    <>
      <InnerHero
        title="Principal's Desk"
        breadcrumbs={[
          { label: "About Us", href: "/about" },
          { label: "Principal's Desk" }
        ]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Portrait Placement */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4 lg:sticky lg:top-28">
              <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-brand-navy via-brand-navyLight to-brand-gold shadow-md relative overflow-hidden p-1">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                  <Image
                    src="/images/principal.webp"
                    alt="Mrs. B. Uma Devi Sharma - Principal"
                    fill
                    sizes="(max-width: 768px) 224px, 224px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div>
                <h3 className="font-body font-bold text-xl text-brand-navy">Mrs. B. Uma Devi Sharma</h3>
                <p className="text-brand-orange text-xs font-semibold uppercase tracking-wider mt-0.5">Principal</p>
                <p className="text-gray-500 text-[10px] mt-1 font-body">M.A., M.Ed., Ph.D (hc) in Education</p>
              </div>
            </div>

            {/* Right Column: Message */}
            <div className="lg:col-span-8 flex flex-col space-y-8">
              <div className="border-l-4 border-brand-gold pl-6">
                <blockquote className="font-display italic text-xl md:text-2xl text-brand-navyLight leading-relaxed">
                  "Education is not the filling of a pail, but the lighting of a fire."
                </blockquote>
              </div>

              <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed font-body">
                <p>
                  Dear Parents and Students,
                </p>
                <p>
                  Welcome to CMR School Kompally. It is my privilege to lead this institution of excellence where we believe every child is unique and has immense potential. Our dedicated team of educators works tirelessly to provide an environment that nurtures curiosity, creativity, and character.
                </p>
                <p>
                  We are committed to academic excellence while ensuring the holistic development of each student — preparing them not just for examinations, but for life. The rapid advancement of technology demands that our children are not only literate but also critical thinkers and collaborative problem solvers.
                </p>
                <p>
                  We strive to maintain a warm, welcoming community environment where children feel secure and empowered. Through our advanced science labs, specialized Space Lab, interactive digital classrooms, and vibrant sports clubs, we ensure that every student discovers their path of interest.
                </p>
                <p>
                  I invite you to explore our campus and partner with us in this beautiful journey of learning and growth.
                </p>
                <p className="pt-4 font-bold text-brand-navy">
                  Warm regards,<br />
                  Mrs. B. Uma Devi Sharma<br />
                  Principal, CMR School Kompally
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
