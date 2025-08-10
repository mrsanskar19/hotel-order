'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppContainer from '@/components/AppContainer';
import { LogIn, Hotel } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      router.replace('/admin');
    }, 1000);
  };

  return (
    <AppContainer className="justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
            <Hotel className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-4xl font-headline text-primary mt-4">The Grand Hotel</h1>
            <p className="text-muted-foreground">Admin Portal</p>
        </div>
        <Card className="shadow-lg animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
            <CardDescription>Please enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="admin@thegrandhotel.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="********" required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : <>
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppContainer>
  );
}
