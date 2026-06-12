import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'navy' | 'green' | 'orange' | 'gold' | 'gray';
  className?: string;
}

export default function Badge({
  children,
  variant = 'navy',
  className = '',
}: BadgeProps) {
  const styles = {
    navy: 'bg-brand-navy/10 text-brand-navy border-brand-navy/20',
    green: 'bg-brand-green/10 text-brand-green border-brand-green/20',
    orange: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20',
    gold: 'bg-brand-gold/10 text-brand-gold border-brand-gold/20',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
