'use server';

/**
 * @fileOverview A documentation generation AI agent.
 *
 * - generateDocumentation - A function that generates tailored documentation based on user needs.
 * - GenerateDocumentationInput - The input type for the generateDocumentation function.
 * - GenerateDocumentationOutput - The return type for the generateDocumentation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDocumentationInputSchema = z.object({
  softwareDescription: z.string().describe('A detailed description of the software for which documentation is to be generated.'),
  userNeeds: z.string().describe('Specific user needs or questions to be addressed in the documentation.'),
  preferredFormat: z.string().optional().describe('Optional: The preferred format for the documentation, e.g., markdown, HTML, PDF.'),
});
export type GenerateDocumentationInput = z.infer<typeof GenerateDocumentationInputSchema>;

const GenerateDocumentationOutputSchema = z.object({
  documentation: z.string().describe('The generated documentation tailored to the user needs and software description.'),
});
export type GenerateDocumentationOutput = z.infer<typeof GenerateDocumentationOutputSchema>;

export async function generateDocumentation(input: GenerateDocumentationInput): Promise<GenerateDocumentationOutput> {
  return generateDocumentationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDocumentationPrompt',
  input: {schema: GenerateDocumentationInputSchema},
  output: {schema: GenerateDocumentationOutputSchema},
  prompt: `You are an AI documentation generator. Your task is to create documentation based on the provided software description, user needs, and preferred format.

Software Description: {{{softwareDescription}}}
User Needs: {{{userNeeds}}}
Preferred Format (Optional): {{{preferredFormat}}}

Generate the documentation so that it addresses the user's needs and follows the preferred format, if provided. Focus on clarity, accuracy, and relevance.
`,
});

const generateDocumentationFlow = ai.defineFlow(
  {
    name: 'generateDocumentationFlow',
    inputSchema: GenerateDocumentationInputSchema,
    outputSchema: GenerateDocumentationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
