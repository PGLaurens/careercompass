
'use client';

import React, { useState } from 'react';
import type { Career, CareerResults, FeaturedProfessional, TimelineStage } from '@/lib/types';
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
  User,
  Sparkles,
  Download,
  UserPlus,
  Play,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import ShareModal from './share-modal';

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
  const [showShareModal, setShowShareModal] = useState(false);
  const { primaryCareer, alternativeCareer, thirdCareer, insights, featuredProfessional } = results;

  const handleStartOver = () => {
    resetSession();
    router.push('/');
  };

  const allCareers = [primaryCareer, alternativeCareer, thirdCareer];

  return (
    <>
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
            </div>
          </header>

          <main>
            <Card className="mb-8 rounded-xl border-2 border-primary/10 bg-primary/5 shadow-none">
                <CardHeader>
                    <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Your Personal Insights</h3>
                    </div>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
                    <p><strong className="text-foreground">Personality Type:</strong><span className="text-muted-foreground"> {insights.personalityType}</span></p>
                    <p><strong className="text-foreground">Key Strengths:</strong><span className="text-muted-foreground"> {insights.strengths.join(', ')}</span></p>
                    <p><strong className="text-foreground">Motivations:</strong><span className="text-muted-foreground"> {insights.motivations.join(', ')}</span></p>
                    <p><strong className="text-foreground">Ideal Work Style:</strong><span className="text-muted-foreground"> {insights.workStyle}</span></p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-8 lg:col-span-2">
                <Card className="overflow-hidden rounded-xl border-2 border-primary/20 bg-card shadow-none">
                  <div className="p-6">
                    <Badge variant="default" className="mb-2 bg-primary text-primary-foreground">
                      Primary Recommendation
                    </Badge>
                    <h2 className="text-2xl font-bold text-foreground">{primaryCareer.title}</h2>
                    <p className="mt-2 text-muted-foreground">{primaryCareer.description}</p>
                    <p className="mt-4 text-sm font-medium text-accent-foreground">{primaryCareer.reasoning}</p>
                  </div>
                  <div className="space-y-px bg-border">
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
                  </div>

                  <div className="border-t bg-card p-6">
                    <InfoCard icon={<BookOpen className="h-5 w-5" />} title="Recommended High School Subjects">
                      <>
                        <p className="mb-3">Focusing on these subjects will provide a strong foundation for this path:</p>
                        <div className="flex flex-wrap gap-2">
                          {primaryCareer.subjects?.map((subject) => (
                            <Badge key={subject} variant="secondary">{subject}</Badge>
                          ))}
                        </div>
                      </>
                    </InfoCard>
                  </div>
                  
                  <div className="border-t bg-card p-6">
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
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-muted-foreground">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t bg-card p-6">
                    <InfoCard icon={<Sparkles className="h-5 w-5" />} title="Life & Work Balance">
                      <>
                        <p className="mb-3">A fulfilling career is about more than just work. To build a happy and balanced life, consider incorporating hobbies like these:</p>
                        <ul className="space-y-2">
                          {primaryCareer.hobbies?.map((hobby, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                              <span className="text-muted-foreground">{hobby}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    </InfoCard>
                  </div>
                </Card>

                <section>
                  <h2 className="mb-4 text-xl font-bold text-foreground">Other Top Suggestions</h2>
                  <Accordion type="single" collapsible className="w-full rounded-xl border-2">
                    {allCareers.slice(1).map((career, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className={index === allCareers.slice(1).length -1 ? 'border-b-0' : ''}>
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6">
                          <div className="flex items-center gap-4">
                            <Badge variant="secondary">{`#${index + 2}`}</Badge>
                            <span>{career.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 px-6">
                          <div className="space-y-4 p-4 bg-accent/30 rounded-lg">
                            <p className="text-muted-foreground">{career.description}</p>
                            <p className="text-sm font-medium text-accent-foreground">{career.reasoning}</p>
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
                <Card className="rounded-xl border-2 shadow-none sticky top-8">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">Featured Professional</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <Image src="https://placehold.co/100x100.png" alt={featuredProfessional.name} data-ai-hint="professional portrait" width={80} height={80} className="rounded-full flex-shrink-0" />
                    <div>
                      <p className="font-bold text-foreground">{featuredProfessional.name}</p>
                      <p className="text-sm font-semibold text-primary">{featuredProfessional.title}</p>
                      <p className="mt-2 text-xs text-muted-foreground italic">"{featuredProfessional.bio}"</p>
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>

            <div className="mt-12 space-y-8">
              <Card className="rounded-xl border-2 shadow-none">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Share2 className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Share & Save</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button onClick={() => setShowShareModal(true)} className="w-full">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Invite More Contributors
                    </Button>
                    <Button variant="secondary" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Full Report
                    </Button>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-2 shadow-none">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Play className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Explore Further</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-center">Watch Career Videos</Button>
                  <Button variant="outline" className="w-full justify-center">Find Online Courses</Button>
                  <Button variant="outline" className="w-full justify-center">Connect with Professionals</Button>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-2 shadow-none bg-accent/50 text-center">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">Ready for the Next Step?</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                    Start building your future today with the right subject choices and career preparation.
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button variant="default">Get Subject Planning Guide</Button>
                    <Button variant="outline" onClick={() => setShowShareModal(true)}>Add More Perspectives</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 text-center">
                <Button onClick={handleStartOver} variant="ghost" className="text-muted-foreground">
                    Start Over
                </Button>
            </div>
          </main>
        </div>
      </div>
      {showShareModal && <ShareModal setShow={setShowShareModal} />}
    </>
  );
};

export default ResultsScreen;
