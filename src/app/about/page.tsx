'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { 
  Users, 
  Target, 
  Lightbulb, 
  Rocket, 
  HeartHandshake, 
  Trophy,
  ChefHat,
  Globe2,
  Clock
} from 'lucide-react';

// --- Scroll Animation Hook ---
function useOnScreen(options: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Only trigger once
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, isVisible] as const;
}

// --- Reusable Animated Section ---
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

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground overflow-hidden">
      
      {/* =========================================
          HERO SECTION
         ========================================= */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 text-center bg-gradient-to-b from-red-50/50 to-white">
        {/* Abstract Background Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        <FadeInSection>
          <div className="inline-flex items-center rounded-full border border-red-200 bg-white px-3 py-1 text-sm font-medium text-red-600 mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-red-600 mr-2 animate-pulse" />
            Redefining Hospitality Tech
          </div>
          
          <h1 className="max-w-4xl mx-auto text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            We Build Software That <br />
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Feeds The World
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed mb-10">
            FoodsLinkX isn't just an ordering system. It's the bridge between hungry guests 
            and the busy kitchens that serve them. We turn chaos into coordinated service.
          </p>
        </FadeInSection>
      </section>

      {/* =========================================
          STATS STRIP
         ========================================= */}
      <div className="border-y border-gray-100 bg-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Hotels", value: "150+" },
              { label: "Orders Processed", value: "2M+" },
              { label: "Uptime Reliability", value: "99.9%" },
              { label: "Support Team", value: "24/7" },
            ].map((stat, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="space-y-2">
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================
          OUR STORY (Split Layout)
         ========================================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text */}
            <FadeInSection className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                From a Noisy Kitchen to <br /> a Silent Symphony.
              </h2>
              <div className="w-20 h-1 bg-red-600 rounded-full" />
              <p className="text-lg text-gray-600 leading-relaxed">
                It started with a simple observation: Hotels were struggling. Front desks were overwhelmed with phone calls, kitchens were misreading handwritten tickets, and guests were waiting too long for their food.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We built FoodsLinkX to solve this specific problem. We wanted to create a platform where a guest could tap a button, and a chef could see the order instantly. No phones, no miscommunication, just seamless service.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-semibold">
                Today, we power F&B operations for boutique hotels and luxury resorts alike.
              </p>
            </FadeInSection>

            {/* Right: Visual Abstract */}
            <FadeInSection delay={200}>
              <div className="relative aspect-square md:aspect-[4/3] bg-gray-50 rounded-2xl border border-gray-100 p-8 flex items-center justify-center overflow-hidden group">
                 {/* Decorative Background Grid */}
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                 
                 {/* Floating Cards Animation */}
                 <div className="relative z-10 w-full max-w-sm space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4 transform translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
                       <div className="p-3 bg-red-100 rounded-full text-red-600"><ChefHat size={24} /></div>
                       <div>
                          <p className="font-bold text-gray-900">Kitchen Display</p>
                          <p className="text-xs text-gray-500">New Order #402 Received</p>
                       </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4 transform -translate-x-4 group-hover:translate-x-0 transition-transform duration-500 delay-100">
                       <div className="p-3 bg-blue-100 rounded-full text-blue-600"><Globe2 size={24} /></div>
                       <div>
                          <p className="font-bold text-gray-900">Guest Portal</p>
                          <p className="text-xs text-gray-500">Menu browsed by Room 305</p>
                       </div>
                    </div>
                 </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* =========================================
          CORE VALUES GRID
         ========================================= */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600">These principles guide every line of code we write and every feature we design.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Target className="w-8 h-8" />}
              title="Guest Obsessed"
              desc="We design for the guest first. If it's not intuitive for a grandmother in Room 201, it's not good enough."
            />
            <ValueCard 
              icon={<Lightbulb className="w-8 h-8" />}
              title="Innovation"
              desc="We don't just digitize paper menus. We use data to predict trends and optimize hotel revenue."
            />
            <ValueCard 
              icon={<HeartHandshake className="w-8 h-8" />}
              title="Integrity"
              desc="We believe in transparent pricing, secure data handling, and long-term partnerships, not quick sales."
            />
            <ValueCard 
              icon={<Rocket className="w-8 h-8" />}
              title="Speed"
              desc="In hospitality, seconds matter. Our platform is optimized for speed, ensuring zero lag during rush hour."
            />
            <ValueCard 
              icon={<Trophy className="w-8 h-8" />}
              title="Excellence"
              desc="We strive for bug-free code and pixel-perfect designs. 'Good enough' is not in our vocabulary."
            />
            <ValueCard 
              icon={<Users className="w-8 h-8" />}
              title="Community"
              desc="We are building a community of forward-thinking hoteliers who share insights and grow together."
            />
          </div>
        </div>
      </section>

      {/* =========================================
          TEAM / LEADERSHIP
         ========================================= */}
      {/* <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Meet The Builders</h2>
          </FadeInSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            
            <TeamMember 
               name="Alex Johnson" 
               role="Founder & CEO" 
               desc="Visionary with 15 years in Hotel Management."
            />
             
             <TeamMember 
               name="Sarah Lee" 
               role="Head of Product" 
               desc="UX expert obsessed with seamless flows."
            />
             
             <TeamMember 
               name="David Chen" 
               role="Lead Engineer" 
               desc="Full-stack wizard ensuring 99.9% uptime."
            />
             
             <TeamMember 
               name="Maria Garcia" 
               role="Customer Success" 
               desc="Ensuring every hotel onboarding is smooth."
            />
          </div>
        </div>
      </section> */}

      {/* =========================================
          CTA SECTION
         ========================================= */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to modernize your hotel?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join the revolution. Let’s make your room service faster, smarter, and more profitable.
            </p>

            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] overflow-hidden"
            >
              <span className="relative z-10 mr-2">Book our Smart Solution</span>
              <Clock className="w-5 h-5 relative z-10 group-hover:animate-spin-slow" />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-red-700/50" />
            </Link>
          </FadeInSection>
        </div>
      </section>
    </main>
  );
}

// --- Sub Components ---

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <FadeInSection className="h-full">
      <div className="h-full p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </FadeInSection>
  );
}

function TeamMember({ name, role, desc }: { name: string, role: string, desc: string }) {
  return (
    <FadeInSection>
       <div className="group relative">
          <div className="relative w-48 h-48 mx-auto mb-6 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-lg group-hover:border-red-100 transition-colors">
            {/* Placeholder Avatar - Replace with <Image> in real app */}
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
               <Users size={64} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <p className="text-red-600 font-medium text-sm mb-2">{role}</p>
          <p className="text-gray-500 text-sm max-w-[200px] mx-auto">{desc}</p>
       </div>
    </FadeInSection>
  )
}