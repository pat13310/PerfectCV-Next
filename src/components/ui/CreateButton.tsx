import Link from 'next/link';
import { ReactNode } from 'react';

interface CreateButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  paddingY?: 'py-2' | 'py-3' | 'py-4';
}

export function CreateButton({ 
  href, 
  onClick, 
  children, 
  className = '',
  rounded = 'lg',
  paddingY='py-3'
}: CreateButtonProps) {
  const baseStyle = `
    inline-flex items-center justify-center
    px-6 ${paddingY} rounded-${rounded}
    text-white text-lg font-medium
    bg-gradient-to-r from-violet-600 to-pink-500
    hover:from-violet-500 hover:to-pink-400
    transform hover:scale-105
    transition-all duration-200
    shadow-lg hover:shadow-md
    active:scale-95
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={baseStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseStyle}>
      {children}
    </button>
  );
}
