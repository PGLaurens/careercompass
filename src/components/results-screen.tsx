'use client';

import React from 'react';
import type { Career, CareerResults, TimelineStage } from '@/lib/types';
import { useCareerCompass } from '@/context/career-compass-context';
import { Button } from './ui/button';
import {
  Compass,
  ArrowLeft,
  Lightbulb,
  Share2,
  BookOpen,
  Sprout,
  DollarSign,
  Building,
  CheckCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ResultsScreenProps {
  results: CareerResults;
}

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({
  icon,
  title,
  children,
}) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 text-primary">{icon}</div>
    <div>
      <h4 className="font-semibold text-foreground">{title}</h4>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  </div>
);

const TimelineItem: React.FC<{ item: TimelineStage; isLast: boolean }> = ({ item, isLast }) => (
  <div className="relative pl-8">
    {!isLast && <div className="absolute left-[10px] top-4 h-full w-0.5 bg-border"></div>}
    <div className="absolute left-0 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
      <div className="h-2 w-2 rounded-full bg-primary"></div>
    </div>
    <p className="font-semibold text-foreground">{item.stage}</p>
    <p className="text-sm text-muted-foreground">{item.duration}</p>
    <p className="mt-1 text-sm text-muted-foreground">
      <span className="font-medium text-foreground/80">Focus:</span> {item.focus}
    </p>
    <p className="mt-1 text-sm text-muted-foreground">
      <span className="font-medium text-foreground/80">Details:</span> {item.details}
    </p>
  </div>
);

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results }) => {
  const { resetSession } = useCareerCompass();
  const router = useRouter();
  const { primaryCareer, alternativeCareer, thirdCareer, insights } = results;

  const handleStartOver = () => {
    resetSession();
    router.push('/');
  };

  const allCareers = [primaryCareer, alternativeCareer, thirdCareer];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
        <header className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4 -ml-4 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3 text-2xl font-bold text-foreground">
                <Compass className="h-8 w-8 text-primary" />
                <h1>Your Career Compass Results</h1>
              </div>
              <p className="mt-2 text-muted-foreground">
                Explore your personalized career paths based on your unique strengths and interests.
              </p>
            </div>
            <Button>
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </Button>
          </div>
        </header>

        <main className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card className="overflow-hidden rounded-xl border-2 border-primary/20 bg-primary/5 shadow-none">
              <div className="p-6">
                <Badge variant="default" className="mb-2 bg-primary text-primary-foreground">
                  Primary Recommendation
                </Badge>
                <h2 className="text-2xl font-bold text-foreground">{primaryCareer.title}</h2>
                <p className="mt-2 text-muted-foreground">{primaryCareer.description}</p>
                <p className="mt-4 text-sm font-medium text-primary">{primaryCareer.reasoning}</p>
              </div>
              <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
                <div className="bg-card p-4">
                  <InfoCard icon={<DollarSign className="h-5 w-5" />} title="Expected Salary">
                    <p>{primaryCareer.salary}</p>
                  </InfoCard>
                </div>
                <div className="bg-card p-4">
                  <InfoCard icon={<Sprout className="h-5 w-5" />} title="Growth Outlook">
                    <p>{primaryCareer.growth}</p>
                  </InfoCard>
                </div>
                <div className="bg-card p-4">
                  <InfoCard icon={<Building className="h-5 w-5" />} title="Work Environment">
                    <p>{primaryCareer.workEnvironment}</p>
                  </InfoCard>
                </div>
                <div className="bg-card p-4">
                  <InfoCard icon={<BookOpen className="h-5 w-5" />} title="Key Subjects">
                    <p>{primaryCareer.subjects?.join(', ')}</p>
                  </InfoCard>
                </div>
              </div>
              <div className="bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">Your Journey to Senior Level</h3>
                <div className="space-y-6">
                  {primaryCareer.timeline?.map((item, index) => (
                    <TimelineItem key={index} item={item} isLast={index === primaryCareer.timeline!.length - 1} />
                  ))}
                </div>
              </div>
              <div className="border-t bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">What You'll Do Daily</h3>
                <ul className="space-y-2">
                  {primaryCareer.dailyTasks?.map((task, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span className="text-muted-foreground">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <section>
              <h2 className="mb-4 text-xl font-bold text-foreground">Explore Further</h2>
              <Accordion type="single" collapsible className="w-full">
                {allCareers.slice(1).map((career, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">{`#${index + 2}`}</Badge>
                        <span>{career.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <div className="space-y-4 p-4">
                        <p className="text-muted-foreground">{career.description}</p>
                        <p className="text-sm font-medium text-primary">{career.reasoning}</p>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <InfoCard icon={<DollarSign className="h-5 w-5" />} title="Expected Salary">
                            {career.salary}
                          </InfoCard>
                          <InfoCard icon={<Sprout className="h-5 w-5" />} title="Growth Outlook">
                            {career.growth}
                          </InfoCard>
                          <InfoCard icon={<Building className="h-5 w-5" />} title="Work Environment">
                            {career.workEnvironment}
                          </InfoCard>
                          <InfoCard icon={<BookOpen className="h-5 w-5" />} title="Key Subjects">
                            {career.subjects?.join(', ')}
                          </InfoCard>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          <aside className="space-y-6 lg:col-span-1">
            <Card className="rounded-xl border-2 shadow-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Your Personal Insights</h3>
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <p>
                    <strong className="text-foreground">Personality Type:</strong>
                    <span className="text-muted-foreground"> {insights.personalityType}</span>
                  </p>
                  <p>
                    <strong className="text-foreground">Key Strengths:</strong>
                    <span className="text-muted-foreground"> {insights.strengths.join(', ')}</span>
                  </p>
                  <p>
                    <strong className="text-foreground">Motivations:</strong>
                    <span className="text-muted-foreground"> {insights.motivations.join(', ')}</span>
                  </p>
                  <p>
                    <strong className="text-foreground">Ideal Work Style:</strong>
                    <span className="text-muted-foreground"> {insights.workStyle}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-2 bg-card text-card-foreground shadow-none">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Ready for the Next Step?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Connect with a professional career counselor to discuss your results and plan your future.
                </p>
                <Button variant="default" className="mt-4 w-full">
                  Book a Consultation
                </Button>
              </CardContent>
            </Card>
            <div className="text-center">
              <Button onClick={handleStartOver} variant="ghost" className="text-muted-foreground">
                Start Over
              </Button>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default ResultsScreen;
