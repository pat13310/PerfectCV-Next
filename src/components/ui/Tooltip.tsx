'use client';

import React, { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  className?: string;
}

export function Tooltip({ children, content, className = '' }: TooltipProps) {
  return (
    <div className="group relative inline-block">
      {children}
      <div 
        className={`
          absolute z-10 p-2 bg-gray-800 text-white text-xs rounded-md 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 
          pointer-events-none
          -top-8 left-1/2 transform -translate-x-1/2
          ${className}
        `}
      >
        {content}
      </div>
    </div>
  );
}
