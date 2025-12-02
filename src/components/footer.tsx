'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone, 
  Heart,
  ArrowRight
} from 'lucide-react';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Footer() {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith('/dashboard') || pathname.startsWith('/hotel');

  // Simple mini-footer for dashboard views
  if (hideFooter) {
    return (
      <div className="py-6 border-t bg-white text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} FoodsLinkX. All rights reserved.</p>
      </div>
    );
  }

  return (
    <footer className="bg-white border-t border-red-100 pt-16 pb-8 relative overflow-hidden">
      
      {/* Decorative Background Blur */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-red-50/40 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
          
          {/* COLUMN 1: Brand & Socials */}
          <div className="space-y-6">
            <Logo />
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              The smart operating system for modern hotels. Simplify orders, 
              delight guests, and grow revenue with FoodsLinkX.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialIcon href="#" icon={<Facebook size={18} />} />
              <SocialIcon href="#" icon={<Twitter size={18} />} />
              <SocialIcon href="#" icon={<Instagram size={18} />} />
              <SocialIcon href="#" icon={<Linkedin size={18} />} />
              <SocialIcon href="#" icon={<Youtube size={18} />} />
            </div>
          </div>

          {/* COLUMN 2: Product Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Product</h3>
            <ul className="space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/features" label="Features" />
              <FooterLink href="/pricing" label="Pricing" />
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/faq" label="FAQ" />
            </ul>
          </div>

          {/* COLUMN 3: Legal & Support */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Support</h3>
            <ul className="space-y-3">
              <FooterLink href="/contact" label="Contact Support" />
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Service" />
              <FooterLink href="/security" label="Security" />
              <FooterLink href="/cookies" label="Cookie Settings" />
            </ul>
          </div>

          {/* COLUMN 4: Contact Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="w-5 h-5 text-red-600 shrink-0" />
                <span>
                  Shanti Nagar, Bhiwandi<br />
                  Maharashtra, 421302
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600 group cursor-pointer hover:text-red-600 transition-colors">
                <Mail className="w-5 h-5 text-red-600 shrink-0" />
                <span>foodlinkx@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600 group cursor-pointer hover:text-red-600 transition-colors">
                <Phone className="w-5 h-5 text-red-600 shrink-0" />
                <span>+91 88620 00814</span>
              </li>
            </ul>

            <div className="mt-6">
               <Link href="/contact">
                  <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300">
                    Book a Demo <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
               </Link>
            </div>
          </div>
          
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-gray-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          
          {/* Copyright */}
          <div className="text-gray-500">
            © {new Date().getFullYear()} FoodsLinkX. All rights reserved.
          </div>

          {/* Developer Credit */}
          <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 hover:border-red-200 transition-colors">
             <span>Designed & Developed by</span>
             <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
             <span className="font-semibold text-gray-900">Sanskarut Tech</span>
          </div>

        </div>
      </div>
    </footer>
  );
}

// --- Sub Components ---

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-sm text-gray-500 hover:text-red-600 hover:translate-x-1 transition-all duration-200 inline-block"
      >
        {label}
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-600 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-sm"
    >
      {icon}
    </a>
  );
}