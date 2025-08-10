import Image from "next/image";

export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="animate-pulse">
        <Image src="/logo.svg" alt="QR Menu Go Logo" width={200} height={50} priority />
      </div>
      <p className="mt-4 text-muted-foreground font-headline">Loading your experience...</p>
    </div>
  );
}
