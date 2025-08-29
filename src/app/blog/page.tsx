import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    slug: 'mastering-dynamic-pricing',
    title: 'Mastering Dynamic Pricing: A Guide for Modern Hoteliers',
    description: 'Learn how to leverage AI and market data to create a pricing strategy that maximizes revenue and occupancy year-round.',
    date: 'June 10, 2024',
    author: 'Jane Doe',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'graphs charts'
  },
  {
    slug: 'the-future-of-guest-experience',
    title: 'The Future of Guest Experience: Personalization at Scale',
    description: 'Discover the latest trends in hotel guest experience, from contactless check-in to hyper-personalized recommendations.',
    date: 'May 22, 2024',
    author: 'John Smith',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'hotel lobby'
  },
  {
    slug: 'streamlining-hotel-operations',
    title: 'Streamlining Hotel Operations: The Power of an All-in-One Platform',
    description: 'Tired of juggling multiple software systems? See how consolidating your tech stack can boost efficiency and reduce costs.',
    date: 'April 15, 2024',
    author: 'Emily Chen',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'computer dashboard'
  },
  {
    slug: 'ai-in-hospitality',
    title: 'How AI is Revolutionizing the Hospitality Industry',
    description: 'From chatbots to predictive analytics, AI is transforming how hotels operate. Learn what\'s next.',
    date: 'March 28, 2024',
    author: 'David Lee',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'robot assistant'
  },
  {
    slug: 'sustainable-tourism',
    title: '5 Ways Your Hotel Can Embrace Sustainable Tourism',
    description: 'Sustainability is more than a buzzword. Discover practical steps to make your hotel more eco-friendly.',
    date: 'February 19, 2024',
    author: 'Sarah Green',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'nature hotel'
  },
];

export default function BlogPage() {
  return (
    <div className="py-12 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Desklet Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground">Industry insights, product updates, and tips for success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="rounded-t-lg object-cover"
                  data-ai-hint={post.imageHint}
                />
              </CardHeader>
              <CardContent className="pt-6 flex-1">
                <CardTitle className="font-headline text-xl leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="mt-2">{post.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                 <div className="text-sm text-muted-foreground">
                  <span>{post.author}</span> &middot; <span>{post.date}</span>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
