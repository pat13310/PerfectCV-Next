'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const pathname = usePathname();
  const showOnPaths = ['/dashboard', '/cv', '/templates'];
  const showSidebar = showOnPaths.some(path => pathname.startsWith(path));

  if (status === 'loading') {
    return (
      <div className="bg-gray-50 h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 h-full">
      {showSidebar && (
        <div className="fixed inset-y-0 z-50">
          <Sidebar />
        </div>
      )}
      
      <div className={showSidebar ? 'pl-64' : ''}>
        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
