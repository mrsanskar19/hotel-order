import { Hotel } from "lucide-react";

export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="animate-pulse">
        <Hotel className="h-24 w-24 text-primary" />
      </div>
      <h1 className="mt-6 text-3xl font-headline text-primary">The Grand Hotel</h1>
      <p className="mt-2 text-muted-foreground">Loading your experience...</p>
    </div>
  );
}
