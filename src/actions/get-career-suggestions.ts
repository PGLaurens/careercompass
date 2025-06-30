'use server';

import { generateCareerSuggestions, type CareerSuggestionsInput, type CareerSuggestionsOutput } from "@/ai/flows/generate-career-suggestions";
import type { Career, CareerResults } from "@/lib/types";

interface ActionInput {
    responses: Record<string, any>;
    country: string;
    region: string;
    highSchool: string;
}

const fallbackCareers: Career[] = [
    {
        title: "Software Engineer",
        description: "Design, develop, and maintain software applications and systems.",
        reasoning: "This is a default suggestion. The AI model could not generate personalized results.",
        matchPercentage: 75,
        timeline: [
            { stage: "High School", duration: "Years 10-12", focus: "Computer Science, Mathematics, Physics", details: "Build personal projects and contribute to open source." },
            { stage: "Higher Education", duration: "3-4 years", focus: "Degree in Computer Science or Software Engineering", details: "Gain internship experience to build skills and network." },
            { stage: "Junior Engineer", duration: "1-2 years", focus: "Writing code, fixing bugs, learning the codebase", details: "Work closely with senior engineers to grow." },
        ],
        subjects: ["Computer Science", "Mathematics", "Physics"],
        hobbies: ["Building apps or websites", "Contributing to open-source projects"],
        salary: "$80,000 - $180,000+",
        growth: "Consistently high demand",
        workEnvironment: "Tech companies of all sizes, from startups to corporations",
        dailyTasks: ["Writing and testing code", "Collaborating with a team using Git"]
    },
    {
        title: "UX/UI Designer",
        description: "Create user-friendly and visually appealing digital products.",
        reasoning: "This is a default suggestion. The AI model could not generate personalized results.",
        matchPercentage: 72,
        timeline: [
            { stage: "High School", duration: "Years 10-12", focus: "Art/Design, Psychology, Computer Science", details: "Build a portfolio of creative projects." },
            { stage: "Higher Education", duration: "3-4 years", focus: "Degree in Design, Psychology, or HCI", details: "Specialize in Human-Computer Interaction." },
        ],
        subjects: ["Art/Design", "Psychology", "Computer Science"],
        hobbies: ["Digital Art & Illustration", "Photography"],
        salary: "$55,000 - $120,000+",
        growth: "Excellent demand in tech",
        workEnvironment: "Creative, collaborative, tech-forward companies",
        dailyTasks: ["Researching user needs", "Creating wireframes and prototypes"]
    },
    {
        title: "Data Scientist",
        description: "Analyze large datasets to extract meaningful insights.",
        reasoning: "This is a default suggestion. The AI model could not generate personalized results.",
        matchPercentage: 70,
        timeline: [
            { stage: "High School", duration: "Years 10-12", focus: "Advanced Mathematics, Statistics, Computer Science", details: "Participate in math or coding competitions." },
            { stage: "Undergraduate Degree", duration: "4 years", focus: "Degree in Statistics, Math, CS, or Economics", details: "Work on data analysis projects." },
        ],
        subjects: ["Mathematics", "Computer Science", "Statistics"],
        hobbies: ["Competitive programming (e.g., Kaggle)", "Building data visualizations"],
        salary: "$90,000 - $200,000+",
        growth: "Extremely high demand",
        workEnvironment: "Tech companies, finance, healthcare, research labs",
        dailyTasks: ["Collecting and cleaning large datasets", "Building machine learning models"]
    }
];

export async function getCareerSuggestionsAction({ responses, country, region, highSchool }: ActionInput): Promise<{ success: true; data: CareerResults } | { success: false; error: string }> {
    try {
        const aiInput: CareerSuggestionsInput = {
            interests: responses.personal_interests || responses.child_interests || [],
            strengths: responses.child_strengths || [],
            workEnvironment: responses.work_environment || "",
            personalityTraits: responses.personality_traits || responses.personality_type || [],
            values: responses.core_values || [],
            learningStyle: responses.learning_style || [],
            country,
            region,
            highSchool,
        };

        const result = await generateCareerSuggestions(aiInput);
        
        if (!result || !result.careerSuggestions || result.careerSuggestions.length < 3) {
            throw new Error("AI returned insufficient or invalid data.");
        }

        const finalResults: CareerResults = {
            primaryCareer: result.careerSuggestions[0],
            alternativeCareer: result.careerSuggestions[1],
            thirdCareer: result.careerSuggestions[2],
            insights: result.insights,
        };

        return { success: true, data: finalResults };

    } catch (error) {
        console.error("Error in getCareerSuggestionsAction:", error);
        
        const fallbackResults: CareerResults = {
            primaryCareer: fallbackCareers[0],
            alternativeCareer: fallbackCareers[1],
            thirdCareer: fallbackCareers[2],
            insights: {
                personalityType: "Determined Achiever",
                strengths: ["Resilience", "Problem-solving"],
                motivations: ["Success", "Learning"],
                workStyle: "Focused and independent.",
                stressFactors: ["Unclear goals", "Lack of progress"],
                idealEnvironment: "A place with clear objectives.",
                leadershipStyle: "Leads by example."
            },
        };
        
        return { success: true, data: fallbackResults };
    }
}
