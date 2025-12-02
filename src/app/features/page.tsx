'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  Smartphone,
  Monitor,
  ChefHat,
  SlidersHorizontal,
  LineChart,
  Languages,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import Image from "next/image";

// --- Scroll Animation Hook (Same as About Page) ---
function useOnScreen(options: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, isVisible] as const;
}

// --- Reusable Animated Section Wrapper ---
const FadeInSection = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-1000 ease-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        className
      )}
    >
      {children}
    </div>
  );
};

export default function FeaturePage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground overflow-hidden">
      
      {/* =========================================
          HERO SECTION
         ========================================= */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 text-center bg-gradient-to-b from-red-50/50 to-white overflow-hidden">
         {/* Abstract Background Shapes */}
         <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
         <div className="absolute top-40 right-10 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
         
        <FadeInSection>
          <div className="inline-flex items-center rounded-full border border-red-200 bg-white px-3 py-1 text-sm font-medium text-red-600 mb-6 shadow-sm">
            <Zap className="w-4 h-4 mr-2 animate-pulse" />
            Powerful. Simple. Reliable.
          </div>

          <h1 className="max-w-4xl mx-auto text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            The Operating System for <br />
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Modern Hotel F&B
            </span>
          </h1>

          <p className="relative z-10 mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Simplify hotel ordering, improve guest satisfaction, and streamline
            operations — all in one modern, intuitive platform.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#guest-experience">
                <button className="px-8 py-4 rounded-full bg-red-600 text-white font-bold text-lg shadow-lg shadow-red-200 hover:bg-red-700 hover:scale-105 transition-all">
                  Explore Features
                </button>
              </Link>
          </div>
        </FadeInSection>

        {/* Hero Software Teaser Image */}
        <FadeInSection delay={300} className="mt-16 w-full max-w-5xl relative z-10">
            {/* Replaced generic image with a stylized software mockup container */}
            <div className="relative aspect-[21/9] bg-gray-900 rounded-t-3xl border-[3px] border-b-0 border-gray-200 shadow-2xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                
                <Image 
  src="/images/dash.png" 
  alt="Mobile View" 
  width={200} 
  height={400} 
  className="w-full h-full object-cover" 
/>
                
                {/* Floating UI element example */}
                <div className="absolute bottom-10 left-10 bg-white text-gray-900 p-4 rounded-xl shadow-lg flex items-center gap-3 animate-float-delayed hidden md:flex">
                  <div className="bg-green-100 p-2 rounded-full text-green-600"><Clock size={20}/></div>
                  <div><p className="font-bold">Avg Delivery Time</p><p className="text-sm">18 mins (↓ 5%)</p></div>
                </div>
            </div>
        </FadeInSection>
      </section>


      {/* =========================================
          FEATURE DEEP DIVE 1: The Guest Experience
         ========================================= */}
      <section id="guest-experience" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <FadeInSection className="space-y-8 order-2 md:order-1">
              <div>
                <span className="text-red-600 font-bold tracking-wider uppercase">For Guests</span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">
                  Ordering made effortless.
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                No clunky apps to download. Guests simply scan a QR code to access a beautiful, mobile-optimized menu. They can browse photos, customize their meal, and order in seconds.
              </p>
               <ul className="space-y-4">
                  <FeatureListItem text="Instant QR code access (no app needed)" />
                  <FeatureListItem text="Rich visual menus with item descriptions" />
                  <FeatureListItem text="Real-time order status tracking" />
               </ul>
            </FadeInSection>

            {/* Right: Software Mockup (Mobile) */}
            <FadeInSection delay={200} className="order-1 md:order-2 flex justify-center">
               <div className="relative w-[280px] h-[550px] bg-gray-900 rounded-[3rem] border-[6px] border-gray-800 shadow-2xl overflow-hidden">
                 {/* Notch */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-800 rounded-b-2xl z-20"></div>
                 
                 {/* Screen Content Placeholder */}
                 <div className="w-full h-full bg-white pt-12 px-4 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                       <h4 className="font-bold text-xl">Room Service</h4>
                       <div className="bg-red-100 p-2 rounded-full text-red-600"><Smartphone size={20}/></div>
                    </div>
                    {/* Fake menu items */}
                    <div className="space-y-3">
                       {[1, 2, 3].map(i => (
                          <div key={i} className="flex items-center p-3 bg-gray-50 rounded-xl gap-3">
                             <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                             <div className="flex-1">
                                <p className="font-bold">Menu Item #{i}</p>
                                <p className="text-sm text-gray-500">$24.00</p>
                             </div>
                             <button className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center">+</button>
                          </div>
                       ))}
                    </div>
                    <p className="mt-auto mb-8 text-center text-xs text-gray-400">(Mobile Menu View Screenshot)</p>
                 </div>
               </div>
            </FadeInSection>
          </div>
        </div>
      </section>


      {/* =========================================
          FEATURE DEEP DIVE 2: The Kitchen/Staff
         ========================================= */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Software Mockup (Kitchen Tablet) */}
            <FadeInSection className="flex justify-center">
              <div className="relative w-full max-w-xl aspect-[4/3] bg-gray-800 rounded-2xl border-[6px] border-gray-700 shadow-xl overflow-hidden flex items-center justify-center p-2">
                  {/* Screen Content Placeholder */}
                  <div className="w-full h-full bg-gray-900 p-6 flex flex-col text-white">
                     <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                        <h4 className="font-bold text-2xl flex items-center gap-3"><ChefHat /> Kitchen Display</h4>
                        <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-bold">Live Orders: 5</span>
                     </div>
                     <div className="grid grid-cols-2 gap-4 flex-1">
                        {/* Fake Order Ticket */}
                        <div className="bg-yellow-500/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                           <div className="flex justify-between mb-2 font-bold"><span>Order #204</span> <span>Room 302</span></div>
                           <ul className="text-sm space-y-1 mb-3 opacity-80">
                              <li>1x Club Sandwich (No Mayo)</li>
                              <li>2x Coke Zero</li>
                           </ul>
                           <div className="text-xs font-bold uppercase tracking-wider text-yellow-400 animate-pulse">Pending - 12m ago</div>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg opacity-50 flex items-center justify-center">
                           <p>(More Tickets...)</p>
                        </div>
                     </div>
                  </div>
              </div>
            </FadeInSection>

            {/* Right: Text Content */}
            <FadeInSection delay={200} className="space-y-8">
              <div>
                 <span className="text-red-600 font-bold tracking-wider uppercase">For Staff</span>
                 <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">
                   Total kitchen clarity.
                 </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Orders flash instantly on the Kitchen Display System (KDS). Chefs see exactly what to prepare, any special requests, and how long the order has been waiting. No lost tickets, no confusion.
              </p>
               <ul className="space-y-4">
                  <FeatureListItem text="Real-time KDS (Kitchen Display System)" />
                  <FeatureListItem text="Color-coded status indicators and timers" />
                  <FeatureListItem text="Instant waiter notification when food is ready" />
               </ul>
            </FadeInSection>

          </div>
        </div>
      </section>


       {/* =========================================
          ADDITIONAL FEATURES GRID
         ========================================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">More Powerful Capabilities</h2>
            <p className="text-xl text-gray-600">Everything else you need to run a modern F&B operation.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<SlidersHorizontal />}
              title="Smart Customization"
              desc="Easily manage modifiers, portion sizes, and special requests. Let guests build their perfect meal."
            />
             <FeatureCard 
              icon={<LineChart />}
              title="Revenue Analytics"
              desc="Track top-selling items, peak ordering hours, and room service revenue trends via visual dashboards."
            />
             <FeatureCard 
              icon={<Languages />}
              title="Multi-Language Support"
              desc="Menus automatically translate to the guest's preferred language, welcoming international travelers."
            />
             <FeatureCard 
              icon={<Clock />}
              title="Scheduled Ordering"
              desc="Guests can pre-order breakfast the night before, allowing your kitchen to plan ahead efficiently."
            />
             <FeatureCard 
              icon={<ShieldCheck />}
              title="Enterprise Security"
              desc="Bank-grade encryption and secure role-based access control keep hotel and guest data safe."
            />
            <FeatureCard 
              icon={<Monitor />}
              title="Cloud-Based"
              desc="Access your dashboard from any device, anywhere. No expensive on-site servers required."
            />
          </div>
        </div>
      </section>


      {/* =========================================
          FINAL CTA SECTION (Redesigned)
         ========================================= */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"></div>
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 opacity-20 rounded-full filter blur-[100px] translate-x-1/2 translate-y-1/2"></div>
         
         <div className="container relative z-10 mx-auto px-6 text-center">
           <FadeInSection>
             <h2 className="text-4xl md:text-5xl font-bold mb-6">
               Ready to upgrade your hotel?
             </h2>
             <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
               Experience the simplicity of modern design combined with powerful
               technology. Let’s build your next big idea together.
             </p>
 
             <Link href="/contact" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-red-600 rounded-full hover:bg-red-700 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] overflow-hidden">
                 <span className="relative z-10 mr-2">Book our Smart Solution</span>
                 <Zap className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
             </Link>
           </FadeInSection>
         </div>
       </section>
    </main>
  );
}

// ==========================================
// SUB COMPONENTS
// ==========================================

// Simple list item with checkmark
function FeatureListItem({text}: {text: string}) {
   return (
      <li className="flex items-center gap-3">
         <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12"/></svg>
         </div>
         <span className="font-medium text-gray-800">{text}</span>
      </li>
   )
}

// Grid Card Component
function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
   return (
     <FadeInSection className="h-full">
       <div className="h-full p-8 rounded-3xl bg-gray-50 border border-gray-100/50 hover:bg-white hover:border-red-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
         <div className="w-14 h-14 bg-white shadow-sm text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
           {icon}
         </div>
         <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
         <p className="text-gray-600 leading-relaxed">{desc}</p>
       </div>
     </FadeInSection>
   );
 }