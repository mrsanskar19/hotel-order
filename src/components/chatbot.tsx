'use client';

import { useState } from 'react';
import { CornerDownLeft, Bot, Mic, Paperclip, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { chatBot } from '@/ai/flows/ai-chatbot';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatBot({ query: input });
      const botMessage: Message = { role: 'bot', content: response.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get a response from the chatbot.',
      });
      setMessages((prev) => prev.slice(0, -1)); // Remove the user message on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg"
          size="icon"
          aria-label="Open chatbot"
        >
          <Bot className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline">AI Support Chat</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 pr-4 -mr-6">
          <div className="space-y-4 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 text-sm ${
                  message.role === 'bot' ? '' : 'justify-end'
                }`}
              >
                {message.role === 'bot' && (
                  <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="robot" />
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-3 ${
                    message.role === 'bot'
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
             {isLoading && (
              <div className="flex gap-3 text-sm">
                 <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                    <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="robot" />
                  </Avatar>
                <div className="rounded-lg bg-muted p-3 text-muted-foreground flex items-center">
                    <LoaderCircle className="animate-spin h-5 w-5" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        >
          <Input
            id="message"
            placeholder="Type your message here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            autoComplete="off"
          />
          <div className="flex items-center p-3 pt-0">
            <Button type="submit" size="sm" className="ml-auto gap-1.5" disabled={isLoading}>
              Send
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
