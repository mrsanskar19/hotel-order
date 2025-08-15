'use client';
import { useState } from 'react';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { suggestFoodCombinations, type SuggestFoodCombinationsOutput } from '@/ai/flows/suggest-food-combinations';
import { menuItems } from '@/data/menu';

interface AiSuggesterDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AiSuggesterDialog({ isOpen, onOpenChange }: AiSuggesterDialogProps) {
  const [preferences, setPreferences] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestFoodCombinationsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestion = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const menuForAI = menuItems.map(({ name, description, category }) => ({ name, description, category }));
      const result = await suggestFoodCombinations({
        menuItems: menuForAI,
        userPreferences: preferences
      });
      setSuggestions(result);
    } catch (e) {
      setError('Sorry, I couldn\'t come up with suggestions right now. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center gap-2">
            <Sparkles className="text-accent" />
            AI Food Suggester
          </DialogTitle>
          <DialogDescription>
            Tell us your preferences and our AI chef will suggest unique food pairings.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 py-4">
          <Input 
            placeholder="e.g., 'vegetarian', 'spicy', 'light meal'" 
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSuggestion()}
            disabled={isLoading}
          />
          <Button onClick={handleSuggestion} disabled={isLoading} className="w-[120px]">
            {isLoading ? <Loader2 className="animate-spin" /> : <><Wand2 className="mr-2 h-4 w-4"/><span>Suggest</span></>}
          </Button>
        </div>
        <div className="flex-1 relative -mx-6">
          <ScrollArea className="absolute inset-0 px-6">
            {isLoading && (
              <div className="flex flex-col items-center justify-center text-muted-foreground py-10 gap-4 h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="font-semibold">Our AI chef is thinking...</p>
              </div>
            )}
            {error && <p className="text-destructive text-center py-10">{error}</p>}
            {suggestions && (
              <div className="space-y-4 pb-4">
                {suggestions.suggestions.map((s, i) => (
                  <Card key={i} className="bg-secondary/50">
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">{s.combination}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-body text-secondary-foreground">{s.rationale}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {!isLoading && !suggestions && !error && (
               <div className="flex flex-col items-center justify-center text-muted-foreground py-10 gap-4 text-center h-full">
                  <Wand2 className="w-12 h-12" />
                  <p className="font-semibold">Ready for some culinary inspiration?</p>
                  <p>Enter your tastes and hit suggest!</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
