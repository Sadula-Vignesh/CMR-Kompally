import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'orange' | 'outline' | 'white';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center font-body font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-navy text-white hover:bg-brand-navyLight focus:ring-brand-navy px-6 py-3",
    orange: "bg-brand-orange text-white hover:opacity-90 focus:ring-brand-orange px-6 py-3",
    outline: "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white focus:ring-brand-navy px-6 py-3",
    white: "bg-white text-brand-navy hover:bg-brand-cream focus:ring-brand-navy px-6 py-3 shadow-md"
  };

  const combinedClass = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
}
