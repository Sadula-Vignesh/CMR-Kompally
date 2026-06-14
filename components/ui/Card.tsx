import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function Card({
  children,
  className = '',
  hoverEffect = true,
}: CardProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-150/60 ${
      hoverEffect ? 'hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/40 hover:border-slate-200/80 transition-all duration-300' : ''
    } ${className}`}>
      {children}
    </div>
  );
}
