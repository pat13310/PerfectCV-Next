import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  features: string[];
  popular?: boolean;
  new?: boolean;
  premium?: boolean;
}

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden h-[420px]">
      {template.popular && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-blue-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
            Populaire
          </span>
        </div>
      )}
      {template.new && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
            Nouveau
          </span>
        </div>
      )}
      {template.premium && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-purple-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
            Premium
          </span>
        </div>
      )}
      <div className="aspect-[16/9] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-gray-900/25 to-transparent z-10" />
        <Image
          src={template.thumbnail}
          alt={template.name}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">{template.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {template.description}
          </p>
        </div>
        <ul className="space-y-1.5 mb-4">
          {template.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600 text-sm group/item">
              <span className="mr-2 flex-shrink-0 w-4 h-4 rounded-full bg-gray-100 group-hover/item:bg-green-50 flex items-center justify-center">
                <svg 
                  className="w-2.5 h-2.5 text-gray-400 group-hover/item:text-green-500 transition-colors" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="leading-tight group-hover/item:text-gray-800 transition-colors">{feature}</span>
            </li>
          ))}
        </ul>
        <Link href={`/cv/new?template=${template.id}`} className="mt-auto">
          <Button 
            className={`w-full py-2 text-sm transition-colors ${
              template.premium 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : template.popular
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-800 hover:bg-gray-900'
            }`}
          >
            {template.premium ? 'Accéder au Premium' : 'Utiliser ce template'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
