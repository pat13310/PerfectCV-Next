'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFileAlt, FaHome, FaUser } from 'react-icons/fa';

const menuItems = [
  {
    path: '/dashboard',
    label: 'Tableau de bord',
    icon: FaHome,
  },
  {
    path: '/dashboard/cv',
    label: 'Mes CV',
    icon: FaFileAlt,
  },
  {
    path: '/dashboard/profile',
    label: 'Mon profil',
    icon: FaUser,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">PerfectCV</h2>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
