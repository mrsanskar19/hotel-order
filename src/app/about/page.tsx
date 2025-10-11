'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  // Intersection Observer for scroll animations
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
    <main className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[70vh] text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-100 via-white to-red-50 animate-pulse" />
        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent animate-slideDown">
          About Us
        </h1>
        <p className="relative z-10 mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
          We’re on a mission to transform technology into solutions that empower businesses worldwide.
        </p>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className={cn(
          'observe container mx-auto py-20 px-6 text-center opacity-0 translate-y-10 transition-all duration-700',
          visibleSections.includes('mission') && 'opacity-100 translate-y-0'
        )}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
         We innovate, design, and build scalable digital solutions tailored for the hospitality industry. 
FoodsLinkX is focused on creating intuitive, impactful, and accessible technology that simplifies 
food ordering, enhances guest satisfaction, and streamlines hotel and restaurant operations.

        </p>
      </section>

      {/* Interactive Image Grid */}
      <section
        id="values"
        className={cn(
          'observe container mx-auto py-20 px-6 opacity-0 translate-y-10 transition-all duration-700',
          visibleSections.includes('values') && 'opacity-100 translate-y-0'
        )}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Drives Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {['/images/innovation.jpg', '/images/teamwork.jpg', '/images/future.jpg'].map(
            (src, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl shadow-lg group"
              >
                <Image
                  src={src}
                  alt="Value"
                  width={500}
                  height={300}
                  className="w-full h-60 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xl font-semibold transition-opacity duration-500">
                  {idx === 0 && 'Innovation'}
                  {idx === 1 && 'Teamwork'}
                  {idx === 2 && 'Future Vision'}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Want to work with us?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Let’s build something amazing together.
        </p>

        {/* 🔴 Become our partners Button (with animated red hover) */}
        <Link
            href="/contact"
          className="relative inline-block overflow-hidden border-2 border-red-600 text-red-600 bg-transparent px-8 py-3 rounded-lg font-medium transition-colors duration-300 ease-in-out group"
        >
          <span className="absolute inset-0 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out pointer-events-none z-0 group-hover:scale-x-100 bg-red-600" />
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
          Book our Smart Solution
          </span>
        </Link>
      </section>
    </main>
  );
}
