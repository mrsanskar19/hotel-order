// Implemented Genkit flow for AI-powered chatbot support.

'use server';

/**
 * @fileOverview AI-powered chatbot for instant customer support.
 *
 * - chatBot - A function that handles the chatbot interaction.
 * - ChatBotInput - The input type for the chatBot function.
 * - ChatBotOutput - The return type for the chatBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatBotInputSchema = z.object({
  query: z.string().describe('The user query for the chatbot.'),
});
export type ChatBotInput = z.infer<typeof ChatBotInputSchema>;

const ChatBotOutputSchema = z.object({
  response: z.string().describe('The response from the chatbot.'),
});
export type ChatBotOutput = z.infer<typeof ChatBotOutputSchema>;

export async function chatBot(input: ChatBotInput): Promise<ChatBotOutput> {
  return chatBotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatBotPrompt',
  input: {schema: ChatBotInputSchema},
  output: {schema: ChatBotOutputSchema},
  prompt: `You are a customer support chatbot for a hotel management software company. Answer the following question:

{{query}}`,
});

const chatBotFlow = ai.defineFlow(
  {
    name: 'chatBotFlow',
    inputSchema: ChatBotInputSchema,
    outputSchema: ChatBotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
