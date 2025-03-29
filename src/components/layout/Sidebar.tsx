'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import {
  HomeIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Vue d\'ensemble', href: '/dashboard', icon: HomeIcon },
  { name: 'Mes CV', href: '/dashboard/resumes', icon: DocumentTextIcon },
  { name: 'Templates', href: '/dashboard/templates', icon: DocumentDuplicateIcon },
  { name: 'Assistant IA', href: '/dashboard/assistant', icon: SparklesIcon },
  { name: 'Paramètres', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActiveLink = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="mt-16 z-50 mt-12 h-screen w-64 bg-white border-r border-gray-200">
      <div className="flex h-16 bg-gray-900 items-center px-6 border-b border-gray-200">
        {session?.user?.image ? (
          <img
            src={session.user.image}
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <svg
              className="h-5 w-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
          <p className="text-xs text-gray-500">{session?.user?.email}</p>
        </div>
      </div>
      <nav className="flex flex-col h-full">
        <div className="space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = isActiveLink(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out',
                  isActive
                    ? 'bg-violet-50 text-violet-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
                
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
