'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: 'Missing Information',
        description: 'Please fill out all required fields marked with *.',
        variant: 'destructive',
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please check your email address format.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const access_key = "f52d9000-6612-44a9-931f-77804b8f4d30";

    const data = new FormData();
    data.append('access_key', access_key);
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Message Sent Successfully!',
          description: "We'll be in touch shortly.",
          className: "bg-green-50 border-green-200 text-green-900",
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Please try again later or email us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-red-50 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <div className="container relative z-10 py-16 md:py-24">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border border-red-200 bg-white px-3 py-1 text-sm font-medium text-red-600 mb-4 shadow-sm">
             <MessageSquare className="w-4 h-4 mr-2" />
             24/7 Support
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600">
            Have a question about FoodsLinkX? Interested in a demo? 
            Fill out the form and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Contact Info */}
          <div className="lg:col-span-1 space-y-6">
             <InfoCard 
               icon={<Mail className="h-6 w-6" />}
               title="Email Us"
               content={
                 <>
                   <p>foodlinkx.com@gmail.com</p>
                   <p>foodlinkx@gmail.com</p>
                 </>
               }
             />
             <InfoCard 
               icon={<Phone className="h-6 w-6" />}
               title="Call Us"
               content={<p>+91 88620 00814</p>}
             />
             <InfoCard 
               icon={<MapPin className="h-6 w-6" />}
               title="Visit HQ"
               content={<p>Shanti Nagar, Bhiwandi<br/>Maharashtra, 421302</p>}
             />
             <InfoCard 
               icon={<Clock className="h-6 w-6" />}
               title="Business Hours"
               content={<p>Mon - Fri: 9am - 6pm<br/>Weekend: Support Only</p>}
             />
          </div>

          {/* RIGHT COLUMN: The Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-red-600 to-orange-500 w-full" />
              
              <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-semibold">Full Name *</Label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        disabled={isLoading}
                        className="h-12 border-gray-200 focus:border-red-500 focus:ring-red-100 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-semibold">Email Address *</Label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@hotel.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        disabled={isLoading}
                        className="h-12 border-gray-200 focus:border-red-500 focus:ring-red-100 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone Number</Label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'phone' ? 'scale-[1.02]' : ''}`}>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 ..."
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        disabled={isLoading}
                        className="h-12 border-gray-200 focus:border-red-500 focus:ring-red-100 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-700 font-semibold">Subject *</Label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'subject' ? 'scale-[1.02]' : ''}`}>
                      <Input
                        id="subject"
                        placeholder="Demo Request / Support"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        disabled={isLoading}
                        className="h-12 border-gray-200 focus:border-red-500 focus:ring-red-100 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 font-semibold">Message *</Label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'scale-[1.01]' : ''}`}>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      disabled={isLoading}
                      className="resize-none border-gray-200 focus:border-red-500 focus:ring-red-100 transition-all p-4"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- Sub Component for Info Cards ---
function InfoCard({ icon, title, content }: { icon: React.ReactNode, title: string, content: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300 group">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-1 text-lg">{title}</h3>
        <div className="text-gray-600 leading-relaxed text-sm">
          {content}
        </div>
      </div>
    </div>
  );
}