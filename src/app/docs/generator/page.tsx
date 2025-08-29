'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateDocumentation } from '@/ai/flows/ai-doc-generator';
import { LoaderCircle, Sparkles } from 'lucide-react';

export default function DocGeneratorPage() {
  const [softwareDescription, setSoftwareDescription] = useState('');
  const [userNeeds, setUserNeeds] = useState('');
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!softwareDescription || !userNeeds) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide both a software description and user needs.',
      });
      return;
    }

    setIsLoading(true);
    setGeneratedDoc('');
    try {
      const result = await generateDocumentation({ softwareDescription, userNeeds });
      setGeneratedDoc(result.documentation);
    } catch (error) {
      console.error('Error generating documentation:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'There was an error generating the documentation. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-24">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <Sparkles className="h-12 w-12 mx-auto text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold font-headline mt-4">AI Documentation Generator</h1>
          <p className="mt-4 text-lg text-muted-foreground">Describe your software and what your users need to know, and our AI will generate documentation for you.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Documentation Details</CardTitle>
            <CardDescription>Provide the necessary information for the AI to create your docs.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="software-description" className="text-lg font-semibold">Software Description</Label>
                <Textarea
                  id="software-description"
                  placeholder="e.g., A cloud-based project management tool with task tracking, team collaboration, and reporting features."
                  value={softwareDescription}
                  onChange={(e) => setSoftwareDescription(e.target.value)}
                  rows={5}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-needs" className="text-lg font-semibold">User Needs</Label>
                <Textarea
                  id="user-needs"
                  placeholder="e.g., How to create a new project. How to assign tasks to team members. How to generate a progress report."
                  value={userNeeds}
                  onChange={(e) => setUserNeeds(e.target.value)}
                  rows={5}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Documentation'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {generatedDoc && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold font-headline mb-4">Generated Documentation</h2>
            <Card>
              <CardContent className="p-6">
                <pre className="whitespace-pre-wrap font-code bg-muted p-4 rounded-lg text-sm">
                  {generatedDoc}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
