import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'blue' | 'orange' | 'green' | 'dark';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  className,
}) => {
  const variantStyles = {
    cyan: 'bg-[#4A4E69]/10 dark:bg-[#00D9FF]/10 text-[#4A4E69] dark:text-[#00D9FF] border-[#4A4E69]/30 dark:border-[#00D9FF]/30',
    blue: 'bg-[#4A4E69]/10 dark:bg-[#58A6FF]/10 text-[#4A4E69] dark:text-[#58A6FF] border-[#4A4E69]/30 dark:border-[#58A6FF]/30',
    orange: 'bg-[#9A8C98]/15 dark:bg-[#F78166]/10 text-[#22223B] dark:text-[#F78166] border-[#9A8C98]/40 dark:border-[#F78166]/30',
    green: 'bg-emerald-100 dark:bg-[#238636]/10 text-emerald-800 dark:text-[#3FB950] border-emerald-300 dark:border-[#238636]/30',
    dark: 'bg-[#C9ADA7]/30 dark:bg-[#21262D] text-[#22223B] dark:text-[#C9D1D9] border-[#C9ADA7] dark:border-[#30363D]',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border transition-colors',
          variantStyles[variant],
          className
        )
      )}
    >
      {children}
    </span>
  );
};
