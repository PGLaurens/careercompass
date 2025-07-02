export type UserType = 'parent' | 'learner' | null;

export interface Contributor {
  name: string;
  email: string;
  relationship: 'Parent' | 'Self' | 'Friend' | 'Teacher' | 'Mentor';
  completed: boolean;
}

export interface SessionData {
  studentName: string;
  sessionId: string;
  contributors: Contributor[];
  allResponses: {
    contributor: string;
    relationship: string;
    responses: Record<string, any>;
  }[];
  country: string;
  region: string;
  highSchool: string;
}

export interface Question {
  id: string;
  question: string;
  subtitle: string;
  type: 'multiselect' | 'single' | 'ranking';
  options: string[];
}

export interface QuestionSet {
  [key: string]: Question[][];
}

export interface TimelineStage {
  stage: string;
  duration: string;
  focus: string;
  details: string;
}

export interface Career {
  title: string;
  description: string;
  reasoning: string;
  matchPercentage: number;
  timeline?: TimelineStage[];
  subjects?: string[];
  hobbies?: string[];
  salary?: string;
  growth?: string;
  workEnvironment?: string;
  dailyTasks?: string[];
}

export interface FeaturedProfessional {
  name: string;
  title: string;
  bio: string;
}

export interface CareerResults {
  primaryCareer: Career;
  alternativeCareer: Career;
  thirdCareer: Career;
  insights: {
    personalityType: string;
    strengths: string[];
    motivations: string[];
    workStyle: string;
    stressFactors: string[];
    idealEnvironment: string;
    leadershipStyle: string;
  };
  featuredProfessional: FeaturedProfessional;
  isFallback?: boolean;
}
