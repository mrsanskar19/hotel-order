'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // 1. Countdown Logic
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // 2. Redirect Logic after 5 seconds
    const redirectTimer = setTimeout(() => {
      // Use window.location.href for external domains to ensure a full clean load
      window.location.href = "https://app-foodslinkx.vercel.app/auth/signup";
    }, 5000);

    // Cleanup timers if component unmounts
    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-gray-900">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 p-8">
        
        {/* Loading Spinner */}
        <div className="relative">
          <div className="absolute inset-0 bg-red-100 rounded-full blur-lg opacity-50"></div>
          <div className="relative bg-white p-4 rounded-full shadow-lg border border-red-50">
             <Loader2 className="h-12 w-12 text-red-600 animate-spin" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2 max-w-md">
          <h1 className="text-2xl font-bold text-gray-900">
            Redirecting to Dashboard
          </h1>
          <p className="text-gray-500">
            Please wait while we securely log you in.
          </p>
        </div>

        {/* Countdown Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 text-red-700 font-medium text-sm border border-red-100">
          Redirecting in {countdown} seconds...
        </div>

        {/* Manual Link fallback */}
        <p className="text-xs text-gray-400 mt-8">
          Not redirected?{' '}
          <a 
            href="https://app-foodslinkx.vercel.app/auth/signup" 
            className="text-red-600 hover:underline font-semibold"
          >
            Click here
          </a>
        </p>
      </div>
    </div>
  );
}