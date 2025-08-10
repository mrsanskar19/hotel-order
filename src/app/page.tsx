'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/SplashScreen';
import AdBanner from '@/components/AdBanner'; // Assuming you create this
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showAd, setShowAd] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const adTimer = setTimeout(() => {
      setShowAd(true);
    }, 500); // Show ad after 0.5s

    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2-second splash screen total

    return () => {
        clearTimeout(adTimer);
        clearTimeout(loadingTimer);
    };
  }, []);

  const handleSkipAd = () => {
    setLoading(false);
    setShowAd(false);
  };

  useEffect(() => {
    if (!loading && !showAd) {
      router.replace('/scan');
    }
  }, [loading, showAd, router]);

  if (showAd) {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-10" onClick={handleSkipAd}>
                <X className="h-6 w-6" />
            </Button>
            <div className="w-full max-w-md">
                <AdBanner />
            </div>
             <Button className="mt-4" onClick={handleSkipAd}>Skip Ad</Button>
        </div>
    );
  }

  return <SplashScreen />;
}
