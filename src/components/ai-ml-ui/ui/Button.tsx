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
    primary: 'bg-amber-400 hover:bg-amber-500 text-white border-none shadow-md',
    outline: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50',
    secondary: 'bg-gray-900 text-white border-none',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-8 py-4 text-[13px] font-black rounded-xl',
    lg: 'px-10 py-5 text-lg font-black rounded-2xl',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center transition-all duration-300 uppercase tracking-[0.1em] gap-3 transform hover:-translate-y-0.5 active:scale-95',
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
