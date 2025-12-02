'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Shield, 
  Lock, 
  Database, 
  Share2, 
  Eye, 
  UserCheck, 
  Cookie, 
  RefreshCw, 
  Mail,
  FileText
} from 'lucide-react';

// --- Configuration ---
const sections = [
  { id: 'intro', title: 'Introduction', icon: FileText },
  { id: 'collection', title: 'Data Collection', fullTitle: 'Information We Collect', icon: Database },
  { id: 'usage', title: 'Data Usage', fullTitle: 'How We Use Data', icon: Eye },
  { id: 'sharing', title: 'Sharing', fullTitle: 'Data Sharing', icon: Share2 },
  { id: 'security', title: 'Security', fullTitle: 'Data Security', icon: Lock },
  { id: 'rights', title: 'Your Rights', fullTitle: 'Your Rights', icon: UserCheck },
  { id: 'cookies', title: 'Cookies', fullTitle: 'Cookies & Tracking', icon: Cookie },
  { id: 'updates', title: 'Updates', fullTitle: 'Policy Updates', icon: RefreshCw },
  { id: 'contact', title: 'Contact', fullTitle: 'Contact Us', icon: Mail },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('intro');

  // Scroll Spy Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -50% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset calculation for sticky headers (mobile vs desktop)
      const offset = 140; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-red-100 selection:text-red-900">
      
      {/* --- HERO HEADER --- */}
      <section className="bg-white border-b border-gray-200 py-12 md:py-16 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-red-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
        
        <div className="container max-w-5xl mx-auto relative z-10 text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Shield className="w-3 h-3 md:w-4 md:h-4" />
              <span>Legal Documentation</span>
           </div>
           
           <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6">
             Privacy Policy
           </h1>
           
           <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-2">
             Your privacy is critically important to us. This document explains how FoodsLinkX 
             collects, uses, and safeguards your information transparently.
           </p>
           
           <div className="mt-6 md:mt-8 text-xs md:text-sm text-gray-400">
              Last Updated: <span className="font-semibold text-gray-700">December 2025</span>
           </div>
        </div>
      </section>

      {/* --- MOBILE STICKY NAVIGATION (Visible only on lg and below) --- */}
      <div className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
         <div className="flex overflow-x-auto py-3 px-4 gap-2 no-scrollbar snap-x">
            {sections.map((item) => (
               <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                     "flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-all border snap-start whitespace-nowrap",
                     activeSection === item.id 
                        ? "bg-red-50 text-red-700 border-red-200 shadow-sm" 
                        : "bg-white text-gray-600 border-gray-200"
                  )}
               >
                  {item.title}
               </button>
            ))}
         </div>
      </div>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <div className="container max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Sticky Table of Contents (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-3">
             <div className="sticky top-24 space-y-1">
                <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">On this page</p>
                {sections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-left",
                      activeSection === item.id 
                        ? "bg-red-50 text-red-700 shadow-sm ring-1 ring-red-100" 
                        : "text-gray-600 hover:bg-white hover:text-gray-900"
                    )}
                  >
                    <item.icon className={cn("w-4 h-4", activeSection === item.id ? "text-red-600" : "text-gray-400")} />
                    {item.fullTitle || item.title}
                  </button>
                ))}
             </div>
          </aside>

          {/* RIGHT: Content Sections */}
          <div className="col-span-12 lg:col-span-8 lg:col-start-5 space-y-12">
            
            {/* 1. Introduction */}
            <SectionWrapper id="intro" title="1. Introduction">
              <p>
                FoodsLinkX is a hotel and restaurant order management software. 
                We respect your privacy and are committed to protecting the personal 
                information you share with us. This document outlines our data 
                practices and your rights.
              </p>
            </SectionWrapper>

            {/* 2. Information We Collect */}
            <SectionWrapper id="collection" title="2. Information We Collect">
              <p className="mb-4">We collect specific data to ensure the best service delivery:</p>
              <ul className="grid sm:grid-cols-2 gap-4">
                 <DataCard title="Account Data" desc="Name, email address, phone number, and hotel details provided at signup." />
                 <DataCard title="Order Data" desc="Guest orders, menu selections, and transaction records." />
                 <DataCard title="Technical Data" desc="IP address, browser type, and device info for security." />
              </ul>
            </SectionWrapper>

            {/* 3. How We Use Data */}
            <SectionWrapper id="usage" title="3. How We Use Your Information">
              <p className="mb-4">We use the collected information to:</p>
              <ul className="space-y-3">
                <ListItem>Provide and improve our software services.</ListItem>
                <ListItem>Process hotel and guest orders securely.</ListItem>
                <ListItem>Communicate updates, support, and marketing offers (only if you opt-in).</ListItem>
                <ListItem>Ensure security, prevent fraud, and comply with legal obligations.</ListItem>
              </ul>
            </SectionWrapper>

            {/* 4. Data Sharing */}
            <SectionWrapper id="sharing" title="4. Data Sharing">
              <p className="mb-4">
                We <strong className="text-gray-900">do not sell</strong> your personal information. Data may only be shared with:
              </p>
              <ul className="space-y-3">
                <ListItem>Trusted service providers who support our platform (e.g., hosting, payments).</ListItem>
                <ListItem>Authorities, if required by law or to protect rights and safety.</ListItem>
              </ul>
            </SectionWrapper>

            {/* 5 & 6. Data Security Combined for flow */}
            <SectionWrapper id="security" title="5. Data Security">
              <p className="mb-4">
                We implement a variety of security measures to maintain the safety of your personal information.
                Your data is contained behind secured networks and is only accessible by a limited
                number of persons with special access rights.
              </p>
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-800 flex items-start gap-3">
                 <Lock className="w-5 h-5 mt-0.5 shrink-0" />
                 <p>All sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology and industry-standard storage encryption.</p>
              </div>
            </SectionWrapper>

            {/* 7. Your Rights */}
            <SectionWrapper id="rights" title="7. Your Rights">
              <p className="mb-4">Depending on your region, you may have the right to:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">Access your personal data</div>
                <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">Request corrections</div>
                <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">Request deletion of data</div>
                <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">Opt-out of marketing</div>
              </div>
            </SectionWrapper>

            {/* 8. Cookies */}
            <SectionWrapper id="cookies" title="8. Cookies & Tracking">
              <p>
                FoodsLinkX uses cookies and similar technologies to improve your 
                experience, analyze usage, and ensure security. You can manage 
                cookies through your browser settings.
              </p>
            </SectionWrapper>

            {/* 9. Updates */}
            <SectionWrapper id="updates" title="9. Updates to Policy">
              <p>
                We may update this Privacy Policy from time to time. Updates will 
                be posted on this page with a revised "Last Updated" date.
              </p>
            </SectionWrapper>

            {/* 10. Contact Us */}
            <SectionWrapper id="contact" title="10. Contact Us">
              <p className="mb-6">
                If you have any questions about this Privacy Policy or how we 
                handle your data, please contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <a href="mailto:foodslinkx@gmail.com" className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-red-200 hover:shadow-md transition-all group w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                       <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                       <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">General Support</div>
                       <div className="text-gray-900 font-semibold truncate">foodslinkx@gmail.com</div>
                    </div>
                 </a>
                 <a href="mailto:foodlinkx.com@gmail.com" className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-red-200 hover:shadow-md transition-all group w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                       <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                       <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Corporate</div>
                       <div className="text-gray-900 font-semibold truncate">foodlinkx.com@gmail.com</div>
                    </div>
                 </a>
              </div>
            </SectionWrapper>

          </div>
        </div>
      </div>
    </main>
  );
}

// --- Sub Components ---

function SectionWrapper({ id, title, children }: { id: string, title: string, children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
       <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
         {title}
       </h2>
       <div className="text-gray-600 leading-7 text-base md:text-lg">
         {children}
       </div>
       <div className="h-px bg-gray-100 w-full mt-8 md:mt-12" />
    </section>
  )
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
       <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 shrink-0" />
       <span>{children}</span>
    </li>
  )
}

function DataCard({ title, desc }: { title: string, desc: string }) {
  return (
    <li className="bg-white border border-gray-200 p-4 rounded-lg">
       <strong className="block text-gray-900 mb-1 text-sm md:text-base">{title}</strong>
       <span className="text-xs md:text-sm text-gray-500 leading-snug">{desc}</span>
    </li>
  )
}