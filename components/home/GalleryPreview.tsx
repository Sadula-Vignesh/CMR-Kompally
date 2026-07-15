'use client';

import React from 'react';
import GallerySection from '../gallery/GallerySection';
import { GalleryImage } from '../gallery/GalleryConfig';

interface GalleryPreviewProps {
  initialImages: GalleryImage[];
}

export default function GalleryPreview({ initialImages = [] }: GalleryPreviewProps) {
  return <GallerySection initialImages={initialImages} />;
}
