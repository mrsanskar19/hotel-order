'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/SplashScreen';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2-second splash screen

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      router.replace('/scan');
    }
  }, [loading, router]);

  return <SplashScreen />;
}
