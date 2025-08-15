'use server';

/**
 * @fileOverview A food combination suggestion AI agent.
 *
 * - suggestFoodCombinations - A function that suggests food combinations.
 * - SuggestFoodCombinationsInput - The input type for the suggestFoodCombinations function.
 * - SuggestFoodCombinationsOutput - The return type for the suggestFoodCombinations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFoodCombinationsInputSchema = z.object({
  menuItems: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      category: z.string(),
    })
  ).describe('An array of menu items with their names, descriptions, and categories.'),
  userPreferences: z.string().optional().describe('Optional user preferences or dietary restrictions.'),
});
export type SuggestFoodCombinationsInput = z.infer<typeof SuggestFoodCombinationsInputSchema>;

const SuggestFoodCombinationsOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      combination: z.string().describe('A suggested food combination.'),
      rationale: z.string().describe('The rationale for the suggested combination.'),
    })
  ).describe('An array of suggested food combinations with rationales.'),
});
export type SuggestFoodCombinationsOutput = z.infer<typeof SuggestFoodCombinationsOutputSchema>;

export async function suggestFoodCombinations(input: SuggestFoodCombinationsInput): Promise<SuggestFoodCombinationsOutput> {
  return suggestFoodCombinationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFoodCombinationsPrompt',
  input: {schema: SuggestFoodCombinationsInputSchema},
  output: {schema: SuggestFoodCombinationsOutputSchema},
  prompt: `You are a highly creative chef, skilled in discovering novel food combinations.

  Given the following menu items, suggest some interesting and delicious food combinations.
  Consider any user preferences when making your suggestions.

  Menu Items:
  {{#each menuItems}}
  - {{name}} ({{category}}): {{description}}
  {{/each}}

  User Preferences: {{userPreferences}}

  Please provide a few unique combinations, explaining why each would work well together.
  Format your output as a JSON array of objects, each with a "combination" and "rationale" field.
  `, 
});

const suggestFoodCombinationsFlow = ai.defineFlow(
  {
    name: 'suggestFoodCombinationsFlow',
    inputSchema: SuggestFoodCombinationsInputSchema,
    outputSchema: SuggestFoodCombinationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
