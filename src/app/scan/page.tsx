import Link from 'next/link';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppContainer from '@/components/AppContainer';

export default function ScanPage() {
  return (
    <AppContainer className="flex flex-col justify-center items-center p-8 text-center animation-fade-in">
      <h1 className="text-4xl font-headline text-primary mb-4">Welcome!</h1>
      <p className="text-muted-foreground mb-8">Scan the QR code on your table to get started.</p>
      
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <div className="absolute inset-0 border-4 border-dashed border-muted-foreground/50 rounded-2xl animate-pulse"></div>
        <QrCode className="w-32 h-32 text-primary" />
      </div>

      <Button asChild size="lg" className="w-full font-bold text-lg">
        <Link href="/menu">Scan to View Menu</Link>
      </Button>
      <p className="text-xs text-muted-foreground mt-4">(This is a simulation)</p>
    </AppContainer>
  );
}
