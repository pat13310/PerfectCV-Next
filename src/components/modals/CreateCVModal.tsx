import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BoltIcon, DocumentPlusIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface CreateCVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCVModal({ isOpen, onClose }: CreateCVModalProps) {
  const options = [
    {
      title: 'Créer à partir de zéro',
      description: 'Commencez avec un CV vierge et personnalisez-le selon vos besoins',
      icon: DocumentPlusIcon,
      href: '/dashboard/cv/new'
    },
    {
      title: 'Avec assistant IA',
      description: 'Laissez notre IA vous guider dans la création de votre CV',
      icon: BoltIcon,
      href: '/dashboard/cv/new/ai'
    },
    {
      title: 'Importer un CV',
      description: 'Importez votre CV existant et améliorez-le',
      icon: ArrowUpTrayIcon,
      href: '/dashboard/cv/new/import'
    }
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-semibold leading-6 text-gray-900 mb-4 text-center"
                >
                  Comment souhaitez-vous créer votre CV ?
                </Dialog.Title>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {options.map((option) => (
                    <Link
                      key={option.title}
                      href={option.href}
                      className="relative flex flex-col items-center p-6 bg-white rounded-xl border-2 border-violet-100 hover:border-violet-300 transition-all hover:shadow-lg group"
                      onClick={onClose}
                    >
                      <option.icon 
                        className="w-10 h-10 text-violet-600 mb-4 group-hover:scale-110 transition-transform" 
                      />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {option.title}
                      </h4>
                      <p className="text-sm text-gray-500 text-center">
                        {option.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
