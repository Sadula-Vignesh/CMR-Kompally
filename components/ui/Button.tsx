import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'orange' | 'outline' | 'white' | 'gold';
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
  const baseStyle = "inline-flex items-center justify-center font-body font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-[1.03] active:scale-[0.98] select-none cursor-pointer tracking-wide";
  
  const variants = {
    primary: "bg-brand-navy text-white hover:bg-brand-navyLight hover:shadow-lg hover:shadow-brand-navy/25 focus:ring-brand-navy px-6 py-3",
    orange: "bg-brand-orange text-white hover:bg-brand-orange/90 hover:shadow-lg hover:shadow-brand-orange/25 focus:ring-brand-orange px-6 py-3",
    gold: "bg-brand-gold text-white hover:bg-brand-gold/90 hover:shadow-lg hover:shadow-brand-gold/25 focus:ring-brand-gold px-6 py-3",
    outline: "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white hover:shadow-lg hover:shadow-brand-navy/10 focus:ring-brand-navy px-6 py-3",
    white: "bg-white text-brand-navy hover:bg-brand-cream hover:shadow-xl focus:ring-brand-navy px-6 py-3 shadow-md"
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
