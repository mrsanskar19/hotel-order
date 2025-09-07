'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function HotelOrderPage() {
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
      { threshold: 0.2 }
    );

    document.querySelectorAll('.observe').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen w-full bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[80vh] text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-100 via-white to-red-50 animate-pulse" />
        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent animate-fadeInDown">
          Features
        </h1>
        <p className="relative z-10 mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          Simplify hotel ordering, improve guest satisfaction, and streamline
          operations — all in one modern, intuitive platform.
        </p>
        <a
          href="#features"
          className="mt-10 relative overflow-hidden border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-medium transition-colors duration-300 ease-in-out group"
        >
          <span className="absolute inset-0 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100 bg-red-600" />
          <span className="relative z-10 group-hover:text-white">Explore Features</span>
        </a>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className={cn(
          'observe container mx-auto py-24 px-6 opacity-0 translate-y-10 transition-all duration-700',
          visibleSections.includes('mission') && 'opacity-100 translate-y-0'
        )}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Sanskarut Tech, we empower hotels with digital tools to manage
              orders seamlessly. No more manual slips, delayed service, or lost
              requests. Just simple, real-time order management built for modern
              hospitality.
            </p>
          </div>
          <Image
            src="/images/mission.jpg"
            alt="Our Mission"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={cn(
          'observe container mx-auto py-24 px-6 opacity-0 translate-y-10 transition-all duration-700',
          visibleSections.includes('features') && 'opacity-100 translate-y-0'
        )}
      >
        <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
        <div className="space-y-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Image
              src="/images/order.jpg"
              alt="Seamless Ordering"
              width={600}
              height={400}
              className="rounded-xl shadow-md"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-4">Seamless Ordering</h3>
              <p className="text-gray-600 leading-relaxed">
                Guests can order food, drinks, and services directly through a
                clean digital interface. Staff receive instant notifications —
                ensuring faster, error-free service.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Smart Customization</h3>
              <p className="text-gray-600 leading-relaxed">
                Portion sizes, room-service preferences, special notes —
                everything is customizable. Guests enjoy flexibility, hotels
                enjoy higher satisfaction scores.
              </p>
            </div>
            <Image
              src="/images/customize.jpg"
              alt="Customization"
              width={600}
              height={400}
              className="rounded-xl shadow-md"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Image
              src="/images/cart.jpg"
              alt="Smart Cart"
              width={600}
              height={400}
              className="rounded-xl shadow-md"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-4">Real-Time Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Guests and staff both track orders in real time. From the
                kitchen to delivery, everything is visible — improving
                transparency and trust.
              </p>
            </div>
          </div>
        </div>
      </section>


        <section
        id="cta"
        className="bg-gradient-to-r from-red-600 to-red-500 text-white py-24 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Try It Out?
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-10">
          Experience the simplicity of modern design combined with powerful
          technology. Let’s build your next big idea together.
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

