interface ImagePlaceholderProps {
  className?: string;
  bgColor?: string;
  iconColor?: string;
}

export function ImagePlaceholder({ 
  className = "", 
  bgColor = "bg-gray-100", 
  iconColor = "text-gray-400" 
}: ImagePlaceholderProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${bgColor} ${className}`}>
      <svg
        className={`w-16 h-16 ${iconColor}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
        />
      </svg>
    </div>
  );
}
