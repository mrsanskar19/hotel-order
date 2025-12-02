'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, HelpCircle, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const faqs = [
  {
    id: "item-1",
    question: "What is FoodsLinkX?",
    answer: "FoodsLinkX is a hotel and restaurant order management software that simplifies the way you handle food and service requests. From digital menus to real-time tracking, it helps hotels deliver faster, smarter, and more satisfying guest experiences."
  },
  {
    id: "item-2",
    question: "Do you provide a free demo?",
    answer: "Yes! We currently offer a free demo of the Premium plan. You can explore all the ordering, customization, and tracking features before deciding. No upfront payment is required to get started."
  },
  {
    id: "item-3",
    question: "What plans are available?",
    answer: "FoodsLinkX offers three flexible plans: Starter (for small hotels and cafés), Premium (ideal for mid-sized hotels), and Pro (for large hotels and chains). The Premium demo is available to try right now."
  },
  {
    id: "item-4",
    question: "Can FoodsLinkX integrate with my existing systems?",
    answer: "Absolutely. FoodsLinkX is designed to scale with your business. For Pro users, we support integrations with POS systems, accounting tools, CRM, and even custom APIs to connect with your hotel’s ecosystem."
  },
  {
    id: "item-5",
    question: "Is my hotel and guest data secure?",
    answer: "Yes, data security is our top priority. All information is encrypted in transit and at rest. FoodsLinkX follows industry best practices to ensure your hotel’s data — and your guests’ data — remains private and safe."
  },
  {
    id: "item-6",
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade at any time. Plan changes are seamless, and any billing adjustments will be prorated to match your usage."
  },
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-red-50 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-[20%] left-[-10%] w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="container relative z-10 max-w-4xl py-16 md:py-24 px-6">
        
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-sm border border-red-100 mb-4">
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Help Center
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            How can we <span className="text-red-600">help you?</span>
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Find answers about billing, features, integrations, and more.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto mt-8 group">
            <div className="absolute inset-0 bg-red-200 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
              <Input 
                type="text" 
                placeholder="Search for answers (e.g., 'integration', 'pricing')..." 
                className="w-full h-14 pl-12 pr-4 rounded-full border-gray-200 shadow-lg text-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {filteredFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-white border border-gray-100 rounded-xl px-6 py-2 shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 data-[state=open]:border-red-200 data-[state=open]:ring-1 data-[state=open]:ring-red-100"
                >
                  <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-red-600 hover:no-underline text-left py-4">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-red-500/50" />
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4 pl-8 border-t border-dashed border-gray-100 pt-4 mt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            // No Results State
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No matching results</h3>
              <p className="text-gray-500">Try adjusting your search terms or browse all questions.</p>
              <Button 
                variant="ghost" 
                className="mt-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>

        {/* Still Need Help CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
                <p className="text-gray-400">Can't find the answer you're looking for? Please chat to our friendly team.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg shadow-red-900/20">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Get in Touch
                  </Button>
                </Link>
                <a href="mailto:foodslinkx.com@google.com">
                  <Button size="lg" variant="outline" className="bg-transparent text-white border-gray-600 hover:bg-white hover:text-gray-900">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Support
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}