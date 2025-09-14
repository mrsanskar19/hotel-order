'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useState } from 'react';
import { postData } from "@/lib/api";

export default function SignupPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTime, setActiveTime] = useState('9 AM - 11 PM');
  const [parcelAvailable, setParcelAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await postData('hotel', {
          name,
          username,
          description,
          phone,
          address,
          email,
          password,
          active_time: activeTime,
          parcel_available: parcelAvailable,
      });

      // Handle successful signup, e.g., redirect to login
      window.location.href = '/login';
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
          <CardDescription>Start your 14-day free trial. No credit card required.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hotel-name">Hotel Name</Label>
              <Input id="hotel-name" type="text" placeholder="The Grand Hotel" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="grandhotel" required value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="A beautiful hotel with a view..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="text" placeholder='+1234567890' value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" type="text" placeholder="123 Main St, Anytown, USA" required value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="active-time">Active Time</Label>
              <Input id="active-time" type="text" placeholder="9 AM - 11 PM" value={activeTime} onChange={(e) => setActiveTime(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="parcel-available" checked={parcelAvailable} onCheckedChange={(checked) => setParcelAvailable(Boolean(checked))} />
              <Label htmlFor="parcel-available">Parcel Available</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="manager@hotel.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
          <p className="mt-4 px-8 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{' '}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
