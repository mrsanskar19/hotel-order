'use client';
import React from 'react';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

// Example logos (replace with your actual partner logos)
const partnerLogos = [
  { src: "/logos/logo1.svg", alt: "Partner 1" },
  { src: "/logos/logo2.svg", alt: "Partner 2" },
  { src: "/logos/logo3.svg", alt: "Partner 3" },
  { src: "/logos/logo4.svg", alt: "Partner 4" },
  { src: "/logos/logo5.svg", alt: "Partner 5" },
  { src: "/logos/logo6.svg", alt: "Partner 6" },
  { src: "/logos/logo1.svg", alt: "Partner 7" },
  { src: "/logos/logo2.svg", alt: "Partner 8" },
  { src: "/logos/logo3.svg", alt: "Partner 9" },
];

export const Partners = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );
  return (
    <section className="w-full py-16 bg-gray-50 px-4">
      <div className="container max-w-6xl text-center">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-headline text-left">
              Explore Our Partners
            </h2>
            <div className="flex items-center space-x-4">
                <Button size="sm" variant="outline">Explore More</Button>
            </div>
        </div>
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-4">
            {partnerLogos.map((logo, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <div className="p-1">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-32 flex items-center justify-center p-4">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-16 max-w-full"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
 <CarouselDots className="mt-8 flex justify-center space-x-2">
            {/* You can add custom dot components here if needed */}
 </CarouselDots>
        </Carousel>
      </div>
    </section>
  );
};
