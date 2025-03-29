import Link from 'next/link';

interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`${className} z-50 bg-gray-900 text-white border-t border-gray-200 w-full`}>
      <div className="max-w-screen-2xl mx-auto px-4 py-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/contact" className="hover:text-violet-300 text-sm">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-violet-300 text-sm">
            Confidentialité
          </Link>
          <Link href="/terms" className="hover:text-violet-300 text-sm">
            CGU
          </Link>
        </div>
        <div className="mt-4 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 ">
            &copy; {new Date().getFullYear()} PerfectCV. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
