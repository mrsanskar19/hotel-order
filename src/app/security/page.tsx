'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  Key, 
  Eye, 
  AlertTriangle, 
  CreditCard, 
  RefreshCw, 
  Mail,
  FileCode,
  Users,
  HardDrive,
  Menu
} from 'lucide-react';

// --- Configuration ---
const sections = [
  { id: 'encryption', title: '1. Encryption', fullTitle: '1. Data Encryption', icon: Lock },
  { id: 'infrastructure', title: '2. Infrastructure', fullTitle: '2. Infrastructure Security', icon: Server },
  { id: 'access', title: '3. Access', fullTitle: '3. Access Control', icon: Key },
  { id: 'payment', title: '4. Payment', fullTitle: '4. Payment Security', icon: CreditCard },
  { id: 'audits', title: '5. Audits', fullTitle: '5. Audits & Monitoring', icon: Eye },
  { id: 'response', title: '6. Response', fullTitle: '6. Incident Response', icon: AlertTriangle },
  { id: 'backups', title: '7. Backups', fullTitle: '7. Backups & Recovery', icon: HardDrive },
  { id: 'training', title: '8. Training', fullTitle: '8. Employee Training', icon: Users },
  { id: 'vulnerability', title: '9. Vulnerability', fullTitle: '9. Vulnerability Disclosure', icon: FileCode },
  { id: 'contact', title: '10. Contact', fullTitle: '10. Contact Security', icon: Mail },
];

export default function SecurityPolicyPage() {
  const [activeSection, setActiveSection] = useState('encryption');

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
        <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-red-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-orange-50 rounded-full blur-3xl opacity-30 translate-y-1/2 translate-x-1/2" />
        
        <div className="container max-w-5xl mx-auto relative z-10 text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />
              <span>Security First Architecture</span>
           </div>
           
           <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6">
             Security Policy
           </h1>
           
           <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-2">
             Trust is the foundation of FoodsLinkX. This document outlines the technical 
             measures we implement to protect your data.
           </p>
           
           <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 text-xs md:text-sm text-gray-400">
              <span className="flex items-center justify-center gap-1"><RefreshCw className="w-3 h-3" /> Last Updated: Dec 2025</span>
              <span className="flex items-center justify-center gap-1"><ShieldCheck className="w-3 h-3" /> SSL Secured</span>
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
                <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Table of Contents</p>
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
            
            {/* 1. Encryption */}
            <SectionWrapper id="encryption" title="1. Data Encryption">
              <p className="mb-4">
                We utilize enterprise-grade encryption to protect your data both when it is being transmitted and when it is stored.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                 <TechCard title="In Transit" value="TLS 1.2+ (HTTPS)" desc="All data transmitted between your browser and our servers is encrypted." />
                 <TechCard title="At Rest" value="AES-256" desc="Database and file storage are encrypted using industry-standard algorithms." />
              </div>
            </SectionWrapper>

            {/* 2. Infrastructure */}
            <SectionWrapper id="infrastructure" title="2. Infrastructure Security">
              <p className="mb-4">
                FoodsLinkX is hosted on top-tier cloud providers (e.g., AWS/Vercel) that maintain 
                rigorous physical and logical security controls.
              </p>
              <ul className="space-y-3">
                <ListItem>DDoS protection and Web Application Firewall (WAF) enabled.</ListItem>
                <ListItem>Network segregation using Virtual Private Clouds (VPC).</ListItem>
                <ListItem>Regular system patching and dependency updates.</ListItem>
              </ul>
            </SectionWrapper>

            {/* 3. Access Control */}
            <SectionWrapper id="access" title="3. Access Control">
              <p className="mb-4">
                We strictly limit access to your data based on the principle of least privilege.
              </p>
              <ul className="space-y-3">
                <ListItem><strong>Role-Based Access Control (RBAC):</strong> Employees only access data necessary for their role.</ListItem>
                <ListItem><strong>Multi-Factor Authentication (MFA):</strong> Enforced for all internal administrative access.</ListItem>
                <ListItem><strong>Audit Logs:</strong> All internal access to production data is logged and monitored.</ListItem>
              </ul>
            </SectionWrapper>

             {/* 4. Payment Security */}
             <SectionWrapper id="payment" title="4. Payment Security">
              <p className="mb-4">
                We do not store your credit card information on our servers.
              </p>
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg text-sm text-green-800 flex items-start gap-3">
                 <CreditCard className="w-5 h-5 mt-0.5 shrink-0" />
                 <p className="text-sm">All payments are processed securely by PCI-DSS Level 1 compliant payment providers. We only retain a token for recurring billing.</p>
              </div>
            </SectionWrapper>

            {/* 5. Audits */}
            <SectionWrapper id="audits" title="5. Audits & Monitoring">
              <p className="mb-4">
                We employ continuous monitoring to detect and respond to threats in real-time.
              </p>
              <ul className="space-y-3">
                 <ListItem>Automated vulnerability scanning of code and infrastructure.</ListItem>
                 <ListItem>24/7 logging of system health and security events.</ListItem>
                 <ListItem>Annual third-party security assessments.</ListItem>
              </ul>
            </SectionWrapper>

            {/* 6. Incident Response */}
            <SectionWrapper id="response" title="6. Incident Response">
              <p>
                In the unlikely event of a security breach, we have a detailed Incident Response Plan. 
                Our team is trained to identify, contain, and mitigate threats immediately. 
                We are committed to notifying affected users within 72 hours of confirming a data breach.
              </p>
            </SectionWrapper>

            {/* 7. Backups */}
            <SectionWrapper id="backups" title="7. Backups & Recovery">
              <p className="mb-4">
                We ensure your business continuity through robust backup strategies.
              </p>
               <ul className="grid sm:grid-cols-2 gap-4">
                 <DataCard title="Daily Backups" desc="Automated encrypted backups of all databases." />
                 <DataCard title="Redundancy" desc="Data replicated across multiple availability zones." />
                 <DataCard title="Retention" desc="30-day point-in-time recovery capability." />
                 <DataCard title="Testing" desc="Regular drills to verify restoration integrity." />
              </ul>
            </SectionWrapper>

            {/* 8. Employee Training */}
            <SectionWrapper id="training" title="8. Employee Training">
               <p>
                  Security is a human effort. All FoodsLinkX employees undergo mandatory 
                  security awareness training upon hire and annually thereafter. This includes 
                  phishing simulations, secure coding practices, and data handling procedures.
               </p>
            </SectionWrapper>

            {/* 9. Vulnerability Disclosure */}
            <SectionWrapper id="vulnerability" title="9. Vulnerability Disclosure">
               <p>
                  We value the security research community. If you believe you have found a 
                  vulnerability in FoodsLinkX, please report it to us immediately. 
                  We pledge to investigate all reports and resolve confirmed issues promptly.
               </p>
            </SectionWrapper>

            {/* 10. Contact Us */}
            <SectionWrapper id="contact" title="10. Contact Security">
              <p className="mb-6">
                If you have questions about our security practices or need to report an incident, 
                please contact our security team directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <a href="mailto:foodslinkx@gmail.com" className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-red-200 hover:shadow-md transition-all group w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                       <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Security Team</div>
                       <div className="text-gray-900 font-semibold truncate">foodslinkx@gmail.com</div>
                    </div>
                 </a>
                 <a href="mailto:foodlinkx.com@gmail.com" className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-red-200 hover:shadow-md transition-all group w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                       <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                       <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">General Inquiries</div>
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

function TechCard({ title, value, desc }: { title: string, value: string, desc: string }) {
   return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all hover:bg-white hover:shadow-sm">
         <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</div>
         <div className="text-base md:text-lg font-bold text-gray-900 mb-1">{value}</div>
         <div className="text-xs md:text-sm text-gray-500 leading-snug">{desc}</div>
      </div>
   )
}

function DataCard({ title, desc }: { title: string, desc: string }) {
  return (
    <li className="bg-white border border-gray-200 p-4 rounded-lg transition-all hover:border-red-100 hover:shadow-sm">
       <strong className="block text-gray-900 mb-1 text-sm md:text-base">{title}</strong>
       <span className="text-xs md:text-sm text-gray-500 leading-snug">{desc}</span>
    </li>
  )
}