'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ShoppingCart, Settings, Zap, Shield, Globe, LineChart, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-background">
      <main className="flex-1">
        {/* Hero Section */}
       <section className="relative w-full min-h-[80vh] flex items-center justify-center text-center overflow-hidden px-4 py-16 md:py-24 bg-[#FFF9E6]">
  {/* Decorative Animated Circles */}
  <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-200 rounded-full opacity-40 animate-ping"></div>
  <div className="absolute bottom-0 right-0 w-56 h-56 bg-red-300 rounded-full opacity-30 animate-bounce"></div>

  <div className="relative z-20 container max-w-3xl animate-fade-in-up">
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 font-headline bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent leading-tight animate-fade-in-down">
      FoodsLinkX – Smart Hotel Order Management
    </h1>
    <p className="mt-6 text-base md:text-xl text-gray-700 leading-relaxed animate-fade-in-up">
      Streamline food & service requests, manage menus, and delight your guests
      with real-time, intuitive ordering — all in one powerful platform.
    </p>
    <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center animate-fade-in-up">
      <Link href="/signup">
        <Button size="lg" className="px-8 w-full sm:w-auto transition-transform duration-300 hover:scale-105">
          Book Demo
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
      <a href="#features" className="w-full sm:w-auto">
        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto text-gray-900 border-gray-400 hover:bg-gray-100 transition-transform duration-300 hover:scale-105"
        >
          Learn More
        </Button>
      </a>
    </div>
  </div>
</section>

        {/* Features */}
        <section id="features" className="w-full py-16 md:py-24 bg-white px-4">
          <div className="container max-w-5xl">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block rounded-lg bg-red-50 px-3 py-1 text-sm text-red-600">
                Features
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold font-headline">
                Everything Your Hotel Needs
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
                FoodsLinkX gives you the tools to improve service, simplify orders,
                and gain insights into your hotel’s operations.
              </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Feature icon={<ShoppingCart />} title="Seamless Ordering" desc="Guests and staff can place orders in seconds with a clean, intuitive interface." />
              <Feature icon={<Settings />} title="Smart Menu Customization" desc="Easily update items, portions, and pricing — tailored for your hotel’s needs." />
              <Feature icon={<Zap />} title="Real-Time Updates" desc="Track orders live, update status instantly, and keep guests informed." />
              <Feature icon={<LineChart />} title="Analytics Dashboard" desc="Get insights into top-selling items, revenue trends, and customer preferences." />
              <Feature icon={<Shield />} title="Secure & Reliable" desc="Enterprise-level security keeps your hotel and guest data safe." />
              <Feature icon={<Globe />} title="Works Anywhere" desc="Platform-independent. Access FoodsLinkX on any device, anywhere." />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="w-full py-16 md:py-24 bg-muted px-4">
          <div className="container max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">How It Works</h2>
            <p className="max-w-2xl mx-auto text-gray-600 mb-12 leading-relaxed text-base md:text-lg">
              Get started with FoodsLinkX in three simple steps.
            </p>
            <div className="grid gap-10 sm:grid-cols-3">
              <Step num="1" title="Sign Up" desc="Create your account and hotel profile in minutes. No credit card required." />
              <Step num="2" title="Set Up Menu & Staff" desc="Add your food items, services, and team members with our guided setup." />
              <Step num="3" title="Start Managing" desc="Take orders, track status, and view reports — all from one dashboard." />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="w-full py-16 md:py-24 bg-white px-4">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-10">FAQs</h2>
            <Accordion type="single" collapsible>
              {[
                { q: "What is FoodsLinkX?", a: "FoodsLinkX is a hotel order management software that helps streamline food ordering, menu customization, and real-time tracking." },
                { q: "Is there a demo available?", a: "Yes, you can book the Premium demo and explore key features before subscribing." },
                { q: "Can I switch plans later?", a: "Absolutely. You can upgrade or downgrade anytime — changes are seamless and prorated." },
                { q: "Does it work on all devices?", a: "Yes, FoodsLinkX is platform-independent. It runs on any device with a web browser." },
                { q: "Is guest data secure?", a: "Yes, we use enterprise-grade encryption to protect both hotel and guest information." },
              ].map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-lg font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-red-600 to-red-500 text-white text-center px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Ready to Try FoodsLinkX?</h2>
            <p className="mb-10 text-base md:text-lg leading-relaxed">
              Experience smarter hotel order management today. Book your demo now and see the difference.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="w-full bg-red sm:w-auto text-white border-white hover:bg-white hover:text-red-600">
                Book Demo
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ------------------- Reusable Components ------------------- */

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start text-center sm:text-left">
      <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-red-50 text-red-600 mx-auto sm:mx-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-bold font-headline">{title}</h3>
        <p className="text-gray-600 mt-2 leading-relaxed text-sm md:text-base">{desc}</p>
      </div>
    </div>
  );
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-lg font-bold">
        {num}
      </div>
      <h3 className="text-lg md:text-xl font-bold font-headline">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{desc}</p>
    </div>
  );
}

