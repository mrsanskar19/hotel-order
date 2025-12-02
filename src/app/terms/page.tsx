'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  CheckCircle, 
  User, 
  ShieldAlert, 
  Cpu, 
  Scale, 
  Mail, 
  ArrowRight,
  AlertTriangle,
  Gavel,
  Menu
} from 'lucide-react';

// --- Configuration ---
const sections = [
  { id: 'acceptance', title: '1. Acceptance', fullTitle: '1. Acceptance of Terms', icon: CheckCircle },
  { id: 'usage', title: '2. Usage', fullTitle: '2. Use of Service', icon: FileText },
  { id: 'accounts', title: '3. Accounts', fullTitle: '3. User Accounts', icon: User },
  { id: 'ip', title: '4. IP Rights', fullTitle: '4. Intellectual Property', icon: Cpu },
  { id: 'termination', title: '5. Termination', fullTitle: '5. Termination', icon: ShieldAlert },
  { id: 'law', title: '6. Law', fullTitle: '6. Governing Law', icon: Scale },
  { id: 'contact', title: '7. Contact', fullTitle: '7. Contact Us', icon: Mail },
];

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState('acceptance');

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
      // Offset for sticky header
      const offset = 120; 
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
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-red-50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-orange-50 rounded-full blur-2xl opacity-60 -translate-x-1/3 translate-y-1/3" />

        <div className="container max-w-5xl mx-auto relative z-10 text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Gavel className="w-3 h-3 md:w-4 md:h-4" />
              <span>Legal Agreement</span>
           </div>
           
           <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 text-gray-900">
             Terms of Service
           </h1>
           
           <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-2">
             Please read these terms carefully before using FoodsLinkX. 
             They govern your relationship with our services.
           </p>

           <div className="mt-6 md:mt-8 text-xs md:text-sm text-gray-400">
              Effective Date: <span className="font-semibold text-gray-700">December 1, 2025</span>
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
          
          {/* LEFT: Sticky Sidebar Navigation (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-3">
             <div className="sticky top-24 space-y-1">
                <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Agreement Sections</p>
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
                    {item.fullTitle}
                  </button>
                ))}
             </div>
          </aside>

          {/* RIGHT: Content Sections */}
          <div className="col-span-12 lg:col-span-8 lg:col-start-5 space-y-12">
            
            {/* 1. Acceptance */}
            <SectionWrapper id="acceptance" title="1. Acceptance of Terms">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4 text-blue-900 text-sm">
                 By accessing our service, you confirm you have read, understood, and agreed to be bound by these terms.
              </div>
              <p>
                If you disagree with any part of the terms, then you may not access the service. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </SectionWrapper>

            {/* 2. Use of Service */}
            <SectionWrapper id="usage" title="2. Use of Service">
              <p className="mb-4">
                You agree to use the FoodsLinkX platform only for lawful purposes. You are strictly prohibited from:
              </p>
              <ul className="space-y-3">
                <ListItem>Harassing, abusing, or harming another person or group.</ListItem>
                <ListItem>Transmitting obscene, offensive, or illegal content.</ListItem>
                <ListItem>Disrupting the normal flow of dialogue or technical infrastructure.</ListItem>
                <ListItem>Attempting to reverse engineer or hack the platform.</ListItem>
              </ul>
            </SectionWrapper>

            {/* 3. Accounts */}
            <SectionWrapper id="accounts" title="3. Accounts">
              <p className="mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                 <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <strong className="block text-gray-900 mb-1 text-sm md:text-base">Account Security</strong>
                    <span className="text-xs md:text-sm text-gray-500">You are responsible for safeguarding the password that you use to access the Service.</span>
                 </div>
                 <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <strong className="block text-gray-900 mb-1 text-sm md:text-base">Breach of Terms</strong>
                    <span className="text-xs md:text-sm text-gray-500">Failure to provide accurate info constitutes a breach, resulting in termination.</span>
                 </div>
              </div>
            </SectionWrapper>

            {/* 4. Intellectual Property */}
            <SectionWrapper id="ip" title="4. Intellectual Property">
              <p>
                The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of FoodsLinkX and its licensors.
              </p>
              <p className="mt-4">
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of FoodsLinkX.
              </p>
            </SectionWrapper>

            {/* 5. Termination */}
            <SectionWrapper id="termination" title="5. Termination">
              <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-900">
                 <AlertTriangle className="w-6 h-6 shrink-0 text-red-600 mt-1" />
                 <div>
                    <strong className="block mb-1 text-sm md:text-base">Immediate Suspension</strong>
                    <p className="text-xs md:text-sm opacity-90">We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                 </div>
              </div>
              <p className="mt-4">
                 Upon termination, your right to use the Service will immediately cease.
              </p>
            </SectionWrapper>

            {/* 6. Governing Law */}
            <SectionWrapper id="law" title="6. Governing Law">
              <p>
                These Terms shall be governed and construed in accordance with the laws of our jurisdiction (India/Maharashtra), without regard to its conflict of law provisions.
              </p>
              <p className="mt-2">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </SectionWrapper>

            {/* 7. Contact Us */}
            <SectionWrapper id="contact" title="7. Contact Us">
              <p className="mb-6">
                If you have any questions about these Terms, please contact our legal team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <a href="mailto:foodslinkx@gmail.com" className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-red-200 hover:shadow-md transition-all group w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                       <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                       <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Legal Inquiries</div>
                       <div className="text-gray-900 font-semibold truncate">foodslinkx@gmail.com</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
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
    <section id={id} className="scroll-mt-32 group">
       <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2 group-hover:text-red-700 transition-colors">
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
       <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 shrink-0" />
       <span className="text-gray-700 text-sm md:text-base">{children}</span>
    </li>
  )
}