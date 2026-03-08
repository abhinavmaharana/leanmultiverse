import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  showIcon?: boolean;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  showIcon = true,
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: 'bg-[#FF0000] text-white border-none',
    outline: 'bg-[#1A233A] border border-white/20 text-white',
    secondary: 'bg-white text-primary-dark border-none',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-[11px] font-bold',
    lg: 'px-10 py-4 text-lg font-bold',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center transition-all duration-200 font-orbitron uppercase tracking-[0.2em] gap-3',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {showIcon && (
        <span className={cn(
          "w-3 h-3 border",
          variant === 'primary' ? "border-white" : "border-white/40"
        )} />
      )}
      {children}
    </button>
  );
};
