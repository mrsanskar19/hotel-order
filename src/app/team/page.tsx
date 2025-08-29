import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Alice Johnson',
    role: 'Co-Founder & CEO',
    bio: 'With over 15 years in the hospitality industry, Alice is passionate about leveraging technology to solve real-world problems for hoteliers.',
    imageUrl: 'https://placehold.co/400x400.png',
    imageHint: 'professional woman',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Bob Williams',
    role: 'Co-Founder & CTO',
    bio: 'A seasoned software architect, Bob leads our engineering team in building a robust and scalable platform.',
    imageUrl: 'https://placehold.co/400x400.png',
    imageHint: 'professional man',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Charlie Brown',
    role: 'Head of Product',
    bio: 'Charlie is obsessed with user experience and works closely with our customers to build features they love.',
    imageUrl: 'https://placehold.co/400x400.png',
    imageHint: 'professional person',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
    {
    name: 'Diana Prince',
    role: 'Head of Customer Success',
    bio: 'Diana and her team are dedicated to ensuring every Desklet customer achieves their business goals.',
    imageUrl: 'https://placehold.co/400x400.png',
    imageHint: 'smiling woman',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
];

export default function TeamPage() {
  return (
    <div className="py-12 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Meet the Team</h1>
          <p className="mt-4 text-lg text-muted-foreground">The passionate people behind Desklet.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center">
              <CardHeader>
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src={member.imageUrl} data-ai-hint={member.imageHint}/>
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline">{member.name}</CardTitle>
                <p className="text-primary">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <Link href={member.social.twitter} aria-label={`${member.name} on Twitter`}>
                    <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
                  </Link>
                  <Link href={member.social.linkedin} aria-label={`${member.name} on LinkedIn`}>
                    <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
