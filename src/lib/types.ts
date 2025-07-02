export type UserType = 'parent' | 'learner' | null;

export interface Contributor {
  id: string;
  name: string;
  email: string;
  relationship: 'Parent' | 'Self' | 'Friend' | 'Teacher' | 'Mentor' | 'Family';
  completed: boolean;
}

export interface SessionData {
  studentName: string;
  sessionId: string;
  contributors: Contributor[];
  allResponses: {
    contributorId: string;
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
  salary?: string;
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
  industry?: string;
}

export interface FeaturedProfessional {
  name: string;
  title: string;
  bio: string;
}

export interface WackyJob {
  title: string;
  description: string;
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
  wackyJobs: WackyJob[];
  isFallback?: boolean;
}
