import React from 'react';
import Link from 'next/link';
import { SCHOOL_PHONE, SCHOOL_EMAIL, SCHOOL_TIMINGS } from '@/lib/constants';
import { Phone, Mail, Clock } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-brand-navy text-white text-xs py-2 hidden md:block border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            {SCHOOL_PHONE}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-brand-gold" />
            {SCHOOL_EMAIL}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-gold" />
            {SCHOOL_TIMINGS}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/contact?subject=Careers" className="hover:text-brand-goldLight transition-colors">
            Careers
          </Link>
          <span className="text-white/30">|</span>
          <Link href="/contact?subject=Transportation" className="hover:text-brand-goldLight transition-colors">
            Transportation
          </Link>
          <span className="text-white/30">|</span>
          <Link href="/about" className="hover:text-brand-goldLight transition-colors">
            Mandatory Public Disclosure
          </Link>
        </div>
      </div>
    </div>
  );
}
