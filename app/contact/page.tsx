import React from 'react';
import type { Metadata } from 'next';
import InnerHero from '@/components/ui/InnerHero';
import HomeContactSection from '@/components/home/HomeContactSection';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Find administrative phone numbers, official campus address, emails, and submit your general queries to CMR School Kompally.',
};

export default function ContactPage() {
  return (
    <>
      <InnerHero
        title="Contact Us"
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      {/* Contact Form, Info cards and Maps embed */}
      <HomeContactSection />
    </>
  );
}
