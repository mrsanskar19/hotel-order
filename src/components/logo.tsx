import { Hotel } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
 <Image src="/logo.svg" alt="Logo" className="h-6 w-6" width={24} height={24} />
      <span className="font-headline text-lg font-bold">Foods<span className="text-primary">LinkX</span></span>
    </Link>
  );
}
