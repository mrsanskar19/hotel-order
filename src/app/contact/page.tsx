
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // IMPORTANT: Replace with your actual Web3Forms access key
    const access_key = "YOUR_ACCESS_KEY_HERE"; 

    const data = new FormData();
    data.append('access_key', access_key);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('subject', formData.subject);
    data.append('message', formData.message);
    data.append('redirect', 'https://web3forms.com/success');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Message Sent!',
          description: 'Thank you for contacting us. We will get back to you shortly.',
        });
        (e.target as HTMLFormElement).reset();
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        })
      } else {
        toast({
          title: 'Error!',
          description: 'There was an error sending your message. Please try again.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error!',
        description: 'There was an error sending your message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">We'd love to hear from you. Get in touch with us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-6">Get in Touch</h2>
            <Card>
              <CardContent className="p-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" required disabled={isLoading} value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required disabled={isLoading} value={formData.email} onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" required disabled={isLoading} value={formData.subject} onChange={handleInputChange}/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" required rows={6} disabled={isLoading} value={formData.message} onChange={handleInputChange}/>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold font-headline mb-6">Our Information</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Mail className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl">Email</CardTitle>
                    <p className="text-muted-foreground">foodlinkx.com@gmail.com</p>
                  </div>
                </CardHeader>
              </Card>
               <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Phone className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl">Phone</CardTitle>
                    <p className="text-muted-foreground">+91 88620 00814</p>
                  </div>
                </CardHeader>
              </Card>
               <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <MapPin className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl">Office</CardTitle>
                    <p className="text-muted-foreground">Shanti Nagar Bhiwandi,421302</p>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
