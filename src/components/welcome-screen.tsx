'use client';

import React from 'react';
import { Users, GraduationCap, Compass, CheckCircle } from 'lucide-react';
import { useCareerCompass } from '@/context/career-compass-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WelcomeScreen = () => {
  const { setUserType } = useCareerCompass();

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
                onClick={() => setUserType('parent')}
                variant="outline"
                className="group p-6 h-auto border-2 rounded-xl hover:border-primary hover:bg-accent transition-all duration-200 cursor-pointer flex flex-col items-center text-center space-y-2"
              >
                <Users className="w-10 h-10 text-primary mb-2 transition-transform group-hover:scale-110" />
                <h3 className="text-lg font-semibold text-foreground">I'm a Parent</h3>
                <p className="text-muted-foreground text-sm text-balance font-normal normal-case">
                  Helping my child explore their future.
                </p>
              </Button>

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
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="w-full max-w-4xl mx-auto mt-16 text-left">
        <div className="grid md:grid-cols-2 gap-8 p-4 border-t pt-8">
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">How It Works</h3>
                <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Answer questions about yourself and what you love to do.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Optionally, invite parents or mentors to share their unique perspective.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Our AI analyzes all the feedback to create a personalized report just for you.</span>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">What You'll Get</h3>
                <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Your top 3 career matches with detailed descriptions and timelines.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Personal insights into your strengths, motivations, and ideal work style.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Actionable next steps, including courses to take and professionals to connect with.</span>
                    </li>
                </ul>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeScreen;
