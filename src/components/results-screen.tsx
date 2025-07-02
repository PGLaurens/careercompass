'use client';

import React from 'react';
import type { Career, CareerResults } from '@/lib/types';
import { useCareerCompass } from '@/context/career-compass-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import { Compass, User, BookOpenCheck, BarChartHorizontalBig, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ResultsScreenProps {
  results: CareerResults;
}

const CareerCard: React.FC<{ career: Career, isPrimary: boolean }> = ({ career, isPrimary }) => (
    <Card className="flex flex-col md:flex-row items-start gap-6 p-4 rounded-xl border-2">
        <Image
          data-ai-hint={`${career.title.toLowerCase().split(' ').slice(0,2).join(' ')}`}
          src={`https://placehold.co/400x400.png`}
          alt={career.title}
          width={100}
          height={100}
          className="rounded-lg object-cover w-full md:w-[100px] h-auto md:h-[100px]"
        />
        <div className="flex-1">
            <p className="text-sm font-semibold text-primary">{career.growth}</p>
            <h3 className="text-lg font-bold mt-1 text-foreground">{career.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{career.description}</p>
            {isPrimary && (
                 <Button variant="link" className="px-0 h-auto mt-2">Explore &rarr;</Button>
            )}
        </div>
    </Card>
)

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results }) => {
  const { sessionData, resetSession } = useCareerCompass();
  const router = useRouter();
  const { primaryCareer, alternativeCareer, thirdCareer, featuredProfessional, insights } = results;
  
  const handleStartOver = () => {
    resetSession();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-muted-foreground -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <div className="flex items-center gap-3 text-2xl font-bold text-foreground">
                <Compass className="w-8 h-8 text-primary"/>
                <h1>Career Recommendations</h1>
            </div>
        </header>

        <main className="space-y-10">
          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">Top Picks for You</h2>
            <div className="space-y-4">
                <CareerCard career={primaryCareer} isPrimary={true} />
                <CareerCard career={alternativeCareer} isPrimary={false} />
                <CareerCard career={thirdCareer} isPrimary={false} />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">Featured Professionals</h2>
            <Card className="p-4 rounded-xl border-2">
                <div className="flex items-start gap-4">
                    <Image
                      data-ai-hint="professional portrait"
                      src={`https://placehold.co/400x400.png`}
                      alt={featuredProfessional.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-[80px] h-[80px]"
                    />
                    <div className="flex-1">
                        <h3 className="font-bold text-foreground">{featuredProfessional.name}</h3>
                        <p className="text-sm font-medium text-primary">{featuredProfessional.title}</p>
                        <p className="text-sm text-muted-foreground mt-2">{featuredProfessional.bio}</p>
                    </div>
                </div>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-foreground">Career Counseling Insights</h2>
            <div className="space-y-3">
                <Card className="p-4 rounded-xl border-2 flex items-start gap-4">
                    <BookOpenCheck className="w-6 h-6 text-primary mt-1" />
                    <div>
                        <h3 className="font-bold text-foreground">Planning for a Balanced Life</h3>
                        <p className="text-sm text-muted-foreground">Align your career with personal values for a fulfilling life.</p>
                    </div>
                </Card>
                 <Card className="p-4 rounded-xl border-2 flex items-start gap-4">
                    <BarChartHorizontalBig className="w-6 h-6 text-primary mt-1" />
                    <div>
                        <h3 className="font-bold text-foreground">Work-Life Integration</h3>
                        <p className="text-sm text-muted-foreground">Understand how balance boosts productivity and well-being.</p>
                    </div>
                </Card>
            </div>
          </section>
        </main>
        
        <footer className="mt-12 text-center">
            <Button onClick={handleStartOver} variant="outline">Start Over</Button>
        </footer>

      </div>
    </div>
  );
};

export default ResultsScreen;
