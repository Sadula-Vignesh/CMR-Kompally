import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right',
  };

  return (
    <div className={`max-w-3xl mb-12 ${alignmentClasses[align]}`}>
      {subtitle && (
        <span className={`text-xs font-semibold tracking-widest uppercase mb-3 block ${
          light ? 'text-brand-goldLight' : 'text-brand-orange'
        }`}>
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-display font-bold leading-tight ${
        light ? 'text-white' : 'text-brand-navy'
      }`}>
        {title}
      </h2>
      <div className={`w-20 h-1 mt-4 ${
        align === 'center' ? 'mx-auto' : ''
      } ${
        light ? 'bg-brand-goldLight' : 'bg-brand-gold'
      }`} />
    </div>
  );
}
