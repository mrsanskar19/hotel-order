import Image from 'next/image';

export default function AdBanner() {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden aspect-video relative">
      <Image 
        src="https://placehold.co/600x400.png" 
        alt="Advertisement" 
        layout="fill" 
        objectFit="cover"
        data-ai-hint="advertisement banner"
      />
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Ad</div>
    </div>
  );
}
