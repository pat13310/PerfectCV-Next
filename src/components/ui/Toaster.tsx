'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster 
      position="top-right"
      richColors
      expand={true}
      duration={3000}
    />
  );
}
