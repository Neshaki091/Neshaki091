import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 cursor-pointer';

  const variantStyles = {
    primary: 'bg-[#4A4E69] dark:bg-[#00D9FF] text-[#F2E9E4] dark:text-[#0D1117] hover:bg-[#22223B] dark:hover:bg-[#33E2FF] font-semibold shadow-lg shadow-[#4A4E69]/20 dark:shadow-[#00D9FF]/20 hover:-translate-y-0.5',
    secondary: 'bg-[#FAF6F0] dark:bg-[#21262D] text-[#22223B] dark:text-[#E6EDF3] hover:bg-[#C9ADA7]/40 dark:hover:bg-[#30363D] border border-[#C9ADA7] dark:border-[#30363D]',
    outline: 'border border-[#4A4E69] dark:border-[#00D9FF] text-[#4A4E69] dark:text-[#00D9FF] hover:bg-[#4A4E69]/10 dark:hover:bg-[#00D9FF]/10',
    ghost: 'text-[#22223B] dark:text-[#C9D1D9] hover:text-[#4A4E69] dark:hover:text-[#00D9FF] hover:bg-[#C9ADA7]/20 dark:hover:bg-[#21262D]',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variantStyles[variant], sizeStyles[size], className))}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
