import Link from 'next/link';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppContainer from '@/components/AppContainer';
import { AppLogo } from '@/components/AppLogo';

export default function ScanPage() {
  return (
    <AppContainer className="flex flex-col justify-center items-center p-8 text-center animation-fade-in">
      <div className="mb-8">
        <AppLogo className="mx-auto h-16 w-16 text-primary" />
        <h1 className="text-5xl font-headline text-primary mt-4">The Grand Hotel</h1>
        <p className="text-muted-foreground mt-2 text-lg">Your Culinary Journey Starts Here</p>
      </div>
      
      <p className="text-muted-foreground mb-8">Scan the QR code on your table to view our menu.</p>
      
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <div className="absolute inset-0 border-4 border-dashed border-primary/30 rounded-2xl animate-pulse"></div>
        <QrCode className="w-32 h-32 text-primary" />
      </div>

      <Button asChild size="lg" className="w-full font-bold text-lg shadow-lg">
        <Link href="/menu">Scan to View Menu</Link>
      </Button>
      <p className="text-xs text-muted-foreground mt-4">(This is a simulation)</p>
    </AppContainer>
  );
}
