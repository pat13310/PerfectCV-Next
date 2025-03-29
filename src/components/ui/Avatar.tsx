export interface AvatarProps {
  name?: string;
  src?: string;
  alt?: string;
  className?: string;
}

export function Avatar({ name, src, alt, className = "" }: AvatarProps) {
  // If src is provided, render an image
  if (src) {
    return (
      <img 
        src={src} 
        alt={alt || name || ''} 
        className={`rounded-full object-cover ${className}`} 
      />
    );
  }

  // If no src, fall back to initials
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : '';

  // Générer une couleur de fond unique basée sur le nom
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-red-500",
  ];
  const colorIndex = name 
    ? name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length 
    : 0;
  const bgColor = colors[colorIndex];

  return (
    <div
      className={`${bgColor} ${className} rounded-full flex items-center justify-center text-white font-semibold`}
      style={{ width: "100%", height: "100%", fontSize: "calc(100% + 0.5vw)" }}
    >
      {initials}
    </div>
  );
}
