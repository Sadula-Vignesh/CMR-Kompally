import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import InnerHero from '@/components/ui/InnerHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Management Team & Messages',
  description: 'Read the inspiring messages from the CMR Group leadership driving educational excellence in Hyderabad.',
};

const LEADERS = [
  {
    name: "Sri Ch. Malla Reddy Garu",
    role: "Founder Chairman, MRGI",
    title: "Chairman's Message",
    image: "/images/malla_reddy.webp",
    paragraphs: [
      "It's a moment of great pleasure and privilege to welcome all the parents and students of CMR School Kompally. I ensure that the school will be a place of joyful learning for all the young minds.",
      "The student's inquisitiveness for learning is nurtured here and nourished with the modern day teaching technologies.",
      "CMR School Kompally aligns the discipline of its student's life with utmost care and concern. It caters to the learning of perfect humanity with respect, integrity and compassion.",
      "The School Facilitates a unique Roadmap for enquiring Journey of knowledge. We discover the student's inner talents and groom them to become splendid global humans.",
      "I proclaim to provide all the necessary comfort towards the happy learning of the young lads."
    ]
  },
  {
    name: "Sri Ch. Mahender Reddy",
    role: "Secretary, MRGI",
    title: "Secretary's Message",
    image: "/images/mahender_reddy.webp",
    paragraphs: [
      "CMR GROUP provides a warm, caring, stimulating and challenging environment in which our students learn and develop. We aim to provide an education which explores and strengthens the potential which is innate in every individual but awaiting expression. In order to do so, we seek to provide an environment which enriches the intellectual, spiritual, emotional and physical development of the pupil in an atmosphere that is happy and nurturing. Emphasis is thus placed on promoting personal achievement, building a sense of responsibility and ultimately securing a strong sense of self-reliance.",
      "We live today in a world that is so very different from the one we grew up in, the one we were educated in. The world today is changing at such an accelerated rate and we as educators need to pause and reflect on this entire system of Education. CMR schools are well equipped to prepare the children of present generation to face the challenges that the future holds."
    ]
  },
  {
    name: "Dr. Ch. Bhadra Reddy",
    role: "Joint Secretary, MRGI",
    title: "Joint Secretary's Message",
    image: "/images/bhadra_reddy.webp",
    paragraphs: [
      "Our institution is a living place that shapes children's lives and builds their character. I believe that, to assess the school's performance only by its high academic scores is not sufficient, it is equally important for a school to be a place for happy children with a love for learning and sound value system.",
      "To achieve these objectives the heads of different branches work jointly with the parents and students to create a climate for open exchange of views and experiences, supporting each other's quest for quality on all fronts."
    ]
  },
  {
    name: "Mrs. P. Snithija Reddy",
    role: "Director, CMR School Kompally",
    title: "Director's Message",
    image: "/images/snithija_reddy.webp",
    paragraphs: [
      "\"We do no great things, only small things with great love.\" These words of Mother Teresa echo our humble effort towards the noble endeavour of education. I am privileged to share this vision & strive for its realization, to ensure a better tomorrow.",
      "Education is not mere accumulation of facts; it is preparation of life itself. Education is knowledge imbued with wisdom and ethics. It develops the personality of the students, moulds their character and develops mental skills to help them cope with problems and challenges of the complex world of today. One of the most significant aim is to make them successful not only in life, but also conscious of their duties and responsibilities towards their fellow citizens.",
      "The aim of our school is to promote a system of integral education in child-friendly environment that emphasizes the unity of all knowledge, synthesizes humanity and sciences and recognizes the fact that each child is unique. I believe that education should enable the students to soar high – morally, socially and spiritually. My believe is that our students need to learn that the secret of success and contentment lies in discovering one's own strengths as well as limitations. There is, therefore, every reason to place a renewed emphasis on the humanistic dimensions of education, enabling each person to grasp and appreciate the individuality of others, and to discover one's own self through an inner journey whose milestones are knowledge and humility."
    ]
  },
  {
    name: "Dr. Anuradha",
    role: "Dean, MRGI",
    title: "Dean's Message",
    image: "/images/anuradha_dean.webp",
    paragraphs: [
      "Dear Parents, Students, and Faculty,",
      "As the Dean of MRGI, it gives me immense pleasure to extend a warm welcome to all of you to CMR School Kompally. At CMR, we believe in nurturing young minds and fostering a holistic learning environment that empowers students to excel academically, socially, and personally.",
      "Our commitment to providing quality education is unwavering, and we strive to create an atmosphere where students feel supported, challenged, and inspired to reach their full potential. With a dedicated faculty, state-of-the-art facilities, and a comprehensive curriculum, we aim to equip our students with the skills, knowledge, and values they need to thrive in an ever-changing world.",
      "As we embark on this journey together, I encourage you to make the most of the opportunities available at CMR School Kompally. Whether it's through academic pursuits, extracurricular activities, or community engagement initiatives, let us work together to create a vibrant learning community where every student can shine.",
      "I look forward to seeing our students grow, learn, and succeed during their time at CMR School Kompally. Thank you for choosing us as your partner in education."
    ]
  }
];

export default function ManagementPage() {
  return (
    <>
      <InnerHero
        title="Management Team & Messages"
        breadcrumbs={[
          { label: "About Us", href: "/about" },
          { label: "Management Team" }
        ]}
      />

      <section className="py-16 md:py-24 bg-brand-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <SectionHeading
              title="Visionaries at the Helm"
              subtitle="Our Leadership"
              align="left"
            />
            <p className="text-gray-750 leading-relaxed font-body mt-4 text-base md:text-lg">
              The leaders of the CMR Group of Institutions are dedicated pioneers, educators, and administrators who believe in empowering the next generation with values, academic rigour, and future-ready skillsets. Read their inspiring messages to our school community.
            </p>
          </div>

          <div className="space-y-16">
            {LEADERS.map((leader, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <Card
                  key={idx}
                  className="bg-white border border-gray-100/80 p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 rounded-3xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* Left Column: Portrait & Metadata (Alternates layout on desktop) */}
                    <div className={`lg:col-span-4 flex flex-col items-center text-center space-y-4 lg:sticky lg:top-28 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}>
                      <div className="w-52 h-64 relative rounded-2xl overflow-hidden shadow-md border-4 border-brand-navy/5 bg-brand-cream">
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          fill
                          sizes="(max-width: 1024px) 208px, 208px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-brand-navy">
                          {leader.name}
                        </h3>
                        <p className="text-brand-orange text-xs font-semibold uppercase tracking-wider mt-1">
                          {leader.role}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Visionary Message (Alternates layout on desktop) */}
                    <div className={`lg:col-span-8 flex flex-col space-y-5 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}>
                      <div className="border-l-4 border-brand-gold pl-5">
                        <h4 className="font-display font-bold text-2xl text-brand-navy">
                          {leader.title}
                        </h4>
                      </div>
                      <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed font-body">
                        {leader.paragraphs.map((para, pIdx) => (
                          <p key={pIdx}>
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>

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
