'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowRight } from 'lucide-react';

export default function AdmissionsSidebar() {
  return (
    <Link href="/admissions" className="block">
      <div 
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center bg-[#0A7A57] hover:bg-[#086649] pl-3.5 pr-5 py-3 rounded-l-full shadow-2xl transition-all duration-300 ease-out translate-x-[calc(100%-64px)] hover:translate-x-0 cursor-pointer select-none group border-l border-t border-b border-white/10"
        style={{
          boxShadow: '0 10px 30px -10px rgba(10, 122, 87, 0.4)',
        }}
      >
        {/* Circle Icon Badge */}
        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#0A7A57] shadow-lg transition-transform duration-300 group-hover:scale-105 shrink-0">
          <GraduationCap className="w-6 h-6 stroke-[2]" />
        </div>

        {/* Text Container */}
        <div className="ml-3 mr-4 flex flex-col text-left shrink-0 transition-opacity duration-200">
          <span className="text-[10px] font-extrabold text-emerald-100 uppercase tracking-widest leading-none mb-1.5 font-body">
            SESSION 2026-27
          </span>
          <span className="text-sm font-black text-white uppercase tracking-wider leading-none font-display">
            ADMISSIONS OPEN
          </span>
        </div>

        {/* Arrow Right */}
        <div className="shrink-0 flex items-center justify-center text-white">
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
