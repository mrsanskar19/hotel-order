'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function PricingPage() {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

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

  return (
    <main className="min-h-screen w-full bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[70vh] text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-100 via-white to-red-50" />
        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent animate-fadeInDown">
            Pricing
        </h1>
        <p className="relative z-10 mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          Choose the right plan for your hotel. Transparent, flexible, and designed to
          simplify order management.
        </p>
      </section>

      {/* Pricing Section */}
      <section
        id="plans"
        className={cn(
          'observe container mx-auto py-24 px-6 opacity-0 translate-y-10 transition-all duration-700',
          visibleSections.includes('plans') && 'opacity-100 translate-y-0'
        )}
      >
        <h2 className="text-4xl font-bold text-center mb-16">Our Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Starter Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-md hover:shadow-xl transition-shadow duration-500 text-center">
            <h3 className="text-2xl font-semibold mb-4">Starter</h3>
            <p className="text-gray-500 mb-6">Best for small hotels & cafes.</p>
            <p className="text-4xl font-bold text-gray-400 mb-4">Coming Soon</p>
            <ul className="text-gray-600 space-y-2">
              <li>✔ Basic order management</li>
              <li>✔ Simple menu listing</li>
              <li>✔ Basic reporting</li>
            </ul>
          </div>

          {/* Premium / Demo Highlight */}
          <div className="relative bg-gradient-to-b from-red-50 to-white border-2 border-red-500 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-500 text-center">
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              Demo Available
            </span>
            <h3 className="text-2xl font-semibold mb-4">Premium</h3>
            <p className="text-gray-600 mb-6">Perfect for medium-sized hotels.</p>
            <p className="text-4xl font-bold text-red-600 mb-4">Free Demo</p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>✔ Full menu customization</li>
              <li>✔ Smart cart & live orders</li>
              <li>✔ Analytics dashboard</li>
              <li>✔ Priority support</li>
            </ul>
            <a
              href="#contact"
              className="mt-8 inline-block relative overflow-hidden border-2 border-red-600 text-red-600 bg-transparent px-8 py-3 rounded-lg font-medium transition-colors duration-300 ease-in-out group"
            >
              <span className="absolute inset-0 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100 bg-red-600" />
              <span className="relative z-10 group-hover:text-white">Book Now</span>
            </a>
          </div>

          {/* Pro Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-md hover:shadow-xl transition-shadow duration-500 text-center">
            <h3 className="text-2xl font-semibold mb-4">Pro</h3>
            <p className="text-gray-500 mb-6">For large hotels & restaurant chains.</p>
            <p className="text-4xl font-bold text-gray-400 mb-4">Coming Soon</p>
            <ul className="text-gray-600 space-y-2">
              <li>✔ Multi-branch management</li>
              <li>✔ Advanced analytics & reports</li>
              <li>✔ Custom integrations (POS/CRM)</li>
              <li>✔ 24/7 dedicated support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="bg-gradient-to-r from-red-600 to-red-500 text-white py-24 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Experience the Demo?
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-10">
          Try our Hotel Order Management Software and see how it simplifies operations,
          improves guest experience, and boosts efficiency.
        </p>
        <a
          href="#contact"
          className="relative overflow-hidden border-2 border-white text-white px-10 py-3 rounded-lg font-medium transition-colors duration-300 ease-in-out group"
        >
          <span className="absolute inset-0 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100 bg-white" />
          <span className="relative z-10 group-hover:text-red-600">
            Contact Us
          </span>
        </a>
      </section>
    </main>
  );
}

