
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, MapPin, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const jobCategories = [
  {
    name: 'Engineering',
    jobs: [
      { title: 'Senior Frontend Engineer', location: 'Remote' },
      { title: 'Backend Engineer (Node.js)', location: 'Remote' },
      { title: 'DevOps Engineer', location: 'New York, NY' },
    ],
  },
  {
    name: 'Marketing',
    jobs: [
      { title: 'Product Marketing Manager', location: 'San Francisco, CA' },
      { title: 'Content Strategist', location: 'Remote' },
    ],
  },
  {
    name: 'Support',
    jobs: [
      { title: 'Customer Success Manager', location: 'Austin, TX' },
    ],
  },
];

function ApplicationForm({ jobTitle }: { jobTitle: string }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: 'Application Submitted!',
          description: `Your application for ${jobTitle} has been received.`,
        });
        // The dialog can be programmatically closed here if the open state is managed.
        // For this example, we rely on the user to close it via the UI.
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error submitting application',
          description: errorData.message || 'Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error submitting application',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Apply for {jobTitle}</DialogTitle>
        <DialogDescription>
          Fill out the form below to submit your application.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Full Name
            </Label>
            <Input id="name" required className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" required className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input id="phone" type="tel" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resume" className="text-right">
              Resume/CV
            </Label>
            <Input id="resume" type="file" required className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cover-letter" className="text-right">
              Cover Letter
            </Label>
            <Textarea id="cover-letter" className="col-span-3" rows={5} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
             <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}


export default function CareersPage() {
  return (
    <div className="bg-background">
      <div className="py-12 md:py-24">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Join Our Team</h1>
            <p className="mt-4 text-lg text-muted-foreground">We're building the future of hospitality. Come work with us.</p>
          </div>
        </div>
      </div>

      <div className="pb-12 md:pb-24">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="flex flex-col items-center text-center p-6">
              <Sparkles className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-headline text-xl font-bold">Innovate</h3>
              <p className="text-muted-foreground mt-2">Work on challenging problems that are shaping a multi-billion dollar industry.</p>
            </Card>
             <Card className="flex flex-col items-center text-center p-6">
              <Briefcase className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-headline text-xl font-bold">Grow</h3>
              <p className="text-muted-foreground mt-2">We invest in our people with professional development and growth opportunities.</p>
            </Card>
             <Card className="flex flex-col items-center text-center p-6">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-headline text-xl font-bold">Thrive</h3>
              <p className="text-muted-foreground mt-2">Enjoy competitive salaries, great benefits, and a flexible, remote-first culture.</p>
            </Card>
        </div>
      </div>
      
      <div className="pb-12 md:pb-24">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">Open Positions</h2>
          {jobCategories.map((category) => (
            <div key={category.name} className="mb-10">
              <h3 className="text-2xl font-semibold font-headline mb-6">{category.name}</h3>
              <div className="space-y-4">
                {category.jobs.map((job) => (
                  <Dialog key={job.title}>
                    <Card>
                      <CardHeader className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
                        <div>
                          <CardTitle>{job.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2">
                            <MapPin className="h-4 w-4" /> {job.location}
                          </CardDescription>
                        </div>
                        <DialogTrigger asChild>
                          <Button>Apply Now</Button>
                        </DialogTrigger>
                      </CardHeader>
                    </Card>
                    <ApplicationForm jobTitle={job.title} />
                  </Dialog>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
