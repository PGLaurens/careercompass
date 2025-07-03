'use client';

import React from 'react';
import { Users, GraduationCap, Compass, CheckCircle } from 'lucide-react';
import { useCareerCompass } from '@/context/career-compass-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

        <div className="mt-10 space-y-4">
            <div className="flex flex-col items-center space-y-2 text-center p-5 rounded-xl border-2 bg-warning/10 border-warning/20">
                <Users className="w-8 h-8 text-warning-foreground mb-1" />
                <h4 className="font-semibold text-warning-foreground">Better Together</h4>
                <p className="text-sm text-muted-foreground text-balance">
                    Invite up to 5 family members or friends to contribute their perspectives for more accurate results
                </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center p-5 rounded-xl border-2 bg-success/10 border-success/20">
                <CheckCircle className="w-8 h-8 text-success-foreground mb-1" />
                <h4 className="font-semibold text-success-foreground">100% Free</h4>
                <p className="text-sm text-muted-foreground text-balance">
                    Complete career guidance with detailed reports at no cost
                </p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default WelcomeScreen;
