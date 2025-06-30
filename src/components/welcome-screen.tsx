'use client';

import React from 'react';
import { Users, GraduationCap, Target, CheckCircle } from 'lucide-react';
import { useCareerCompass } from '@/context/career-compass-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const WelcomeScreen = () => {
  const { setUserType } = useCareerCompass();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <header className="text-center mb-10">
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Target className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 font-headline text-balance">
          Career Compass
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Discover the perfect career path with AI-powered guidance. Answer a few questions to receive personalized, actionable advice.
        </p>
      </header>

      <main className="w-full max-w-4xl">
        <Card className="shadow-2xl rounded-2xl w-full">
          <CardHeader className="text-center items-center pt-8">
            <CardTitle className="text-3xl font-bold">Who is this for?</CardTitle>
            <CardDescription className="text-muted-foreground pt-1 text-balance">
              Select an option to personalize the questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div
                onClick={() => setUserType('parent')}
                className="group p-6 border-2 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer flex flex-col items-center text-center"
              >
                <Users className="w-12 h-12 text-primary mb-4 transition-transform group-hover:scale-110" />
                <h3 className="text-xl font-semibold mb-2 text-balance">I'm a Parent</h3>
                <p className="text-muted-foreground text-sm text-balance">
                  Helping my child navigate their future with wisdom and support.
                </p>
              </div>

              <div
                onClick={() => setUserType('learner')}
                className="group p-6 border-2 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer flex flex-col items-center text-center"
              >
                <GraduationCap className="w-12 h-12 text-primary mb-4 transition-transform group-hover:scale-110" />
                <h3 className="text-xl font-semibold mb-2 text-balance">I'm a Learner</h3>
                <p className="text-muted-foreground text-sm text-balance">
                  Exploring my interests and discovering my own path forward.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4 mt-8 max-w-3xl mx-auto">
          <div className="bg-card border rounded-lg p-4 text-left flex items-start space-x-3">
            <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-medium text-balance">Better Together</h4>
              <p className="text-muted-foreground text-sm text-wrap">Invite others to contribute for more accurate results.</p>
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-left flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-medium text-balance">100% Free</h4>
              <p className="text-muted-foreground text-sm text-wrap">Get comprehensive career guidance at no cost.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WelcomeScreen;
