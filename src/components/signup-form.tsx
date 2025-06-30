'use client';

import React, { useState } from 'react';
import { UserPlus, CheckCircle } from 'lucide-react';
import { useCareerCompass } from '@/context/career-compass-context';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const SignupForm = () => {
  const { userType, startSession } = useCareerCompass();
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [studentName, setStudentName] = useState('');

  const canSubmit = userInfo.name && userInfo.email && (userType === 'learner' || (userType === 'parent' && studentName));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      startSession(userInfo.name, userInfo.email, studentName);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md mx-auto w-full shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl text-balance">Get Started</CardTitle>
          <CardDescription className="text-wrap">Create your free account to discover the perfect career path.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>
            
            {userType === 'parent' && (
              <div className="space-y-2">
                <Label htmlFor="studentName">Student's Name</Label>
                <Input
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your child's name"
                  required
                />
              </div>
            )}
            
            <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-accent mr-2" />
                <span className="text-accent-foreground font-medium text-balance">100% Free</span>
                </div>
                <p className="text-accent-foreground/80 text-sm text-wrap">No credit card required. Get comprehensive career guidance at no cost.</p>
            </div>
            
            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
            >
              Start Career Discovery
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
