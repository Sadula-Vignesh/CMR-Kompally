import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface InnerHeroProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

export default function InnerHero({ title, breadcrumbs }: InnerHeroProps) {
  return (
    <section className="relative bg-gradient-to-r from-brand-navy to-brand-navyLight pt-32 pb-20 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-gold blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-brand-orange blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight tracking-tight">
            {title}
          </h1>
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs md:text-sm text-gray-300">
            <Link href="/" className="hover:text-brand-goldLight flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-brand-goldLight transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-brand-gold font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
