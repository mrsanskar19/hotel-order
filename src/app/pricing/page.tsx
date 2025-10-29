'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ShoppingBag, Star, TrendingUp, Zap } from 'lucide-react'; // Using lucide-react for professional icons

export default function PricingPage() {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...new Set([...prev, entry.target.id])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.observe').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Helper component for plan feature list
  const FeatureItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start space-x-3">
      {/* Red checkmark for the feature list */}
      <svg className="flex-shrink-0 w-5 h-5 text-red-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span className="text-gray-700">{children}</span>
    </li>
  );

  // Helper for the Rupee symbol
  const RupeeSymbol = () => (
    <span className="text-3xl font-normal text-gray-400 mr-1 mt-1 font-serif">
      ₹
    </span>
  );

  return (
    <main className="min-h-screen w-full bg-gray-50 text-gray-900 font-sans">
      {/* Hero Section - Bold Red Accent */}
      <section className="relative flex flex-col items-center justify-center h-[60vh] text-center overflow-hidden bg-white shadow-sm border-b border-red-100">
        <div className="py-20 px-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-3">
                Solutions for Every Scale
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
                Transparent Pricing
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
              Choose the plan that best aligns with your business goals. Scalable features
              designed to optimize operational efficiency and guest satisfaction.
            </p>
        </div>
      </section>

      {/* --- */}

      {/* Pricing Section - Structured and Professional Red Theme */}
      <section
        id="plans"
        className={cn(
          'observe container mx-auto py-24 px-6 opacity-0 translate-y-10 transition-all duration-700',
          visibleSections.includes('plans') && 'opacity-100 translate-y-0'
        )}
      >
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Our Service Tiers
        </h2>
        <p className="text-center text-lg text-gray-500 mb-16">
            Future-proof your operations with a plan built for growth.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <Zap className="w-8 h-8 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Starter</h3>
            <p className="text-gray-500 mb-6 min-h-12">Perfect for small cafés, boutique hotels, and local dining spaces.</p>

            <div className="flex items-baseline mb-8">
                <p className="text-4xl font-bold text-gray-800 mr-2 flex items-baseline">
                    <RupeeSymbol />
                    599
                </p>
                <p className="text-lg text-gray-500 font-medium">/ month</p>
            </div>

            <ul className="space-y-3">
              <FeatureItem>Guest feedback & rating system</FeatureItem>
              <FeatureItem>Basic SEO optimization</FeatureItem>
              <FeatureItem>Customizable setup for hotels, cafés, and restaurants</FeatureItem>
              <FeatureItem>Manage up to 10 tables or rooms</FeatureItem>
              <FeatureItem>Real-time table booking system</FeatureItem>
              <FeatureItem>Smart control panel for staff & admin</FeatureItem>
              <FeatureItem>Full menu and inventory sync</FeatureItem>
              <FeatureItem>Real-time order tracking with smart alerts</FeatureItem>
              <FeatureItem>24/7 customer support</FeatureItem>
              <FeatureItem>Dedicated account with monthly assistance</FeatureItem>
            </ul>
          </div>

          {/* Best Value (Pro) Plan */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <ShoppingBag className="w-8 h-8 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Best Value (Pro)</h3>
            <p className="text-gray-500 mb-6 min-h-12">Ideal for growing cafés, mid-sized hotels, and restaurants that want smarter control and insights.</p>

            <div className="flex items-baseline mb-8">
                <p className="text-4xl font-bold text-gray-800 mr-2 flex items-baseline">
                    <RupeeSymbol />
                    1299
                </p>
                <p className="text-lg text-gray-500 font-medium">/ month</p>
            </div>

            <ul className="space-y-3">
              <FeatureItem>Guest feedback & rating system + advanced SEO optimization</FeatureItem>
              <FeatureItem>Supports up to 20 tables or rooms</FeatureItem>
              <FeatureItem>Customizable system for multi-section management</FeatureItem>
              <FeatureItem>Real-time table & room booking with instant synchronization</FeatureItem>
              <FeatureItem>AI-powered smart control panel for staff & managers</FeatureItem>
              <FeatureItem>Full menu, pricing, and inventory synchronization</FeatureItem>
              <FeatureItem>Real-time order tracking & smart alerts</FeatureItem>
              <FeatureItem>Advanced analytics dashboard with insights & performance reports</FeatureItem>
              <FeatureItem>Priority onboarding & dedicated account manager</FeatureItem>
              <FeatureItem>24/7 premium support</FeatureItem>
            </ul>
          </div>

          {/* Diamond (All-In-One) Plan (Highlighted) */}
          <div className="relative bg-white border-2 border-red-600 rounded-xl p-8 shadow-2xl scale-100 transition-all duration-500">
            <span className="absolute top-0 right-0 -mt-3 mr-6 bg-red-600 text-white text-xs px-4 py-1 rounded-full font-semibold uppercase tracking-wider shadow-md">
              Recommended
            </span>
            <Star className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Diamond (All-In-One)</h3>
            <p className="text-gray-600 mb-6 min-h-12">Best for top-tier restaurants, hotels, and café chains — everything unlocked.</p>

            <div className="flex items-baseline mb-8">
                <p className="text-4xl font-bold text-red-600 mr-2 flex items-baseline">
                    <RupeeSymbol />
                    2499
                </p>
                <p className="text-lg text-gray-500 font-medium">/ month</p>
            </div>

            <ul className="space-y-3 mb-6">
              <FeatureItem>All Pro features included</FeatureItem>
              <FeatureItem>Manage up to 50 tables or rooms</FeatureItem>
              <FeatureItem>Unlimited staff & device access</FeatureItem>
              <FeatureItem>Advanced AI-driven analytics and growth insights</FeatureItem>
              <FeatureItem>Smart automation tools for orders, billing, and service flow</FeatureItem>
              <FeatureItem>Multi-location management with real-time sync</FeatureItem>
              <FeatureItem>Custom digital menu design + QR ordering</FeatureItem>
              <FeatureItem>Priority listings & featured placement in discovery pages</FeatureItem>
              <FeatureItem>Dedicated success manager & 24/7 priority support</FeatureItem>
              <FeatureItem>Monthly performance reports and growth consultation</FeatureItem>
            </ul>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <TrendingUp className="w-8 h-8 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Enterprise</h3>
            <p className="text-gray-500 mb-6 min-h-12">For large chains and complex operational structures.</p>

            <div className="flex items-baseline mb-8">
                <p className="text-4xl font-bold text-gray-800 mr-2 flex items-baseline">
                    <RupeeSymbol />
                    Custom
                </p>
                <p className="text-lg text-gray-500 font-medium">(Tailored to your needs)</p>
            </div>

            <ul className="space-y-3">
              <FeatureItem>Multi-location & brand management across all branches</FeatureItem>
              <FeatureItem>Custom API integrations (POS, CRM, PMS, etc.)</FeatureItem>
              <FeatureItem>Predictive analytics & demand forecasting for smarter decisions</FeatureItem>
              <FeatureItem>Advanced automation & AI-based resource planning</FeatureItem>
              <FeatureItem>24/7/365 dedicated technical support</FeatureItem>
              <FeatureItem>White-glove onboarding and implementation service</FeatureItem>
              <FeatureItem>Custom dashboards, reports, and role-based access controls</FeatureItem>
              <FeatureItem>Scalable infrastructure for enterprise-grade performance</FeatureItem>
              <FeatureItem>Dedicated success and integration manager</FeatureItem>
            </ul>
          </div>
        </div>
      </section>

      {/* --- */}

      {/* CTA Section - Strong Red Background */}
      <section
        id="cta"
        className="bg-red-700 text-white py-20 text-center"
      >
        <h2 className="text-4xl font-bold mb-4">
          Ready to Elevate Your Guest Experience?
        </h2>
        <p className="text-lg text-red-100 max-w-3xl mx-auto mb-8">
          Reach out to our team to discuss the perfect fit for your hotel.
        </p>
        <a
          href="/contact"
          className="inline-block bg-white text-red-700 px-10 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-gray-200 shadow-lg"
        >
          Book our Samrt Solution
        </a>
      </section>
    </main>
  );
}