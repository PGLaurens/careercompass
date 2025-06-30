'use client';

import React, { useState } from 'react';
import type { CareerResults } from '@/lib/types';
import { useCareerCompass } from '@/context/career-compass-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ShareModal from '@/components/share-modal';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Star,
  UserCheck,
  Clock,
  BarChart3,
  BookOpen,
  Heart,
  Share2,
  Play,
  User,
} from 'lucide-react';

interface ResultsScreenProps {
  results: CareerResults;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results }) => {
  const { sessionData } = useCareerCompass();
  const [showShareModal, setShowShareModal] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Star className="w-10 h-10 text-accent-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 font-headline text-balance">
            {sessionData.studentName ? `${sessionData.studentName}'s` : 'Your'} Career Path Revealed!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Based on {sessionData.contributors.length} perspective{sessionData.contributors.length !== 1 ? 's' : ''}, here's what we discovered
          </p>
          <div className="flex justify-center mt-6">
            <div className="bg-card rounded-lg px-4 py-2 shadow-sm border">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-accent-foreground" />
                <span className="text-sm text-foreground">
                  {sessionData.contributors.filter(c => c.completed).length} of {sessionData.contributors.length} contributors completed
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg rounded-2xl">
              <CardHeader className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-3xl font-bold text-balance">{results.primaryCareer.title}</CardTitle>
                        <p className="text-muted-foreground mt-2 text-wrap">{results.primaryCareer.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                        <div className="text-4xl font-bold text-accent-foreground">{results.primaryCareer.matchPercentage}%</div>
                        <div className="text-sm text-muted-foreground">Match</div>
                    </div>
                </div>
                <p className="text-base font-medium bg-primary/10 p-4 rounded-lg text-primary-foreground/90 mt-4 text-wrap">{results.primaryCareer.reasoning}</p>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center text-balance"><Clock className="w-5 h-5 mr-3 text-accent-foreground" />Your Journey Timeline</h3>
                    <div className="relative pl-6 border-l-2 border-border">
                        {results.primaryCareer.timeline?.map((stage, index) => (
                        <div key={index} className="flex items-start mb-6 last:mb-0">
                            <div className="absolute left-0 w-4 h-4 bg-background border-2 border-accent-foreground rounded-full -translate-x-1/2 mt-1"></div>
                            <div className="pl-6">
                                <h4 className="font-semibold text-foreground text-balance">{stage.stage}</h4>
                                <p className="text-sm text-muted-foreground text-wrap">{stage.duration}</p>
                                <p className="text-base text-foreground mt-1 text-wrap">{stage.focus}</p>
                                <p className="text-sm text-muted-foreground mt-1 text-wrap">{stage.details}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center text-balance"><BarChart3 className="w-5 h-5 mr-3 text-accent-foreground" />What You'll Do Daily</h3>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                      {results.primaryCareer.dailyTasks?.map((task, index) => (
                        <div key={index} className="flex items-center text-base text-foreground text-wrap"><div className="w-1.5 h-1.5 bg-accent-foreground rounded-full mr-3 flex-shrink-0"></div>{task}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center text-balance"><BookOpen className="w-5 h-5 mr-3 text-accent-foreground" />Recommended High School Subjects</h3>
                    <div className="flex flex-wrap gap-2">
                      {results.primaryCareer.subjects?.map((subject, index) => (
                        <span key={index} className="px-4 py-1.5 bg-primary/10 text-primary-foreground text-sm font-medium rounded-full text-balance">{subject}</span>
                      ))}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 p-4 bg-primary/10 rounded-lg">
                    <div><h4 className="font-semibold text-primary-foreground text-balance">Expected Salary</h4><p className="text-primary-foreground/80 text-sm text-wrap">{results.primaryCareer.salary}</p></div>
                    <div><h4 className="font-semibold text-primary-foreground text-balance">Growth Outlook</h4><p className="text-primary-foreground/80 text-sm text-wrap">{results.primaryCareer.growth}</p></div>
                    <div><h4 className="font-semibold text-primary-foreground text-balance">Environment</h4><p className="text-primary-foreground/80 text-sm text-wrap">{results.primaryCareer.workEnvironment}</p></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                {[results.alternativeCareer, results.thirdCareer].map((career, index) => (
                    <Card key={index} className="shadow-lg rounded-2xl">
                        <CardHeader className="p-6">
                            <CardTitle className="text-xl text-balance">Alternative Path #{index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-foreground text-xl text-balance">{career.title}</h4>
                                <div className="text-xl font-bold text-accent-foreground">{career.matchPercentage}%</div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 text-wrap">{career.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {career.subjects?.slice(0, 3).map((subject, i) => (
                                <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium text-balance">{subject}</span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>

          <aside className="space-y-6">
            <Card className="shadow-lg rounded-2xl">
                <CardHeader className="p-6"><h3 className="text-xl font-semibold text-foreground flex items-center text-balance"><User className="w-5 h-5 mr-3 text-accent-foreground" />Personality Insights</h3></CardHeader>
                <CardContent className="space-y-4 p-6 pt-0">
                    <div><h4 className="font-medium text-foreground text-balance">Personality Type</h4><p className="text-sm text-muted-foreground mt-1 text-wrap">{results.insights.personalityType}</p></div>
                    <div><h4 className="font-medium text-foreground text-balance">Core Strengths</h4><ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-1 text-wrap">{results.insights.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
                    <div><h4 className="font-medium text-foreground text-balance">What Drives You</h4><ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-1 text-wrap">{results.insights.motivations.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
                    <div><h4 className="font-medium text-foreground text-balance">Work Style</h4><p className="text-sm text-muted-foreground mt-1 text-wrap">{results.insights.workStyle}</p></div>
                </CardContent>
            </Card>
            <Card className="shadow-lg rounded-2xl">
                <CardHeader className="p-6"><h3 className="text-xl font-semibold text-foreground flex items-center text-balance"><Heart className="w-5 h-5 mr-3 text-accent-foreground" />Work Hard, Play Hard</h3></CardHeader>
                <CardContent className="p-6 pt-0">
                    <p className="text-sm text-muted-foreground mb-4 text-wrap">A balanced life is key. Hobbies that complement this career path:</p>
                    <div className="space-y-3">
                        {results.primaryCareer.hobbies?.map((hobby, index) => (
                            <div key={index} className="flex items-center text-base text-foreground text-wrap"><div className="w-1.5 h-1.5 bg-accent-foreground rounded-full mr-3 flex-shrink-0"></div>{hobby}</div>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </aside>
        </main>

        <footer className="mt-12 space-y-8">
            <div className="text-center">
                <Button variant="outline" size="lg" onClick={() => setShowShareModal(true)}>
                    <Share2 className="mr-2 h-4 w-4" /> Share Results
                </Button>
            </div>

            <Collapsible open={isExploreOpen} onOpenChange={setIsExploreOpen} className="w-full max-w-3xl mx-auto">
                <Card className="rounded-2xl">
                    <CollapsibleTrigger className="w-full p-6 text-left">
                        <div className="flex items-center gap-3">
                            <Play className="w-6 h-6 text-accent-foreground" />
                            <h3 className="text-xl font-semibold">Explore Further</h3>
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="px-6 pb-6 space-y-3">
                            <Button variant="outline" className="w-full h-12 text-base justify-center">Watch Career Videos</Button>
                            <Button variant="outline" className="w-full h-12 text-base justify-center">Find Online Courses</Button>
                            <Button variant="outline" className="w-full h-12 text-base justify-center">Connect with Professionals</Button>
                        </div>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

            <div className="rounded-2xl bg-card border shadow-sm p-8 md:p-12 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Ready for the Next Step?</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto text-balance">
                Start building your future today with the right subject choices and career preparation
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button size="lg">Get Subject Planning Guide</Button>
                    <Button size="lg" variant="outline" onClick={() => setShowShareModal(true)}>Add More Perspectives</Button>
                </div>
            </div>
        </footer>

      </div>
      {showShareModal && <ShareModal setShow={setShowShareModal} />}
    </div>
  );
};

export default ResultsScreen;
