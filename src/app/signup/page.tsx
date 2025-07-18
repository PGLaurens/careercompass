'use client';

import SignupForm from '@/components/signup-form';
import { useCareerCompass } from '@/context/career-compass-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SignupPage() {
    const { userType, isLoading, isMounted } = useCareerCompass();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isMounted && !userType) {
            router.push('/');
        }
    }, [userType, isLoading, isMounted, router]);

    if (!isMounted || isLoading || !userType) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="max-w-md w-full mx-auto space-y-6">
                    <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                    <Skeleton className="h-8 w-48 mx-auto" />
                    <Skeleton className="h-6 w-full mx-auto" />
                    <div className="space-y-4 pt-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                    <Skeleton className="h-12 w-full mt-6" />
                </div>
            </div>
        );
    }
  
    return <SignupForm />;
}
