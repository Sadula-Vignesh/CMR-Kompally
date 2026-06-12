import React from 'react';
import type { Metadata } from 'next';
import { getGalleryImages } from '@/lib/googleSheets';
import InnerHero from '@/components/ui/InnerHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Browse campus infrastructure, laboratory environments, sports competitions, and cultural celebrations at CMR School Kompally.',
};

export default async function GalleryPage() {
  const images = await getGalleryImages();
  
  return (
    <>
      <InnerHero
        title="Photo Gallery"
        breadcrumbs={[{ label: "Gallery" }]}
      />
      <GalleryGrid initialImages={images} />
    </>
  );
}
