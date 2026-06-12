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
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${
      hoverEffect ? 'hover:-translate-y-1 transition-all duration-300 hover:shadow-md' : ''
    } ${className}`}>
      {children}
    </div>
  );
}
