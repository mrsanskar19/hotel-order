'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image'
import {
  ArrowRight,
  ShoppingCart,
  Settings,
  Zap,
  Shield,
  Globe,
  LineChart,
  Utensils,
  Drumstick,
  IceCream,
  CupSoda,
  Cookie,
  Cake,
  Apple,
  Fish,
  CheckCircle2,
  Smartphone,
  LayoutDashboard,
  ChefHat,
  MessageCircle
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Floating Icons Data
const foodIcons = [
  { icon: Utensils, size: 'w-12 h-12' },
  { icon: Drumstick, size: 'w-16 h-16' },
  { icon: IceCream, size: 'w-14 h-14' },
  { icon: CupSoda, size: 'w-12 h-12' },
  { icon: Cookie, size: 'w-16 h-16' },
  { icon: Cake, size: 'w-10 h-10' },
  { icon: Apple, size: 'w-20 h-20' },
  { icon: Fish, size: 'w-12 h-12' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-background">
      <main className="flex-1">
        
        {/* =========================================
            HERO SECTION
           ========================================= */}
        <section className="relative w-full pb-32 pt-10 md:pb-48 overflow-hidden bg-[#FFF9E6]">
          {/* Animated Background Icons */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {foodIcons.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`absolute text-red-500/20 animate-float`}
                  style={{
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 90}%`,
                    animationDuration: `${10 + Math.random() * 10}s`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                >
                  <Icon className={item.size} />
                </div>
              );
            })}
          </div>

          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="text-center lg:text-left space-y-6">
                <div className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-600 mb-4 animate-fade-in-up">
                  <span className="flex h-2 w-2 rounded-full bg-red-600 mr-2 animate-pulse"></span>
                  The #1 Hotel F&B OS
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                  Smart Hotel <br />
                  <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    Order Management
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Streamline service requests, manage digital menus, and delight guests with 
                  contactless ordering. All synced in real-time.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto text-base h-12 px-8 shadow-xl shadow-red-200 hover:shadow-red-300 transition-all hover:-translate-y-1 bg-red-600 hover:bg-red-700"
                    >
                      Get Start
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto text-base h-12 px-8 border-gray-300 hover:bg-white hover:text-red-600 hover:border-red-200 transition-all"
                    >
                      Explore Features
                    </Button>
                  </Link>
                </div>
                
                <div className="pt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
                  <div className="flex -space-x-2">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                         {String.fromCharCode(64+i)}
                       </div>
                     ))}
                  </div>
                  <p>Trusted by 100+ Hotels</p>
                </div>
              </div>

              {/* Hero Image / Dashboard Mockup */}
              <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none perspective-1000 group">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                
                {/* Main Dashboard Image */}
                <div className="relative rounded-xl border border-gray-200 bg-white shadow-2xl overflow-hidden transform transition-transform duration-500 hover:scale-[1.01] hover:rotate-1">
                   {/* Browser Header Bar Mockup */}
                   <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4 space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   {/* Placeholder for actual image */}
                  
                   <div className=" bg-gray-50 flex items-center justify-center relative">
                      {/* Replace this div with: <img src="/dashboard-hero.png" alt="Dashboard" className="w-full h-full object-cover" /> */}
                                     <Image 
                       src="/images/dash.png" 
                       alt="Mobile View" 
                       width={200} 
                       height={400} 
                       className="w-full h-full object-cover" 
                     />

                      {/* Floating Element 1: Order Notification */}
                      <div className="absolute top-10 right-[-20px] bg-white p-3 rounded-lg shadow-lg border-l-4 border-green-500 animate-float-delayed w-48 hidden md:block">
                         <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-full text-green-600"><CheckCircle2 size={16}/></div>
                            <div>
                               <p className="text-xs font-bold text-gray-800">New Order #204</p>
                               <p className="text-[10px] text-gray-500">Room 302 • Just now</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================
            SOFTWARE VISUAL SHOWCASE (NEW)
           ========================================= */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">One Platform, Three Views</h2>
               <p className="text-gray-600 text-lg">
                 From the front desk to the kitchen, and right into the guest's hand. 
                 See how FoodsLinkX connects your entire hotel ecosystem.
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {/* 1. Guest Mobile View */}
               <ShowcaseCard 
                  title="Guest Ordering" 
                  subtitle="No app download required. Guests scan QR code and order instantly."
                  icon={<Smartphone className="w-5 h-5"/>}
               >
                  <div className="mx-auto w-[200px] h-[400px] border-4 border-gray-800 rounded-[2rem] overflow-hidden bg-gray-100 relative shadow-xl">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-6 bg-gray-800 rounded-b-xl z-10"></div>
                      <div className="h-full w-full bg-white flex flex-col items-center justify-center text-gray-300">
                          <p className="text-xs text-center px-4">Mobile Menu UI <br/> (Insert Image)</p>
                      </div>
                  </div>
               </ShowcaseCard>

               {/* 2. Admin Dashboard */}
               <ShowcaseCard 
                  title="Manager Dashboard" 
                  subtitle="Real-time analytics, menu editing, and staff management."
                  icon={<LayoutDashboard className="w-5 h-5"/>}
               >
                  <Image 
                       src="/images/dash.png" 
                       alt="Mobile View" 
                       width={200} 
                       height={400} 
                       className="w-full h-full object-cover" 
                     />

               </ShowcaseCard>

               {/* 3. Kitchen Display */}
               <ShowcaseCard 
                  title="Kitchen Display System" 
                  subtitle="Digital KDS to track prep times and alert waiters when food is ready."
                  icon={<ChefHat className="w-5 h-5"/>}
               >
                  <div className="w-full aspect-[4/3] bg-gray-900 rounded-lg border border-gray-700 shadow-md flex items-center justify-center">
                      <p className="text-xs text-gray-500">Dark Mode Kitchen View <br/> (Insert Image)</p>
                  </div>
               </ShowcaseCard>
            </div>
          </div>
        </section>


        {/* =========================================
            FEATURES GRID
           ========================================= */}
        <section id="features" className="w-full py-20 bg-gray-50/50">
          <div className="container max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-red-600 font-semibold tracking-wider uppercase text-sm">Key Capabilities</span>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold text-gray-900">
                Everything Your Hotel Needs
              </h2>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<ShoppingCart />}
                title="Seamless Ordering"
                desc="Guests place orders in seconds via QR code. Upsell items with smart recommendations."
              />
              <FeatureCard
                icon={<Settings />}
                title="Menu Customization"
                desc="Update items, portions, and pricing instantly. Mark items 'out of stock' with one click."
              />
              <FeatureCard
                icon={<Zap />}
                title="Real-Time Sync"
                desc="Orders flash instantly in the kitchen. Guests track status live on their phones."
              />
              <FeatureCard
                icon={<LineChart />}
                title="Revenue Analytics"
                desc="Visual graphs for top-selling items, peak hours, and room service revenue."
              />
              <FeatureCard
                icon={<Shield />}
                title="Enterprise Security"
                desc="Role-based access control and end-to-end encryption for hotel and guest data."
              />
              <FeatureCard
                icon={<Globe />}
                title="Cloud Based"
                desc="Access FoodsLinkX from any device—laptop, tablet, or phone. No installation needed."
              />
            </div>
          </div>
        </section>

        {/* =========================================
            HOW IT WORKS
           ========================================= */}
        <section id="how" className="w-full py-24 bg-white relative overflow-hidden">
          <div className="container max-w-5xl relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Up & Running in Minutes</h2>
               <p className="text-gray-500">We made onboarding incredibly simple.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-red-200 via-red-400 to-red-200 z-0"></div>

              <StepCard
                num="1"
                title="Create Account"
                desc="Sign up and set up your hotel profile. No technical skills required."
              />
              <StepCard
                num="2"
                title="Upload Menu"
                desc="Add your food items and categories. Set pricing and images easily."
              />
              <StepCard
                num="3"
                title="Go Live"
                desc="Print QR codes for rooms. Start receiving orders immediately."
              />
            </div>
          </div>
        </section>

        {/* =========================================
            FAQ
           ========================================= */}
       
    <section id="faq" className="relative w-full py-24 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>

      <div className="container relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left: Sticky Heading & CTA */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-red-600 font-bold tracking-wider uppercase text-sm">
                Support
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1]">
                Frequently Asked <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                  Questions
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Everything you need to know about the product and billing. Can’t find the answer you’re looking for?
              </p>
            </div>

            <div className="flex items-center gap-4">
               <Link href="/contact">
                  <Button className="h-12 px-6 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200 transition-all hover:scale-105">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat to Support
                  </Button>
               </Link>
            </div>
          </div>

          {/* Right: Floating Accordion Cards */}
          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
    {
      q: 'What is FoodsLinkX?',
      a: 'FoodsLinkX is a cloud-based operating system for hotel food & beverage management, handling everything from digital menus to kitchen display systems.',
    },
    {
      q: 'Do guests need to download an app?',
      a: 'No! Guests simply scan a QR code using their phone camera to access the menu and place orders via the web browser.',
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes, we offer a 14-day full feature trial so you can test the system in your hotel environment.',
    },
    {
      q: 'Can I manage multiple hotel branches?',
      a: 'Absolutely. Our Super Admin dashboard allows you to toggle between different properties and view aggregated reports.',
    },
  ].map((f, i) => (
                <AccordionItem 
                  key={i} 
                  value={`faq-${i}`} 
                  className="border border-gray-100 bg-white rounded-2xl px-6 shadow-sm hover:shadow-md transition-all duration-300 data-[state=open]:border-red-200 data-[state=open]:ring-1 data-[state=open]:ring-red-100 data-[state=open]:bg-red-50/10"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-800 hover:text-red-600 hover:no-underline py-6 [&[data-state=open]>svg]:text-red-600">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed text-base pb-6">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>

        {/* =========================================
            FINAL CTA
           ========================================= */}
        <section className="w-full py-24 bg-gradient-to-br from-red-700 to-red-600 text-white text-center px-4 relative overflow-hidden">
           {/* Background Circles */}
           <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Transform Your Room Service Today
            </h2>
            <p className="mb-10 text-lg md:text-xl text-red-100 leading-relaxed max-w-2xl mx-auto">
              Join hundreds of hotels increasing F&B revenue by 30% with FoodsLinkX.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-red-600 hover:bg-gray-100 hover:scale-105 transition-all font-bold h-14 px-8 text-lg shadow-lg"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/contact">
                 <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white-400 text-white bg-red-600 hover:bg-red-700 hover:text-white h-14 px-8 text-lg"
                 >
                    Contact Sales
                 </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ==========================================
// SUB COMPONENTS
// ==========================================

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="group relative p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Red accent line on hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      
      <div className="h-14 w-14 mb-6 flex items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function StepCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="relative flex flex-col items-center text-center p-6 bg-white rounded-xl z-10">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white border-4 border-red-50 text-red-600 text-2xl font-bold shadow-sm mb-6">
        {num}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function ShowcaseCard({ children, title, subtitle, icon }: { children: React.ReactNode, title: string, subtitle: string, icon: React.ReactNode }) {
   return (
      <div className="flex flex-col gap-4">
         <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            {children}
         </div>
         <div className="text-center md:text-left px-2">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-red-600 font-semibold">
               {icon}
               <span>{title}</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{subtitle}</p>
         </div>
      </div>
   )
}