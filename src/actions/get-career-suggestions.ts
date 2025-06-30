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
        hobbies: ["Digital Art & Illustration", "Photography & Videography", "Attending Tech Meetups & Design Conferences", "Creative Writing or Blogging", "Building personal projects"],
        salary: "$55,000 - $120,000+",
        growth: "Excellent demand, especially in tech and digital transformation",
        workEnvironment: "Creative, collaborative, tech-forward companies",
        dailyTasks: ["Research user needs and behaviors", "Create wireframes and prototypes", "Collaborate with developers and product managers", "Test designs with real users", "Present design solutions to stakeholders"]
    },
    "Clinical Psychologist": {
        timeline: [
            { stage: "High School", duration: "Years 10-12", focus: "Psychology, Biology, English, Mathematics", details: "Volunteer in a caring role to gain experience." },
            { stage: "Undergraduate Degree", duration: "4 years", focus: "Bachelor's in Psychology (Honours)", details: "Focus on research methods and clinical psychology courses." },
            { stage: "Postgraduate Studies", duration: "2-4 years", focus: "Master's and/or PhD/PsyD in Clinical Psychology", details: "Includes supervised clinical placements and thesis." },
            { stage: "Licensure", duration: "1-2 years", focus: "Supervised practice and passing board exams", details: "Become a registered psychologist." },
            { stage: "Career Practice", duration: "Ongoing", focus: "Private practice, hospitals, or research", details: "Continual professional development is key." }
        ],
        subjects: ["Psychology", "Biology", "Mathematics", "English", "Health Sciences"],
        hobbies: ["Mindfulness & Meditation", "Journaling or creative writing", "Volunteering for a cause", "Joining a book club", "Hiking or nature walks"],
        salary: "$60,000 - $130,000+",
        growth: "Strong and stable",
        workEnvironment: "Clinics, hospitals, private practice, schools",
        dailyTasks: ["Conducting therapy sessions with individuals or groups", "Diagnosing mental health conditions", "Developing treatment plans", "Administering psychological tests", "Writing case notes and reports"]
    },
    "Product Manager": {
        timeline: [
            { stage: "High School", duration: "Years 10-12", focus: "Business Studies, Economics, Mathematics, English", details: "Start a small project or club to practice leadership." },
            { stage: "Higher Education", duration: "3-4 years", focus: "Degree in Business, CS, or a related field", details: "Internships in tech or business are highly valuable." },
            { stage: "Entry-level Role", duration: "2-3 years", focus: "Associate PM, Business Analyst, or Marketing role", details: "Learn how different parts of the business work." },
            { stage: "Product Manager", duration: "3-5 years", focus: "Owning a product or feature, leading a team", details: "Develop deep user empathy and market knowledge." },
            { stage: "Senior Product Leader", duration: "5+ years", focus: "Managing multiple products, defining strategy", details: "Influence the direction of the entire company." }
        ],
        subjects: ["Business Studies", "Mathematics", "Computer Science", "English"],
        hobbies: ["Following tech news & trends", "Building side projects", "Public speaking (e.g., Toastmasters)", "Networking with professionals", "Traveling to understand different markets"],
        salary: "$70,000 - $180,000+",
        growth: "Very high demand",
        workEnvironment: "Fast-paced, collaborative tech companies",
        dailyTasks: ["Conducting market research and competitor analysis", "Defining product strategy and roadmap", "Writing user stories and product specifications", "Prioritizing features for development teams", "Communicating with stakeholders across the company"]
    },
    "Data Scientist": {
        timeline: [
            { stage: "High School", duration: "Years 10-12", focus: "Advanced Mathematics, Statistics, Computer Science", details: "Participate in math or coding competitions." },
            { stage: "Undergraduate Degree", duration: "4 years", focus: "Degree in Statistics, Math, CS, or Economics", details: "Work on data analysis projects for your portfolio." },
            { stage: "Further Education (Optional)", duration: "2 years", focus: "Master's or PhD in a quantitative field", details: "Often required for more senior or specialized roles." },
            { stage: "Junior Data Scientist", duration: "2-3 years", focus: "Data cleaning, building models, creating reports", details: "Develop expertise in programming and machine learning." },
            { stage: "Senior Data Scientist", duration: "3+ years", focus: "Leading complex projects, mentoring, strategic insights", details: "Solve major business problems with data." }
        ],
        subjects: ["Mathematics", "Computer Science", "Statistics", "Physics"],
        hobbies: ["Competitive programming (e.g., Kaggle)", "Building data visualizations", "Reading research papers", "Playing strategy board games", "Learning about machine learning"],
        salary: "$90,000 - $200,000+",
        growth: "Extremely high demand",
        description: "Analyze large datasets to extract meaningful insights and guide business strategy.",
        workEnvironment: "Tech companies, finance, healthcare, research labs",
        dailyTasks: ["Collecting and cleaning large datasets", "Building and testing machine learning models", "Creating data visualizations and dashboards", "Presenting findings to non-technical stakeholders", "Staying up-to-date with new algorithms and tools"]
    },
    "Software Engineer": {
        timeline: [
            { stage: "High School", duration: "Years 10-12", focus: "Computer Science, Mathematics, Physics", details: "Build personal projects and contribute to open source." },
            { stage: "Higher Education", duration: "3-4 years", focus: "Degree in Computer Science or Software Engineering", details: "Gain internship experience to build skills and network." },
            { stage: "Junior Engineer", duration: "1-2 years", focus: "Writing code, fixing bugs, learning the codebase", details: "Work closely with senior engineers to grow." },
            { stage: "Mid-level Engineer", duration: "3-5 years", focus: "Designing features, code reviews, system design", details: "Take ownership of larger parts of the system." },
            { stage: "Senior/Staff Engineer", duration: "5+ years", focus: "Architectural decisions, technical leadership, mentoring", details: "Lead technical direction for major projects." }
        ],
        subjects: ["Computer Science", "Mathematics", "Physics"],
        hobbies: ["Building apps or websites", "Contributing to open-source projects", "Participating in hackathons", "Playing video games (or making them!)", "Automating tasks with scripts"],
        salary: "$80,000 - $180,000+",
        growth: "Consistently high demand",
        description: "Design, develop, and maintain software applications and systems.",
        workEnvironment: "Tech companies of all sizes, from startups to corporations",
        dailyTasks: ["Writing and testing code", "Collaborating with a team using Git and code reviews", "Debugging and fixing issues", "Designing software architecture and systems", "Participating in team planning and meetings"]
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
                leadershipStyle: "Supportive and inclusive"
            },
        };

        return { success: true, data: finalResults };

    } catch (error) {
        console.error("Error in getCareerSuggestionsAction:", error);
        return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" };
    }
}
