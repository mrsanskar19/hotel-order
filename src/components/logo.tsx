'use client';

import Link from 'next/link';
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5 select-none">
      {/* Icon Container with Gradient & Animation */}
      <Image src="/logo.svg" alt="Logo" className="h-6 w-6" width={24} height={24} />

      {/* Text Branding */}
      <div className="flex flex-col leading-none">
        <span className="font-headline text-xl font-extrabold tracking-tight text-gray-900 group-hover:text-black transition-colors">
          Foods<span className="text-red-600">LinkX</span>
        </span>
        {/* Optional Tagline/Subtitle for professional feel */}
        {/* <span className="text-[10px] font-medium text-gray-400 tracking-wider uppercase group-hover:text-red-400 transition-colors">
          Hotel OS
        </span> */}
      </div>
    </Link>
  );
}