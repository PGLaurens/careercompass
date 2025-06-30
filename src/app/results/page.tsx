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
                const result = await getCareerSuggestionsAction({ responses });
                if (result.success) {
                    setResults(result.data);
                } else {
                    setError(result.error);
                }
            });
        }
    }, [sessionData.sessionId, responses, results]);

    if (isContextLoading || isPending) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8 space-y-4">
                        <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                        <Skeleton className="h-8 w-1/2 mx-auto" />
                        <Skeleton className="h-6 w-1/3 mx-auto" />
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <Skeleton className="h-[400px] w-full rounded-2xl" />
                            <div className="grid md:grid-cols-2 gap-4">
                                <Skeleton className="h-[200px] w-full rounded-2xl" />
                                <Skeleton className="h-[200px] w-full rounded-2xl" />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <Skeleton className="h-[300px] w-full rounded-2xl" />
                            <Skeleton className="h-[200px] w-full rounded-2xl" />
                            <Skeleton className="h-[250px] w-full rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
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

    return null; 
};

export default ResultsPage;
