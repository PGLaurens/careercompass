'use client';

import React from 'react';
import { Users, GraduationCap, Compass, CheckCircle, ListChecks, Sparkles } from 'lucide-react';
import { useCareerCompass } from '@/context/career-compass-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WelcomeScreen = () => {
  const { setUserType } = useCareerCompass();

  const InfoCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <div className="flex flex-col items-center space-y-1 text-center p-4 rounded-lg bg-accent/50">
      <div className="text-primary mb-2">{icon}</div>
      <h4 className="font-semibold text-sm text-foreground">{title}</h4>
      <p className="text-xs text-muted-foreground text-balance">
        {children}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <header className="text-center mb-10 w-full max-w-lg">
        <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Compass className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 font-headline text-balance">
          Career Compass
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Discover the perfect career path with AI-powered guidance.
        </p>
      </header>

      <main className="w-full max-w-lg">
        <Card className="shadow-none border-none bg-transparent w-full">
          <CardHeader className="text-center items-center pt-2">
            <CardTitle className="text-2xl font-bold">Who is taking the assessment?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <Button
                onClick={() => setUserType('learner')}
                variant="outline"
                className="group p-6 h-auto border-2 rounded-xl hover:border-primary hover:bg-accent transition-all duration-200 cursor-pointer flex flex-col items-center text-center space-y-2"
              >
                <GraduationCap className="w-10 h-10 text-primary mb-2 transition-transform group-hover:scale-110" />
                <h3 className="text-lg font-semibold text-foreground">I'm a Learner</h3>
                <p className="text-muted-foreground text-sm text-balance font-normal normal-case">
                  Exploring my interests to find my path.
                </p>
              </Button>
              
              <Button
                onClick={() => setUserType('parent')}
                variant="outline"
                className="group p-6 h-auto border-2 rounded-xl hover:border-primary hover:bg-accent transition-all duration-200 cursor-pointer flex flex-col items-center text-center space-y-2"
              >
                <Users className="w-10 h-10 text-primary mb-2 transition-transform group-hover:scale-110" />
                <h3 className="text-lg font-semibold text-foreground">I'm a Contributor</h3>
                <p className="text-muted-foreground text-sm text-balance font-normal normal-case">
                  Helping as a parent, family member, or friend.
                </p>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard icon={<ListChecks className="w-6 h-6" />} title="Quick & Easy">
                Answer a few fun questions about your interests and strengths to get started.
            </InfoCard>
            <InfoCard icon={<Users className="w-6 h-6" />} title="Better Together">
                Invite family and friends to add their perspectives for more accurate results.
            </InfoCard>
            <InfoCard icon={<Sparkles className="w-6 h-6" />} title="In-depth AI Report">
                Get top career matches, a personalized timeline, and deep insights.
            </InfoCard>
            <InfoCard icon={<CheckCircle className="w-6 h-6" />} title="100% Free">
                Complete career guidance with a detailed, personalized report at no cost.
            </InfoCard>
        </div>
      </main>
    </div>
  );
};

export default WelcomeScreen;
