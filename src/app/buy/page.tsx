import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hotel, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function BuyPage() {
  return (
    <div className="py-12 md:py-24 bg-muted">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Secure Checkout</CardTitle>
              <CardDescription>Complete your purchase for the Resort Plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="manager@hotel.com" required />
                </div>
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                   <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="•••• •••• •••• ••••" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input id="expiry-date" placeholder="MM / YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required />
                  </div>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="name-on-card">Name on Card</Label>
                  <Input id="name-on-card" placeholder="John Doe" required />
                </div>
                <Button type="submit" className="w-full !mt-6" size="lg">
                  Confirm Purchase
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold font-headline mb-4">Order Summary</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Hotel className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">Desklet - Resort Plan</p>
                      <p className="text-sm text-muted-foreground">Billed Annually</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg">$2,990.00</p>
                </div>
                <div className="border-t pt-4 space-y-2">
                   <div className="flex justify-between text-sm">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>$2,990.00</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-muted-foreground">Taxes</p>
                    <p>$0.00</p>
                  </div>
                   <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                    <p>Total</p>
                    <p>$2,990.00</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                 <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span>SSL secured payment. Your information is protected.</span>
                </div>
              </CardFooter>
            </Card>
            <p className="text-xs text-muted-foreground mt-4">
              By clicking "Confirm Purchase", you agree to our{' '}
              <Link href="#" className="underline hover:text-primary">Terms of Service</Link>.
              This is a recurring subscription.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
