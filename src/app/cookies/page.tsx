'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Cookie, 
  Info, 
  Settings, 
  ShieldCheck, 
  BarChart3, 
  Zap, 
  Mail, 
  Globe,
  CheckCircle2,
  Menu
} from 'lucide-react';

// --- Configuration ---
const sections = [
  { id: 'what', title: '1. Definition', fullTitle: '1. What Are Cookies?', icon: Info },
  { id: 'usage', title: '2. Usage', fullTitle: '2. Why We Use Cookies', icon: CheckCircle2 },
  { id: 'types', title: '3. Types', fullTitle: '3. Types of Cookies', icon: Cookie },
  { id: 'control', title: '4. Control', fullTitle: '4. Your Choices', icon: Settings },
  { id: 'contact', title: '5. Contact', fullTitle: '5. Contact Us', icon: Mail },
];

export default function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState('what');

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
      // Offset for sticky headers
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
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-red-50 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-orange-50 rounded-full blur-2xl opacity-50 -translate-x-1/3 translate-y-1/3" />
        
        <div className="container max-w-5xl mx-auto relative z-10 text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Cookie className="w-3 h-3 md:w-4 md:h-4" />
              <span>Digital Experience</span>
           </div>
           
           <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6">
             Cookie Policy
           </h1>
           
           <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-2">
             This policy explains how FoodsLinkX uses cookies and similar technologies 
             to recognize you when you visit our website.
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
          
          {/* LEFT: Sticky Sidebar Navigation (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-3">
             <div className="sticky top-24 space-y-1">
                <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Policy Sections</p>
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
            
            {/* 1. What Are Cookies */}
            <SectionWrapper id="what" title="1. What Are Cookies?">
              <p>
                Cookies are small data files that are placed on your computer or mobile device when 
                you visit a website. Cookies are widely used by website owners in order to make 
                their websites work, or to work more efficiently, as well as to provide 
                reporting information.
              </p>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3 text-sm text-blue-800">
                 <Globe className="w-5 h-5 mt-0.5 shrink-0" />
                 <p>Cookies set by the website owner (FoodsLinkX) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies".</p>
              </div>
            </SectionWrapper>

            {/* 2. Why We Use Cookies */}
            <SectionWrapper id="usage" title="2. Why We Use Cookies">
              <p className="mb-4">
                We use cookies for several reasons. Some cookies are required for technical 
                reasons in order for our website to operate, and we refer to these as 
                "essential" or "strictly necessary" cookies.
              </p>
              <p>
                Other cookies also enable us to track and target the interests of our users 
                to enhance the experience on our Online Properties.
              </p>
            </SectionWrapper>

            {/* 3. Types of Cookies */}
            <SectionWrapper id="types" title="3. Types of Cookies We Use">
              <p className="mb-6">The specific types of first and third-party cookies served through our website are detailed below:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                 <CookieCard 
                    title="Strictly Necessary" 
                    icon={<ShieldCheck className="w-5 h-5 text-green-600" />}
                    desc="Essential to provide you with services available through our website (e.g., secure login, page navigation)."
                 />
                 <CookieCard 
                    title="Performance" 
                    icon={<Zap className="w-5 h-5 text-yellow-600" />}
                    desc="Used to enhance the performance and functionality of our website but are non-essential to their use."
                 />
                 <CookieCard 
                    title="Analytics" 
                    icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
                    desc="Collect information in aggregate form to help us understand how our website is being used."
                 />
                 <CookieCard 
                    title="Customization" 
                    icon={<Settings className="w-5 h-5 text-purple-600" />}
                    desc="Help us customize our marketing campaigns and website content for you."
                 />
              </div>
            </SectionWrapper>

            {/* 4. Control Cookies */}
            <SectionWrapper id="control" title="4. How You Can Control Cookies">
              <p className="mb-4">
                You have the right to decide whether to accept or reject cookies. You can 
                exercise your cookie rights by setting your preferences in the Cookie 
                Consent Manager.
              </p>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                 <strong className="block text-gray-900 mb-2">Browser Controls</strong>
                 <p className="text-sm text-gray-500 mb-4">
                    Most web browsers allow you to control cookies through their settings preferences. 
                    Note that if you disable cookies, some features of our site may not function properly.
                 </p>
                 <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-white border rounded text-xs text-gray-600">Chrome</span>
                    <span className="px-2 py-1 bg-white border rounded text-xs text-gray-600">Safari</span>
                    <span className="px-2 py-1 bg-white border rounded text-xs text-gray-600">Firefox</span>
                    <span className="px-2 py-1 bg-white border rounded text-xs text-gray-600">Edge</span>
                 </div>
              </div>
            </SectionWrapper>

            {/* 5. Contact Us */}
            <SectionWrapper id="contact" title="5. Contact Us">
              <p className="mb-6">
                If you have any questions about our use of cookies or other technologies, 
                please email us at:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <a href="mailto:foodslinkx@gmail.com" className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-red-200 hover:shadow-md transition-all group w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                       <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                       <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Privacy Team</div>
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

function CookieCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md hover:border-red-100 transition-all">
       <div className="flex items-center gap-2 mb-2">
          {icon}
          <strong className="text-gray-900 text-sm md:text-base">{title}</strong>
       </div>
       <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  )
}