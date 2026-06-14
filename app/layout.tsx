import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryPopup from '@/components/layout/EnquiryPopup';
import AdmissionsSidebar from '@/components/layout/AdmissionsSidebar';
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CMR School Kompally | Best CBSE School in Kompally, Hyderabad',
    template: '%s | CMR School Kompally',
  },
  description:
    "Discover the best CBSE school in Kompally, Hyderabad. CMR School offers quality education, state-of-the-art facilities, and holistic development for students from Pre-Primary to Grade VIII.",
  keywords: [
    'CMR School Kompally',
    'CBSE school Kompally',
    'best school Hyderabad',
    'school Kompally',
    'best CBSE school Hyderabad',
    'CMR group of schools',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-body antialiased">
        <ClientLayoutWrapper>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <EnquiryPopup />
          <AdmissionsSidebar />
        </ClientLayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}
