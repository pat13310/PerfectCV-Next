'use client';

import { useInView } from 'react-intersection-observer';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

function TimelineItem({ year, title, description, index }: TimelineItemProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`flex gap-8 items-center transition-all duration-700 ${
        inView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="flex-none w-24 text-xl font-bold text-blue-600">{year}</div>
      <div className="relative flex-none w-4 h-4 bg-blue-600 rounded-full">
        <div className="absolute w-1 h-24 bg-blue-200 left-1/2 -translate-x-1/2"></div>
      </div>
      <div className="flex-1 pb-16">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

interface TimelineProps {
  items: {
    year: string;
    title: string;
    description: string;
  }[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative py-8">
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} index={index} />
      ))}
    </div>
  );
}
