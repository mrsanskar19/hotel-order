import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';

// In a real app, you would fetch this data based on the slug
const post = {
  slug: 'mastering-dynamic-pricing',
  title: 'Mastering Dynamic Pricing: A Guide for Modern Hoteliers',
  description: 'Learn how to leverage AI and market data to create a pricing strategy that maximizes revenue and occupancy year-round.',
  date: 'June 10, 2024',
  author: 'Jane Doe',
  authorTitle: 'Head of Product',
  imageUrl: 'https://placehold.co/1200x600.png',
  imageHint: 'graphs charts',
  content: `
    <p>In today's competitive hospitality market, static pricing is a relic of the past. Hoteliers who fail to adapt to real-time market changes are leaving significant revenue on the table. This is where dynamic pricing comes in—a strategy that adjusts room rates based on supply and demand. With Desklet's AI-powered engine, this complex process becomes effortless.</p>
    <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Understanding the Core Principles</h2>
    <p>At its heart, dynamic pricing is about selling the right room to the right customer at the right time for the right price. The "right price" is the key variable, influenced by factors like:</p>
    <ul class="list-disc list-inside space-y-2 my-4">
      <li><strong>Seasonality:</strong> Peak season, shoulder season, and off-season demand fluctuations.</li>
      <li><strong>Local Events:</strong> Concerts, conferences, and festivals that drive up demand.</li>
      <li><strong>Competitor Pricing:</strong> What other hotels in your area are charging.</li>
      <li><strong>Booking Pace:</strong> How quickly your rooms are being booked for a future date.</li>
    </ul>
    <p>Manually tracking these factors is a full-time job. Desklet automates this, analyzing thousands of data points to recommend optimal pricing 24/7.</p>
    <blockquote class="border-l-4 border-primary pl-4 py-2 my-6 italic text-muted-foreground">
      "The dynamic pricing feature alone is worth the investment. Our revenue is up 20% since we switched to Desklet." - Michael Smith, Seaside Inn
    </blockquote>
    <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Implementing Your Strategy with Desklet</h2>
    <p>Getting started with dynamic pricing in Desklet is simple. You set the rules and boundaries, and our AI does the heavy lifting. Define your base rate, minimum and maximum prices, and how aggressively you want the system to react to market changes. From there, you can sit back and watch your RevPAR (Revenue Per Available Room) climb.</p>
    <p>The system provides full transparency, showing you exactly why a price was adjusted. This allows you to fine-tune your strategy over time, blending AI-driven recommendations with your own industry expertise.</p>
  `,
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Here you would fetch post data using params.slug

  return (
    <article className="py-12 md:py-24">
      <div className="container max-w-3xl">
        <header className="mb-8 text-center">
          <p className="text-primary font-semibold">Desklet Blog</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold font-headline">{post.title}</h1>
          <div className="mt-6 flex items-center justify-center space-x-4">
            <Avatar>
              <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person" />
              <AvatarFallback>{post.author.substring(0,2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author}</p>
              <p className="text-sm text-muted-foreground">{post.authorTitle}</p>
            </div>
          </div>
           <p className="mt-4 text-sm text-muted-foreground">{post.date}</p>
        </header>

        <Image
          src={post.imageUrl}
          alt={post.title}
          width={1200}
          height={600}
          className="rounded-lg object-cover aspect-video mb-8"
          data-ai-hint={post.imageHint}
        />

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-12 text-center">
            <Link href="/blog">
                <span className="text-primary hover:underline">← Back to Blog</span>
            </Link>
        </div>

      </div>
    </article>
  );
}
