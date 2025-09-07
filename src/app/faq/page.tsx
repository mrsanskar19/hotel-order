'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "What is FoodsLinkX?",
    answer:
      "FoodsLinkX is a hotel and restaurant order management software that simplifies the way you handle food and service requests. From digital menus to real-time tracking, it helps hotels deliver faster, smarter, and more satisfying guest experiences."
  },
  {
    question: "Do you provide a free demo?",
    answer:
      "Yes! We currently offer a free demo of the Premium plan. You can explore all the ordering, customization, and tracking features before deciding. No upfront payment is required to get started."
  },
  {
    question: "What plans are available?",
    answer:
      "FoodsLinkX offers three flexible plans: Starter (for small hotels and cafés), Premium (ideal for mid-sized hotels), and Pro (for large hotels and chains). The Premium demo is available to try right now."
  },
  {
    question: "Can FoodsLinkX integrate with my existing hotel systems?",
    answer:
      "Absolutely. FoodsLinkX is designed to scale with your business. For Pro users, we support integrations with POS systems, accounting tools, CRM, and even custom APIs to connect with your hotel’s ecosystem."
  },
  {
    question: "Is my hotel and guest data secure?",
    answer:
      "Yes, data security is our top priority. All information is encrypted in transit and at rest. FoodsLinkX follows industry best practices to ensure your hotel’s data — and your guests’ data — remains private and safe."
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade at any time. Plan changes are seamless, and any billing adjustments will be prorated to match your usage."
  },
];

export default function FaqPage() {
  return (
    <div className="py-12 md:py-24 bg-white">
      <div className="container max-w-3xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers about FoodsLinkX and how it can help your hotel or restaurant.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-xl px-4 py-2 hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-lg font-semibold text-left hover:text-red-600 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

