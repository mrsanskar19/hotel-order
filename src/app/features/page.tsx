'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function FeaturePage() {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  // Scroll animation observer
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
    <main className="min-h-screen w-full bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[70vh] md:h-[80vh] text-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-red-100 via-white to-red-50 animate-pulse" />
        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent animate-fadeInDown">
          Features
        </h1>
        <p className="relative z-10 mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-md md:max-w-2xl">
          Simplify hotel ordering, improve guest satisfaction, and streamline
          operations — all in one modern, intuitive platform.
        </p>
        <a
          href="#features"
          className="mt-8 sm:mt-10 relative overflow-hidden border-2 border-red-600 text-red-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-300 ease-in-out group"
        >
          <span className="absolute inset-0 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100 bg-red-600" />
          <span className="relative z-10 group-hover:text-white">Explore Features</span>
        </a>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className={cn(
          'observe container mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 opacity-0 translate-y-10 transition-all duration-700',
          visibleSections.includes('mission') && 'opacity-100 translate-y-0'
        )}
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Our Mission</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              At Sanskarut Tech, we empower hotels with digital tools to manage
              orders seamlessly. No more manual slips, delayed service, or lost
              requests. Just simple, real-time order management built for modern
              hospitality.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/mission.jpg"
              alt="Our Mission"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg w-full h-auto max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={cn(
          'observe container mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 opacity-0 translate-y-10 transition-all duration-700',
          visibleSections.includes('features') && 'opacity-100 translate-y-0'
        )}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">Key Features</h2>
        <div className="space-y-16 sm:space-y-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center md:order-last">
              <Image
                src="/images/order.jpg"
                alt="Seamless Ordering"
                width={600}
                height={400}
                className="rounded-xl shadow-md w-full h-auto max-w-md"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-2xl font-semibold mb-3 sm:mb-4">Seamless Ordering</h3>
              <p className="text-gray-600 leading-relaxed">
                Guests can order food, drinks, and services directly through a
                clean digital interface. Staff receive instant notifications —
                ensuring faster, error-free service.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="/images/customize.jpg"
                alt="Customization"
                width={600}
                height={400}
                className="rounded-xl shadow-md w-full h-auto max-w-md"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-2xl font-semibold mb-3 sm:mb-4">Smart Customization</h3>
              <p className="text-gray-600 leading-relaxed">
                Portion sizes, room-service preferences, special notes —
                everything is customizable. Guests enjoy flexibility, hotels
                enjoy higher satisfaction scores.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center md:order-last">
              <Image
                src="/images/cart.jpg"
                alt="Smart Cart"
                width={600}
                height={400}
                className="rounded-xl shadow-md w-full h-auto max-w-md"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-2xl font-semibold mb-3 sm:mb-4">Real-Time Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Guests and staff both track orders in real time. From the
                kitchen to delivery, everything is visible — improving
                transparency and trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="bg-gradient-to-r from-red-600 to-red-500 text-white py-16 sm:py-24 text-center px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Ready to Try It Out?
        </h2>
        <p className="text-base sm:text-lg max-w-md md:max-w-2xl mx-auto mb-8 sm:mb-10">
          Experience the simplicity of modern design combined with powerful
          technology. Let’s build your next big idea together.
        </p>
        <a
          href="#contact"
          className="relative overflow-hidden border-2 border-white text-white px-8 sm:px-10 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-300 ease-in-out group"
        >
          <span className="absolute inset-0 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100 bg-white" />
          <span className="relative z-10 group-hover:text-red-600">
          Book our Smart Solution
          </span>
        </a>
      </section>
    </main>
  );
}
