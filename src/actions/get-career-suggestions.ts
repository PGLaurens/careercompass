'use server';

import { generateCareerSuggestions, type CareerSuggestionsInput } from "@/ai/flows/generate-career-suggestions";
import type { Career, CareerResults, FeaturedProfessional, WackyJob } from "@/lib/types";

const fallbackProfessional: FeaturedProfessional = {
    name: "Alex Doe",
    title: "Software Engineer",
    bio: "Balancing a passion for innovative tech with a love for mountain biking and the great outdoors."
};

const fallbackWackyJobs: WackyJob[] = [
    {
        title: "AI Dungeon Master",
        description: "Designs and runs complex, AI-driven narrative experiences for tabletop role-playing games, creating dynamic stories that adapt in real-time to player choices."
    },
    {
        title: "Professional Ethical Hacker",
        description: "Companies hire you to legally hack into their systems to find security weaknesses before malicious hackers can exploit them. It's like being a digital security detective."
    }
];

const fallbackCareers: Career[] = [
    {
        title: "Software Engineer",
        description: "Design, develop, and maintain software applications and systems. Examples: Mobile App Developer who builds apps for iPhones, or a Cloud Infrastructure Engineer who helps Netflix stream movies smoothly.",
        reasoning: "This is a default suggestion. The AI model could not generate personalized results.",
        matchPercentage: 75,
        timeline: [
            { stage: "High School", duration: "Years 10-12", focus: "Computer Science, Mathematics, Physics", details: "Build personal projects and contribute to open source." },
            { stage: "Higher Education", duration: "3-4 years", focus: "Degree in Computer Science or Software Engineering", details: "Gain internship experience to build skills and network." },
            { stage: "Junior Engineer", duration: "1-2 years", focus: "Writing code, fixing bugs, learning the codebase", details: "Work closely with senior engineers to grow.", salary: "$ 5,000 - 8,000 / month" },
            { stage: "Senior Engineer", duration: "3-5+ years", focus: "Designing systems, mentoring others, and leading projects.", details: "Specialize in an area like cloud computing or AI.", salary: "$ 9,000 - 15,000+ / month" },
        ],
        subjects: ["Computer Science", "Mathematics", "Physics"],
        hobbies: ["Building apps or websites", "Contributing to open-source projects", "Robotics clubs"],
        salary: "$ 80,400 - 180,000 / year",
        growth: "Consistently high demand",
        workEnvironment: "Tech companies of all sizes, from startups to corporations",
        dailyTasks: ["Writing and testing code", "Collaborating with a team using Git", "Debugging complex issues", "Designing new software features"],
        industry: "Information Technology and Services",
    },
    {
        title: "UX/UI Designer",
        description: "Create user-friendly and visually appealing digital products. Examples: A UX Researcher who interviews users to understand their needs, or a UI Designer who creates the final look and feel of an app.",
        reasoning: "This is a default suggestion. The AI model could not generate personalized results.",
        matchPercentage: 72,
        timeline: [
            { stage: "High School", duration: "Years 10-12", focus: "Art/Design, Psychology, Computer Science", details: "Build a portfolio of creative projects." },
            { stage: "Higher Education", duration: "3-4 years", focus: "Degree in Design, Psychology, or HCI", details: "Specialize in Human-Computer Interaction." },
            { stage: "Junior Designer", duration: "1-2 years", focus: "Creating wireframes, mockups, and user flows under supervision.", details: "Conduct user research and usability testing.", salary: "$ 4,000 - 6,500 / month" },
            { stage: "Senior Designer", duration: "3-5+ years", focus: "Leading design projects, mentoring junior designers, and defining product strategy.", details: "Develop and maintain design systems.", salary: "$ 7,000 - 10,000+ / month" }
        ],
        subjects: ["Art/Design", "Psychology", "Computer Science"],
        hobbies: ["Digital Art & Illustration", "Photography", "Visiting art galleries"],
        salary: "$ 54,000 - 120,000 / year",
        growth: "Excellent demand in tech",
        workEnvironment: "Creative, collaborative, tech-forward companies",
        dailyTasks: ["Researching user needs", "Creating wireframes and prototypes", "Presenting designs to stakeholders"],
        industry: "Design",
    },
    {
        title: "Data Scientist",
        description: "Analyze large datasets to extract meaningful insights. Examples: A Machine Learning Engineer who builds predictive models, or a Business Intelligence Analyst who creates dashboards to track company performance.",
        reasoning: "This is a default suggestion. The AI model could not generate personalized results.",
        matchPercentage: 70,
        timeline: [
            { stage: "High School", duration: "Years 10-12", focus: "Advanced Mathematics, Statistics, Computer Science", details: "Participate in math or coding competitions." },
            { stage: "Undergraduate Degree", duration: "4 years", focus: "Degree in Statistics, Math, CS, or Economics", details: "Work on data analysis projects." },
            { stage: "Junior Data Scientist", duration: "1-3 years", focus: "Cleaning data, running analyses, and building basic models.", details: "Learn from senior scientists and domain experts.", salary: "$ 6,000 - 9,000 / month" },
            { stage: "Senior Data Scientist", duration: "4-6+ years", focus: "Developing complex models, leading data strategy, and communicating insights to leadership.", details: "Publish research or speak at conferences.", salary: "$ 10,000 - 16,500+ / month" }
        ],
        subjects: ["Mathematics", "Computer Science", "Statistics"],
        hobbies: ["Competitive programming (e.g., Kaggle)", "Building data visualizations", "Reading about AI advancements"],
        salary: "$ 90,000 - 198,000 / year",
        growth: "Extremely high demand",
        workEnvironment: "Tech companies, finance, healthcare, research labs",
        dailyTasks: ["Collecting and cleaning large datasets", "Building machine learning models", "Presenting findings to business leaders"],
        industry: "Data Science",
    }
];

const fallbackInsights = {
    personalityType: "The Creative Problem-Solver.",
    strengths: ["Creative Thinking", "Problem Solving", "Adaptability"],
    motivations: ["Learning New Things", "Making an Impact"],
    workStyle: "Prefers flexible environments with a mix of collaboration and independent work.",
    stressFactors: ["Repetitive tasks", "Strict hierarchies"],
    idealEnvironment: "A dynamic space that encourages new ideas.",
    leadershipStyle: "Leads by example and empowers others."
};

interface ActionInput {
    sessionData: {
        allResponses: {
            relationship: string;
            responses: {
                personal_interests?: string[];
                child_interests?: string[];
                child_strengths?: string[];
                work_environment?: string;
                personality_traits?: string[];
                personality_type?: string[];
                core_values?: string[];
                learning_style?: string[];
            };
        }[];
        country: string;
        region: string;
        highSchool: string;
    };
}


export async function getCareerSuggestionsAction({ sessionData }: ActionInput): Promise<{ success: true; data: CareerResults } | { success: false; error: string }> {
    try {
        const contributorResponses = sessionData.allResponses.map(responseSet => {
            const { responses } = responseSet;
            return {
                relationship: responseSet.relationship,
                interests: responses.personal_interests || responses.child_interests || [],
                strengths: responses.child_strengths || [],
                workEnvironment: responses.work_environment || "",
                personalityTraits: responses.personality_traits || responses.personality_type || [],
                values: responses.core_values || [],
                learningStyle: responses.learning_style || [],
            };
        });
        
        const aiInput: CareerSuggestionsInput = {
            contributorResponses,
            country: sessionData.country,
            region: sessionData.region,
            highSchool: sessionData.highSchool,
        };

        const result = await generateCareerSuggestions(aiInput);
        
        if (!result || !result.careerSuggestions || result.careerSuggestions.length < 3 || !result.featuredProfessional || !result.wackyJobs || result.wackyJobs.length < 2) {
            // This is a "soft" failure, where the AI returns a malformed response.
            // We can show a specific message for this.
            console.warn("AI returned insufficient or invalid data.", result);
            return {
                success: true,
                data: {
                    primaryCareer: fallbackCareers[0],
                    alternativeCareer: fallbackCareers[1],
                    thirdCareer: fallbackCareers[2],
                    insights: fallbackInsights,
                    featuredProfessional: fallbackProfessional,
                    wackyJobs: fallbackWackyJobs,
                    isFallback: true,
                },
            };
        }

        const finalResults: CareerResults = {
            primaryCareer: result.careerSuggestions[0],
            alternativeCareer: result.careerSuggestions[1],
            thirdCareer: result.careerSuggestions[2],
            insights: result.insights,
            featuredProfessional: result.featuredProfessional,
            wackyJobs: result.wackyJobs,
            isFallback: false,
        };

        return { success: true, data: finalResults };

    } catch (error) {
        // This is a "hard" failure, like a network error or API key issue.
        // We should not show fallback data here, but instead report the error to the user.
        console.error("Error in getCareerSuggestionsAction:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while generating AI suggestions.";
        return { success: false, error: errorMessage };
    }
}
