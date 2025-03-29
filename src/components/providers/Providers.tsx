'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/Toaster';

export default function Providers({ children }: { children: ReactNode }) {
  console.log('Providers rendering...');
  
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
}
