
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Code, IterationCcw, Rocket, CheckCircle, Lightbulb, Zap, Database, Shield, Globe } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from 'react';


export default function Home() {
    const plugin = useRef(
      Autoplay({ delay: 3000, stopOnInteraction: true })
    )

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[80vh] flex items-center justify-center text-center">
          <Image
            src="/hero.png"
            alt="Hero Background"
            fill
            objectFit="cover"
            className="z-0"
            data-ai-hint="hotel lobby background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
          <div className="relative z-20 container px-4 md:px-6 animate-fade-in-up">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl xl:text-6xl/none font-headline">
                  Effortless Hotel Order Management with Desklet
                </h1>
                <p className="max-w-[600px] mx-auto text-gray-700 md:text-xl">
                  Desklet is the all-in-one, platform-independent solution to streamline your hotel's operations. From booking to checkout, manage everything with a user-friendly interface.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Link href="/signup">
                  <Button size="lg">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button size="lg" variant="outline" className="text-gray-900 border-gray-400 hover:bg-gray-100 hover:text-gray-900">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="w-full py-24 md:py-32 lg:py-40 bg-white">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in-up mb-12">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">The Ultimate Toolkit for Hotel Management</h2>
                     <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Desklet provides everything you need to enhance guest experiences and boost your efficiency.
                    </p>
                </div>
                <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-start gap-4 animate-fade-in-up [animation-delay:200ms]">
                        <Database className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-bold font-headline">Centralized History</h3>
                            <p className="mt-1 text-muted-foreground">Securely store and access all guest and payment history in one place.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 animate-fade-in-up [animation-delay:300ms]">
                        <Zap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-bold font-headline">Effortless Ordering</h3>
                            <p className="mt-1 text-muted-foreground">A simple, intuitive interface for your staff to take guest orders quickly and accurately.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 animate-fade-in-up [animation-delay:400ms]">
                        <IterationCcw className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-bold font-headline">User-Friendly Interface</h3>
                            <p className="mt-1 text-muted-foreground">Designed for ease of use, reducing training time and increasing staff productivity.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 animate-fade-in-up [animation-delay:500ms]">
                        <Globe className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-bold font-headline">Platform Independent</h3>
                            <p className="mt-1 text-muted-foreground">Access Desklet from any device, anywhere. All you need is a web browser.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4 animate-fade-in-up [animation-delay:600ms]">
                        <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-bold font-headline">Secure & Reliable</h3>
                            <p className="mt-1 text-muted-foreground">Built with enterprise-grade security to protect your sensitive hotel and guest data.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4 animate-fade-in-up [animation-delay:700ms]">
                        <Rocket className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-lg font-bold font-headline">Advanced Analytics</h3>
                            <p className="mt-1 text-muted-foreground">Gain valuable insights into your operations with powerful reporting and analytics.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-24 md:py-32 lg:py-40 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in-up">
              <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">How It Works</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Get Up and Running in Minutes</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our process is simple and intuitive. Just follow these three easy steps.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              <div className="grid gap-1 text-center animate-fade-in-up [animation-delay:200ms]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">1. Sign Up</h3>
                <p className="text-muted-foreground">
                  Create your Desklet account and set up your hotel profile in minutes. No credit card required.
                </p>
              </div>
              <div className="grid gap-1 text-center animate-fade-in-up [animation-delay:400ms]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Bot className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">2. Configure Your System</h3>
                <p className="text-muted-foreground">
                  Add your rooms, services, and staff. Our intuitive setup wizard makes it easy to get started.
                </p>
              </div>
              <div className="grid gap-1 text-center animate-fade-in-up [animation-delay:600ms]">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">3. Start Managing</h3>
                <p className="text-muted-foreground">
                  Begin taking orders, managing guests, and tracking payments with our seamless, integrated platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section id="features" className="w-full py-24 md:py-32 lg:py-40 bg-white">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-in-up">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">See Desklet in Action</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Beautifully Simple Interface</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore how our thoughtfully designed features simplify complex hotel operations.
                </p>
              </div>
            </div>
            <div className="animate-fade-in-up [animation-delay:200ms]">
                <Carousel
                  plugins={[plugin.current]}
                  onMouseEnter={() => plugin.current.stop()}
                  onMouseLeave={() => plugin.current.reset()}
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full max-w-4xl mx-auto"
                >
                  <CarouselContent>
                    {[
                      { src: "https://placehold.co/800x500.png", alt: "Booking Calendar", hint: "hotel booking calendar", title: "Visual Booking Calendar", description: "Drag-and-drop bookings with a clear overview of your occupancy." },
                      { src: "https://placehold.co/800x500.png", alt: "Guest Profiles", hint: "customer profile page", title: "Detailed Guest Profiles", description: "Keep track of guest preferences, stay history, and communication." },
                      { src: "https://placehold.co/800x500.png", alt: "Reporting Dashboard", hint: "analytics dashboard charts", title: "Insightful Reporting", description: "Generate reports on revenue, occupancy, and more with a single click." },
                      { src: "https://placehold.co/800x500.png", alt: "Point of Sale", hint: "tablet point of sale", title: "Integrated Point of Sale", description: "Manage restaurant, spa, and other orders directly within Desklet." },
                    ].map((item, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                         <div className="p-1">
                          <Card className="overflow-hidden">
                            <CardContent className="p-0">
                               <Image
                                src={item.src}
                                width={800}
                                height={500}
                                alt={item.alt}
                                className="object-cover"
                                data-ai-hint={item.hint}
                              />
                              <div className="p-6">
                                <h3 className="text-xl font-bold font-headline">{item.title}</h3>
                                <p className="text-muted-foreground mt-2">{item.description}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                  <CarouselDots />
                </Carousel>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="w-full py-24 md:py-32 lg:py-40 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline mb-12 animate-fade-in-up">
              Loved by Hoteliers Worldwide
            </h2>
            <div className="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="animate-fade-in-up [animation-delay:200ms] bg-background">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="hotel manager" />
                      <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Sarah Doe</CardTitle>
                      <p className="text-sm text-muted-foreground">Manager, The Boutique Hotel</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>"Desklet has transformed our front desk operations. The interface is so intuitive, and it has saved us countless hours."</p>
                </CardContent>
              </Card>
              <Card className="animate-fade-in-up [animation-delay:300ms] bg-background">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Alex Jones</CardTitle>
                      <p className="text-sm text-muted-foreground">Owner, Lakeside Inn</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>"The ability to see all payment and guest history in one place is a game-changer for us. Customer service has improved dramatically."</p>
                </CardContent>
              </Card>
              <Card className="animate-fade-in-up [animation-delay:400ms] bg-background">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="hotel owner" />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Maria Chen</CardTitle>
                      <p className="text-sm text-muted-foreground">GM, Grand City Hotel</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>"We can now manage bookings and orders from any device. Desklet's platform independence is a huge advantage."</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

         {/* CTA Section */}
         <section className="w-full py-24 md:py-32 lg:py-40 bg-primary text-primary-foreground">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 animate-fade-in">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Ready to Streamline Your Hotel?
              </h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join hundreds of successful hotels. Start your free 14-day trial today, no credit card required.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Link href="/signup">
                <Button size="lg" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
