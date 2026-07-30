import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = true,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'glass-card rounded-xl p-6 transition-all duration-300 relative overflow-hidden',
          hoverEffect && 'hover:-translate-y-1 hover:border-[#00D9FF]/50 hover:shadow-xl hover:shadow-[#00D9FF]/5',
          className
        )
      )}
    >
      {children}
    </div>
  );
};
