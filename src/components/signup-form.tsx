'use client';

import React, { useState } from 'react';
import { UserPlus, CheckCircle } from 'lucide-react';
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
      <Card className="max-w-md mx-auto w-full shadow-2xl rounded-2xl">
        <CardHeader className="text-center items-center pt-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold">Get Started</CardTitle>
          <CardDescription className="text-muted-foreground pt-1 text-balance">
            Create your free account to discover your perfect career path.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {userType === 'parent' && (
              <div className="space-y-1.5 text-left">
                <Label htmlFor="studentName">Student's Name</Label>
                <Input
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your child's name"
                  required
                  className="bg-secondary/30 border-border"
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
                placeholder="Enter your full name"
                required
                className="bg-secondary/30 border-border"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="bg-secondary/30 border-border"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                type="text"
                value={userInfo.country}
                onChange={handleChange}
                placeholder="e.g., USA, Canada"
                required
                className="bg-secondary/30 border-border"
              />
            </div>
             <div className="space-y-1.5 text-left">
              <Label htmlFor="region">State / Province</Label>
              <Input
                id="region"
                type="text"
                value={userInfo.region}
                onChange={handleChange}
                placeholder="e.g., California, Ontario"
                required
                className="bg-secondary/30 border-border"
              />
            </div>
             <div className="space-y-1.5 text-left">
              <Label htmlFor="highSchool">High School Name</Label>
              <Input
                id="highSchool"
                type="text"
                value={userInfo.highSchool}
                onChange={handleChange}
                placeholder="Enter the name of the high school"
                required
                className="bg-secondary/30 border-border"
              />
            </div>
            
            <div className="!mt-6 p-4 bg-accent/40 border border-accent/60 rounded-lg text-left">
                <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-800 font-semibold text-balance">100% Free</span>
                </div>
                <p className="text-green-800/80 text-sm text-wrap mt-1">
                  No credit card required. Get comprehensive career guidance at no cost.
                </p>
            </div>
            
            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full !mt-6 text-lg h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg"
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
