'use server';
/**
 * @fileOverview Generates personalized career suggestions based on user inputs.
 *
 * - generateCareerSuggestions - A function that generates career suggestions.
 * - CareerSuggestionsInput - The input type for the generateCareerSuggestions function.
 * - CareerSuggestionsOutput - The return type for the generateCareerSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerSuggestionsInputSchema = z.object({
  interests: z.array(z.string()).describe('The interests of the user.'),
  strengths: z.array(z.string()).describe('The strengths of the user.'),
  workEnvironment: z.string().describe('The preferred work environment of the user.'),
  personalityTraits: z.array(z.string()).describe('The personality traits of the user.'),
  values: z.array(z.string()).describe('The values of the user.'),
  learningStyle: z.array(z.string()).describe('The learning style of the user.'),
});
export type CareerSuggestionsInput = z.infer<typeof CareerSuggestionsInputSchema>;

const CareerSuggestionsOutputSchema = z.object({
  careerSuggestions: z.array(
    z.object({
      title: z.string().describe('The title of the career suggestion.'),
      description: z.string().describe('A short description of the career.'),
      reasoning: z.string().describe('The reasoning for suggesting this career based on the user input.'),
      matchPercentage: z.number().describe('A percentage indicating how well the career matches the user.'),
    })
  ).describe('A list of career suggestions.'),
});
export type CareerSuggestionsOutput = z.infer<typeof CareerSuggestionsOutputSchema>;

export async function generateCareerSuggestions(input: CareerSuggestionsInput): Promise<CareerSuggestionsOutput> {
  return generateCareerSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerSuggestionsPrompt',
  input: {schema: CareerSuggestionsInputSchema},
  output: {schema: CareerSuggestionsOutputSchema},
  prompt: `You are a career counselor that will give personalized career suggestions with detailed reasoning based on the learner's inputs.

  Here are the learner's inputs:

  Interests: {{interests}}
  Strengths: {{strengths}}
  Preferred Work Environment: {{workEnvironment}}
  Personality Traits: {{personalityTraits}}
  Values: {{values}}
  Learning Style: {{learningStyle}}

  Based on these inputs, provide career suggestions with detailed reasoning. Each suggestion should contain a title, a description and reasoning, and a match percentage.
  `,
});

const generateCareerSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateCareerSuggestionsFlow',
    inputSchema: CareerSuggestionsInputSchema,
    outputSchema: CareerSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
