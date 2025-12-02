'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ShoppingBag, Star, TrendingUp, Zap, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// --- Types & Data ---

type PricingPlan = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  recommended?: boolean;
  buttonText: string;
  buttonLink: string;
};

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    title: 'Starter',
    subtitle: 'For small cafés & boutiques',
    price: '599',
    period: '/ month',
    icon: Zap,
    description: 'Essential tools to digitize your menu and manage basic orders.',
    buttonText: 'Get Started',
    buttonLink: '/login',
    features: [
      'Guest feedback & rating system',
      'Basic SEO optimization',
      'Manage up to 10 tables or rooms',
      'Real-time table booking system',
      'Smart control panel for staff',
      'Full menu & inventory sync',
      'Order tracking with alerts',
      '24/7 customer support',
    ],
  },
  {
    id: 'pro',
    title: 'Pro',
    subtitle: 'Best Value',
    price: '1299',
    period: '/ month',
    icon: ShoppingBag,
    description: 'Advanced insights and control for growing hotels and restaurants.',
    buttonText: 'Upgrade to Pro',
    buttonLink: '/contact',
    features: [
      'Everything in Starter',
      'Supports up to 20 tables/rooms',
      'Multi-section management',
      'AI-powered staff control panel',
      'Real-time inventory sync',
      'Advanced analytics dashboard',
      'Priority onboarding',
      'Dedicated account manager',
    ],
  },
  {
    id: 'diamond',
    title: 'Diamond',
    subtitle: 'All-In-One',
    price: '2499',
    period: '/ month',
    icon: Star,
    recommended: true,
    description: 'Unrestricted access for top-tier establishments and chains.',
    buttonText: 'Go Diamond',
    buttonLink: '/login',
    features: [
      'Everything in Pro',
      'Manage up to 50 tables/rooms',
      'Unlimited staff & devices',
      'AI-driven growth insights',
      'Automated billing & service flow',
      'Multi-location management',
      'Custom digital menu design',
      'Priority listings in discovery',
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    subtitle: 'Custom Solutions',
    price: 'Custom',
    period: '',
    icon: TrendingUp,
    description: 'Tailored infrastructure for large chains and complex operations.',
    buttonText: 'Contact Sales',
    buttonLink: '/contact',
    features: [
      'Multi-brand management',
      'Custom API integrations (POS/PMS)',
      'Predictive analytics & forecasting',
      'AI-based resource planning',
      'White-glove implementation',
      'Custom role-based access',
      'Dedicated success manager',
      'SLA & 24/7 Priority Support',
    ],
  },
];

// --- Components ---

const RupeeSymbol = () => (
  <span className="text-2xl md:text-3xl font-light text-gray-400 mr-1 font-serif">₹</span>
);

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start space-x-3 text-sm text-gray-600">
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center mt-0.5">
      <Check className="w-3 h-3" strokeWidth={3} />
    </div>
    <span className="leading-relaxed">{children}</span>
  </li>
);

// --- Main Page Component ---

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false); // Interactive Toggle State
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...new Set([...prev, entry.target.id])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.observe').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen w-full bg-gray-50 text-gray-900 font-sans overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-white border-b border-red-50">
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-50 to-transparent opacity-50" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-600 animate-fadeInDown">
            <span className="flex h-2 w-2 rounded-full bg-red-600 mr-2 animate-pulse" />
            Flexible Plans for Every Stage
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight animate-fadeInUp">
            Transparent Pricing, <br />
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Powerful Results
            </span>
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-fadeInUp delay-100">
            Choose the plan that best aligns with your business goals. 
            No hidden fees, just scalable features designed for growth.
          </p>

          {/* Interactive Toggle (Visual Only for Demo) */}
          {/* <div className="flex items-center justify-center mt-10 space-x-4 animate-fadeInUp delay-200">
            <span className={cn("text-sm font-semibold cursor-pointer transition-colors", !isYearly ? "text-gray-900" : "text-gray-400")} onClick={() => setIsYearly(false)}>Monthly</span>
            <div 
              className="w-14 h-8 bg-red-600 rounded-full p-1 cursor-pointer transition-all duration-300 relative"
              onClick={() => setIsYearly(!isYearly)}
            >
              <div className={cn("w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300", isYearly ? "translate-x-6" : "translate-x-0")} />
            </div>
            <span className={cn("text-sm font-semibold cursor-pointer transition-colors", isYearly ? "text-gray-900" : "text-gray-400")} onClick={() => setIsYearly(true)}>
              Yearly <span className="text-red-600 text-xs ml-1 font-bold">(Save 20%)</span>
            </span>
          </div> */}
        </div>
      </section>

      {/* Pricing Grid */}
      <section
        id="plans"
        className={cn(
          'observe container mx-auto py-20 px-6 transition-all duration-1000 ease-out transform',
          visibleSections.includes('plans') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {PRICING_PLANS.map((plan, index) => (
            <div
              key={plan.id}
              className={cn(
                "relative group flex flex-col p-8 rounded-3xl transition-all duration-500 border bg-white",
                plan.recommended 
                  ? "border-red-500 shadow-2xl scale-100 z-10 xl:-mt-4 xl:mb-4" 
                  : "border-gray-200 shadow-lg hover:shadow-xl hover:scale-[1.02] hover:border-red-200"
              )}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute top-0 right-0 left-0 -mt-5 flex justify-center">
                  <span className="bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card Header */}
              <div className="mb-6">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300",
                  plan.recommended ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 group-hover:bg-red-50 group-hover:text-red-600"
                )}>
                  <plan.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{plan.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6 leading-relaxed min-h-[40px]">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline">
                   {plan.price !== 'Custom' && <RupeeSymbol />}
                   <span className={cn("font-bold tracking-tight text-gray-900", plan.price === 'Custom' ? "text-4xl" : "text-5xl")}>
                     {plan.price}
                   </span>
                </div>
                {plan.period && <p className="text-gray-400 font-medium mt-1">{plan.period}</p>}
              </div>

              {/* Action Button */}
              <Link href={plan.buttonLink} className="w-full">
                <Button 
                  className={cn(
                    "w-full py-6 text-base font-semibold transition-all duration-300 mb-8",
                    plan.recommended 
                      ? "bg-red-600 hover:bg-red-700 hover:text-white shadow-lg shadow-red-200"
                      : "bg-white border-2 border-gray-200 text-gray-900 hover:border-red-600 hover:text-white"
                  )}
                >
                  {plan.buttonText}
                </Button>
              </Link>

              {/* Features List */}
              <div className="flex-grow">
                <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">What's included:</p>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <FeatureItem key={i}>{feature}</FeatureItem>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ / Trust Section */}
      <section className="bg-white py-20 border-t border-gray-100">
         <div className="container mx-auto px-6 text-center max-w-4xl">
             <h2 className="text-3xl font-bold mb-12">Why Choose FoodsLinkX?</h2>
             <div className="grid md:grid-cols-3 gap-8">
                 <div className="p-6 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors duration-300">
                    <h3 className="font-bold text-lg mb-2">No Hidden Fees</h3>
                    <p className="text-gray-600 text-sm">We believe in transparency. The price you see is the price you pay.</p>
                 </div>
                 <div className="p-6 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors duration-300">
                    <h3 className="font-bold text-lg mb-2">Cancel Anytime</h3>
                    <p className="text-gray-600 text-sm">No long-term contracts for monthly plans. Upgrade or downgrade as needed.</p>
                 </div>
                 <div className="p-6 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors duration-300">
                    <h3 className="font-bold text-lg mb-2">Free Setup</h3>
                    <p className="text-gray-600 text-sm">Our team helps you digitize your menu and get started for free.</p>
                 </div>
             </div>
         </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="relative bg-red-700 text-white py-24 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600 to-red-800" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10 container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to Transform Your Hotel?
          </h2>
          <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto mb-10">
            Join hundreds of hotels optimizing their operations with FoodsLinkX. 
            Book a personalized demo today.
          </p>
          
          <Link href="/contact">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-red-600 transition-all duration-300 bg-white rounded-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-gray-100 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                <span className="relative z-10 flex items-center">
                   Book our Smart Solution <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}