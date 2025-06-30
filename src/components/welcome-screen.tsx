'use client';

import React from 'react';
import { Users, GraduationCap, Target, CheckCircle } from 'lucide-react';
import { useCareerCompass } from '@/context/career-compass-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WelcomeScreen = () => {
  const { setUserType } = useCareerCompass();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Target className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 font-headline text-balance">Career Compass</h1>
          <p className="text-xl text-muted-foreground text-balance">Discover the perfect career path with AI-powered guidance</p>
        </div>
        
        <Card className="shadow-lg mb-8">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground text-balance">Who are you today?</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                    <Button
                    variant="outline"
                    onClick={() => setUserType('parent')}
                    className="group p-6 h-auto border-2 rounded-xl hover:border-primary hover:bg-primary/10 transition-all duration-200 flex flex-col"
                    >
                    <Users className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2 text-balance">I'm a Parent</h3>
                    <p className="text-muted-foreground text-sm normal-case text-wrap">Helping my child navigate their future with wisdom and support</p>
                    </Button>
                    
                    <Button
                    variant="outline"
                    onClick={() => setUserType('learner')}
                    className="group p-6 h-auto border-2 rounded-xl hover:border-accent hover:bg-accent/10 transition-all duration-200 flex flex-col"
                    >
                    <GraduationCap className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2 text-balance">I'm a Learner</h3>
                    <p className="text-muted-foreground text-sm normal-case text-wrap">Exploring my interests and discovering my path forward</p>
                    </Button>
                </div>
            </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-primary mr-2" />
              <span className="text-primary-foreground/90 font-medium text-balance">Better Together</span>
            </div>
            <p className="text-primary-foreground/80 text-sm text-wrap">Invite family or friends to contribute their perspectives for more accurate results.</p>
          </div>
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-5 h-5 text-accent mr-2" />
              <span className="text-accent-foreground font-medium text-balance">100% Free</span>
            </div>
            <p className="text-accent-foreground/80 text-sm text-wrap">Get comprehensive career guidance with detailed reports at no cost.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
