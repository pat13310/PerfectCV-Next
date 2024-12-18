'use client';

import Providers from '../providers/Providers';
import { Header } from './Header';
import { Footer } from './Footer';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export default function RootLayoutClient({
  children,
}: RootLayoutClientProps) {
  return (
    <Providers>
      <div className="flex flex-col h-[100vh] overflow-hidden">
        <Header className="fixed top-0 left-0 w-full z-50" />
        <main className="flex-grow pt-0">
          {children}
        </main>
        <Footer className="sticky bottom-0 flex-shrink-0 " />
      </div>
    </Providers>
  );
}
