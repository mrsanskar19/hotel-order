import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "What is Desklet?",
    answer: "Desklet is a comprehensive hotel management software designed to streamline operations, from bookings and pricing to guest management and analytics. Our goal is to provide a single, powerful platform for hotels of all sizes."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial for our Boutique and Resort plans. No credit card is required to sign up. You can explore all the features and see how Desklet can benefit your business."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer different levels of support based on your plan. All plans include access to our extensive documentation and AI-powered chatbot. The Boutique plan includes email support, the Resort plan adds priority phone support, and the Enterprise plan comes with a dedicated account manager and 24/7/365 support."
  },
  {
    question: "Can Desklet integrate with my existing systems?",
    answer: "Desklet is designed to be the all-in-one solution. For our Enterprise customers, we offer custom integrations with other systems like accounting software, POS systems, and third-party marketing platforms. Please contact our sales team to discuss your specific needs."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We take data security very seriously. All data is encrypted in transit and at rest. We use industry-standard security practices and are compliant with major data protection regulations. Your data and your guests' data are safe with us."
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle."
  }
];

export default function FaqPage() {
  return (
    <div className="py-12 md:py-24">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-muted-foreground">Find answers to common questions about Desklet.</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
