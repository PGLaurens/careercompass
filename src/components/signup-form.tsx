'use client';

import React, { useState } from 'react';
import { UserPlus, Compass } from 'lucide-react';
import { useCareerCompass } from '@/context/career-compass-context';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SignupForm = () => {
  const { userType, startSession } = useCareerCompass();
  const [userInfo, setUserInfo] = useState({ 
    name: '', 
    email: '',
    country: '',
    region: '',
    highSchool: '',
  });
  const [studentName, setStudentName] = useState('');

  const canSubmit = userInfo.name && userInfo.email && userInfo.country && userInfo.region && userInfo.highSchool && (userType === 'learner' || (userType === 'parent' && studentName));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserInfo(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      startSession(userInfo.name, userInfo.email, studentName, userInfo.country, userInfo.region, userInfo.highSchool);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md mx-auto w-full shadow-none border-none bg-transparent">
        <CardHeader className="text-center items-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Compass className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Tell us about yourself</CardTitle>
          <CardDescription className="text-muted-foreground pt-1 text-balance">
            This information helps us personalize your results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {userType === 'parent' && (
              <div className="space-y-1.5 text-left">
                <Label htmlFor="studentName">Student's Name</Label>
                <Input
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g., Jane Doe"
                  required
                  className="bg-card border-border"
                />
              </div>
            )}
            <div className="space-y-1.5 text-left">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                value={userInfo.name}
                onChange={handleChange}
                placeholder="e.g., John Doe"
                required
                className="bg-card border-border"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="bg-card border-border"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                value={userInfo.country}
                onChange={handleChange}
                placeholder="e.g., USA, South Africa"
                required
                className="bg-card border-border"
              />
            </div>
             <div className="space-y-1.5 text-left">
              <Label htmlFor="region">State / Province</Label>
              <Input
                id="region"
                type="text"
                value={userInfo.region}
                onChange={handleChange}
                placeholder="e.g., California, Gauteng"
                required
                className="bg-card border-border"
              />
            </div>
             <div className="space-y-1.5 text-left">
              <Label htmlFor="highSchool">High School Name</Label>
              <Input
                id="highSchool"
                type="text"
                value={userInfo.highSchool}
                onChange={handleChange}
                placeholder="e.g., Northwood High"
                required
                className="bg-card border-border"
              />
            </div>
            
            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full !mt-8 text-lg h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg"
            >
              Continue to Assessment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
