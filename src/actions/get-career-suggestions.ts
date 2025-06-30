'use server';

import { generateCareerSuggestions, type CareerSuggestionsInput, type CareerSuggestionsOutput } from "@/ai/flows/generate-career-suggestions";
import type { Career, CareerResults, TimelineStage } from "@/lib/types";

interface ActionInput {
    responses: Record<string, any>;
}

const mockCareerDetails: Record<string, Partial<Career>> = {
    "UX/UI Designer": {
        timeline: [
            { stage: "High School", duration: "Years 10-12", focus: "Art/Design, Psychology, Computer Science, Mathematics", details: "Build a portfolio of creative projects and learn basic coding" },
            { stage: "Higher Education", duration: "3-4 years", focus: "Design, Psychology, or Computer Science degree", details: "Specialize in Human-Computer Interaction or Digital Design" },
            { stage: "Junior Designer", duration: "1-2 years", focus: "Learning design tools, building portfolio, user research", details: "Start with internships, work on real projects, build network" },
            { stage: "Mid-level Designer", duration: "3-5 years", focus: "Leading design projects, mentoring juniors, specializing", details: "Develop expertise in specific areas like mobile apps or web design" },
            { stage: "Senior Designer/Design Lead", duration: "5+ years", focus: "Strategic design decisions, team leadership, innovation", details: "Lead design teams, influence product strategy, mentor others" }
        ],
        subjects: ["Art/Design", "Psychology", "Computer Science", "Mathematics", "English"],
        hobbies: ["Digital Art", "Photography", "User Research", "Tech Meetups", "Creative Writing"],
        salary: "$55,000 - $120,000+",
        growth: "Excellent demand, especially in tech and digital transformation",
        workEnvironment: "Creative, collaborative, tech-forward companies",
        dailyTasks: ["Research user needs and behaviors", "Create wireframes and prototypes", "Collaborate with developers and product managers", "Test designs with real users", "Present design solutions to stakeholders"]
    },
    "Clinical Psychologist": {
        subjects: ["Psychology", "Biology", "Mathematics", "English", "Health Sciences"],
        salary: "$60,000 - $130,000+",
        growth: "Strong and stable",
    },
    "Product Manager": {
        subjects: ["Business Studies", "Mathematics", "Computer Science", "English"],
        salary: "$70,000 - $180,000+",
        growth: "Very high demand",
    },
    "Data Scientist": {
        subjects: ["Mathematics", "Computer Science", "Statistics", "Physics"],
        salary: "$90,000 - $200,000+",
        growth: "Extremely high demand",
        description: "Analyze large datasets to extract meaningful insights and guide business strategy.",
    },
    "Software Engineer": {
        subjects: ["Computer Science", "Mathematics", "Physics"],
        salary: "$80,000 - $180,000+",
        growth: "Consistently high demand",
        description: "Design, develop, and maintain software applications and systems.",
    }
};

const getAugmentedCareer = (careerSuggestion: CareerSuggestionsOutput['careerSuggestions'][0]): Career => {
    const details = mockCareerDetails[careerSuggestion.title] || mockCareerDetails["Software Engineer"]!;
    return {
        ...careerSuggestion,
        ...details,
        description: careerSuggestion.description, // Prioritize AI description
    };
};

export async function getCareerSuggestionsAction({ responses }: ActionInput): Promise<{ success: true; data: CareerResults } | { success: false; error: string }> {
    try {
        const aiInput: CareerSuggestionsInput = {
            interests: responses.personal_interests || responses.child_interests || [],
            strengths: responses.child_strengths || [],
            workEnvironment: responses.work_environment || "",
            personalityTraits: responses.personality_traits || responses.personality_type || [],
            values: responses.core_values || [],
            learningStyle: responses.learning_style || [],
        };

        const result = await generateCareerSuggestions(aiInput);

        if (!result.careerSuggestions || result.careerSuggestions.length < 3) {
            // Fallback if AI returns insufficient results
            const fallbackSuggestions = Object.keys(mockCareerDetails).slice(0, 3).map(title => ({
                title,
                description: mockCareerDetails[title]!.description || "A promising career path.",
                reasoning: "This is a suggested career based on general analysis.",
                matchPercentage: Math.floor(Math.random() * 15) + 75,
            }));
            result.careerSuggestions = fallbackSuggestions as any;
        }

        const augmentedSuggestions = result.careerSuggestions.map(getAugmentedCareer);

        const finalResults: CareerResults = {
            primaryCareer: augmentedSuggestions[0],
            alternativeCareer: augmentedSuggestions[1],
            thirdCareer: augmentedSuggestions[2],
            insights: {
                personalityType: "Creative Collaborator",
                strengths: ["Creative problem-solving", "Empathy", "Attention to detail"],
                motivations: ["Making an impact", "Creative expression", "Continuous learning"],
                workStyle: "Collaborative with creative freedom.",
                stressFactors: ["Unclear expectations", "High-pressure deadlines"],
                idealEnvironment: "A mix of independent and team-based creative work.",
                leadershipStyle: "Supportive and inclusive."
            },
        };

        return { success: true, data: finalResults };

    } catch (error) {
        console.error("Error in getCareerSuggestionsAction:", error);
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" };
    }
}
