import React from 'react';
import { cn } from "@/lib/utils";

interface ProgressProps {
  value?: number;
  className?: string;
}

export function Progress({ 
  value = 0, 
  className 
}: ProgressProps) {
  return (
    <div 
      className={cn(
        "w-full h-2 bg-violet-200 rounded-full overflow-hidden",
        className
      )}
    >
      <div 
        className="h-full bg-violet-600 transition-all duration-300 ease-in-out" 
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
