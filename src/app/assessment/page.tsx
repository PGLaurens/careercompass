'use client';

import AssessmentScreen from '@/components/assessment-screen';
import { useCareerCompass } from '@/context/career-compass-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AssessmentPage() {
    const { sessionData, isLoading } = useCareerCompass();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !sessionData.sessionId) {
            router.push('/');
        }
    }, [sessionData, isLoading, router]);

    if (isLoading || !sessionData.sessionId) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                <div className="max-w-3xl w-full mx-auto space-y-6">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <div className="space-y-4 pt-8">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>
        );
    }
  
    return <AssessmentScreen />;
}
