'use client';

import { useEffect, useState, useTransition } from 'react';
import { useCareerCompass } from '@/context/career-compass-context';
import { useRouter } from 'next/navigation';
import { getCareerSuggestionsAction } from '@/actions/get-career-suggestions';
import type { CareerResults } from '@/lib/types';
import ResultsScreen from '@/components/results-screen';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const ResultsPage = () => {
    const { sessionData, responses, isLoading: isContextLoading } = useCareerCompass();
    const router = useRouter();
    const [results, setResults] = useState<CareerResults | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!isContextLoading && !sessionData.sessionId) {
            router.push('/');
        }
    }, [sessionData, isContextLoading, router]);

    useEffect(() => {
        if (sessionData.sessionId && Object.keys(responses).length > 0 && !results) {
            startTransition(async () => {
                const actionInput = { 
                    responses, 
                    country: sessionData.country,
                    region: sessionData.region,
                    highSchool: sessionData.highSchool
                };
                const result = await getCareerSuggestionsAction(actionInput);
                if (result.success) {
                    setResults(result.data);
                } else {
                    setError(result.error);
                }
            });
        }
    }, [sessionData, responses, results, router]); 

    if (isContextLoading || isPending) {
        return (
             <div className="min-h-screen bg-background p-4 md:p-8">
                <div className="max-w-2xl mx-auto space-y-8">
                    <Skeleton className="h-8 w-1/2" />
                    <div className="space-y-4">
                        <Skeleton className="h-32 w-full rounded-xl" />
                        <Skeleton className="h-32 w-full rounded-xl" />
                        <Skeleton className="h-32 w-full rounded-xl" />
                    </div>
                     <Skeleton className="h-8 w-1/2 mt-8" />
                     <div className="space-y-4">
                        <Skeleton className="h-24 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Alert variant="destructive" className="max-w-lg">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error Generating Results</AlertTitle>
                    <AlertDescription>
                        We encountered an issue while generating your career suggestions. Please try again later.
                        <p className="text-xs mt-2">{error}</p>
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    if (results) {
        return <ResultsScreen results={results} />;
    }

    if (!sessionData.sessionId) {
        return null;
    }

    return (
         <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
                <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating your results...</span>
            </div>
         </div>
    );
};

export default ResultsPage;
