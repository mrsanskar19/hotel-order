'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import Link from 'next/link';

const pricingTiers = [
  {
    name: 'Boutique',
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: 'Perfect for small, independent hotels.',
    features: [
      'Up to 20 rooms',
      'Booking Engine',
      'Guest Management',
      'Basic Reporting',
      'Email Support',
    ],
    isPopular: false,
    cta: 'Choose Boutique',
  },
  {
    name: 'Resort',
    monthlyPrice: 299,
    yearlyPrice: 2990,
    description: 'Ideal for medium-sized hotels and resorts.',
    features: [
      'Up to 100 rooms',
      'All Boutique features',
      'Dynamic Pricing AI',
      'Advanced Reporting',
      'Priority Phone Support',
    ],
    isPopular: true,
    cta: 'Choose Resort',
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    yearlyPrice: null,
    description: 'Tailored for large chains and complex needs.',
    features: [
      'Unlimited rooms',
      'All Resort features',
      'Custom Integrations',
      'Dedicated Account Manager',
      '24/7/365 Support',
    ],
    isPopular: false,
    cta: 'Contact Sales',
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="py-12 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Flexible Pricing for Hotels of All Sizes</h1>
          <p className="mt-4 text-lg text-muted-foreground">Choose the plan that's right for you. No hidden fees, ever.</p>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-10">
          <Label htmlFor="billing-cycle">Monthly</Label>
          <Switch id="billing-cycle" checked={isYearly} onCheckedChange={setIsYearly} />
          <Label htmlFor="billing-cycle">Yearly (Save 2 months)</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <Card key={tier.name} className={tier.isPopular ? 'border-primary border-2 shadow-lg' : ''}>
              <CardHeader>
                {tier.isPopular && (
                  <div className="text-center">
                    <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-2">MOST POPULAR</span>
                  </div>
                )}
                <CardTitle className="font-headline text-center text-2xl">{tier.name}</CardTitle>
                <CardDescription className="text-center">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-6">
                  {tier.monthlyPrice !== null ? (
                    <>
                      ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                      <span className="text-lg font-normal text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                    </>
                  ) : (
                    'Custom'
                  )}
                </div>
                <ul className="space-y-3 w-full">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/buy" className="w-full">
                  <Button className="w-full" variant={tier.isPopular ? 'default' : 'outline'}>
                    {tier.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
