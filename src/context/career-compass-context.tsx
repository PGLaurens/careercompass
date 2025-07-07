'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { type UserType, type SessionData, type Contributor } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface CareerCompassContextType {
  userType: UserType;
  setUserType: (userType: UserType) => void;
  sessionData: SessionData;
  setSessionData: React.Dispatch<React.SetStateAction<SessionData>>;
  responses: Record<string, any>;
  setResponses: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  startSession: (name: string, email: string, studentName: string, country: string, region: string, highSchool: string) => void;
  addContributor: (contributor: Contributor) => void;
  resetSession: () => void;
  isLoading: boolean;
  isMounted: boolean;
  currentContributorId: string | null;
  setCurrentContributorId: (id: string | null) => void;
  selectContributorForAssessment: (contributorId: string) => void;
}

const CareerCompassContext = createContext<CareerCompassContextType | undefined>(undefined);

const initialState: SessionData = {
  studentName: '',
  sessionId: '',
  contributors: [],
  allResponses: [],
  country: '',
  region: '',
  highSchool: '',
};

export const CareerCompassProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserTypeState] = useState<UserType>(null);
  const [sessionData, setSessionData] = useState<SessionData>(initialState);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [currentContributorId, setCurrentContributorId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedState = localStorage.getItem('careerCompassSession');
      if (savedState) {
        const { userType, sessionData, responses, currentContributorId } = JSON.parse(savedState);
        setUserTypeState(userType);
        setSessionData(sessionData || initialState);
        setResponses(responses || {});
        setCurrentContributorId(currentContributorId || null);
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
      localStorage.removeItem('careerCompassSession');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && isMounted) {
      try {
        const stateToSave = JSON.stringify({ userType, sessionData, responses, currentContributorId });
        localStorage.setItem('careerCompassSession', stateToSave);
      } catch (error) {
        console.error("Failed to save state to localStorage", error);
      }
    }
  }, [userType, sessionData, responses, currentContributorId, isLoading, isMounted]);
  
  const setUserType = (newUserType: UserType) => {
    setUserTypeState(newUserType);
    router.push(`/signup?userType=${newUserType}`);
  };

  const startSession = (name: string, email: string, studentName: string = '', country: string, region: string, highSchool: string) => {
    const isParent = userType === 'parent';
    const firstContributorId = Math.random().toString(36).substr(2, 9);
    const newSessionData: SessionData = {
      studentName: isParent ? studentName : name,
      sessionId: Math.random().toString(36).substr(2, 9),
      contributors: [{
        id: firstContributorId,
        name,
        email,
        relationship: isParent ? 'Parent' : 'Self',
        completed: false
      }],
      allResponses: [],
      country,
      region,
      highSchool,
    };
    setSessionData(newSessionData);
    setCurrentContributorId(firstContributorId);
    router.push('/assessment');
  };

  const addContributor = (contributor: Contributor) => {
    if (sessionData.contributors.length < 5) {
      setSessionData(prev => ({
        ...prev,
        contributors: [...prev.contributors, contributor]
      }));
    }
  };

  const selectContributorForAssessment = (contributorId: string) => {
    const existingResponse = sessionData.allResponses.find(r => r.contributorId === contributorId);
    setResponses(existingResponse ? existingResponse.responses : {});
    setCurrentContributorId(contributorId);
    router.push('/assessment');
  };

  const resetSession = () => {
    setUserTypeState(null);
    setSessionData(initialState);
    setResponses({});
    setCurrentContributorId(null);
    localStorage.removeItem('careerCompassSession');
    router.push('/');
  };

  return (
    <CareerCompassContext.Provider value={{ 
      userType, 
      setUserType, 
      sessionData, 
      setSessionData,
      responses,
      setResponses,
      startSession,
      addContributor,
      resetSession,
      isLoading,
      isMounted,
      currentContributorId,
      setCurrentContributorId,
      selectContributorForAssessment
    }}>
      {children}
    </CareerCompassContext.Provider>
  );
};

export const useCareerCompass = () => {
  const context = useContext(CareerCompassContext);
  if (context === undefined) {
    throw new Error('useCareerCompass must be used within a CareerCompassProvider');
  }
  return context;
};
