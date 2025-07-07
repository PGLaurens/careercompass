'use client';

import React, { useState } from 'react';
import { useCareerCompass } from '@/context/career-compass-context';
import { useRouter } from 'next/navigation';
import { questionSets } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ChevronRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RankingQuestion from './ranking-question';

const AssessmentScreen = () => {
    const { userType, responses, setResponses, sessionData, setSessionData, currentContributorId } = useCareerCompass();
    const router = useRouter();
    const { toast } = useToast();

    const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    if (!userType) return null;

    const activeQuestionSet = questionSets[userType][currentQuestionSet];
    const activeQuestion = activeQuestionSet[currentQuestion];
    
    const totalQuestions = questionSets[userType].reduce((sum, set) => sum + set.length, 0);
    const questionsCompleted = questionSets[userType].slice(0, currentQuestionSet).reduce((sum, set) => sum + set.length, 0) + currentQuestion;
    
    const currentContributor = sessionData.contributors.find(c => c.id === currentContributorId);

    const handleNext = (answer: any) => {
        const newResponses = { ...responses, [activeQuestion.id]: answer };
        setResponses(newResponses);

        const isLastQuestion = currentQuestion === activeQuestionSet.length - 1;
        const isLastSet = currentQuestionSet === questionSets[userType].length - 1;

        if (isLastQuestion && isLastSet) {
            if (!currentContributor) return; // Should not happen

            // Mark contributor as completed
            const updatedContributors = sessionData.contributors.map(c =>
                c.id === currentContributorId ? { ...c, completed: true } : c
            );

            // Check if there are existing responses for this contributor
            const existingResponseIndex = sessionData.allResponses.findIndex(
                r => r.contributorId === currentContributorId
            );

            let updatedAllResponses;
            const newResponsePayload = {
                contributorId: currentContributor.id,
                contributor: currentContributor.name,
                relationship: currentContributor.relationship,
                responses: newResponses
            };

            if (existingResponseIndex > -1) {
                // Update existing responses
                updatedAllResponses = [...sessionData.allResponses];
                updatedAllResponses[existingResponseIndex] = newResponsePayload;
            } else {
                // Add new responses
                updatedAllResponses = [...sessionData.allResponses, newResponsePayload];
            }
            
            setSessionData(prev => ({
                ...prev,
                contributors: updatedContributors,
                allResponses: updatedAllResponses,
            }));

            // Reset local responses for the next contributor
            setResponses({});
            router.push('/results');

        } else if (isLastQuestion) {
            setCurrentQuestionSet(currentQuestionSet + 1);
            setCurrentQuestion(0);
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else if (currentQuestionSet > 0) {
            const prevSetIndex = currentQuestionSet - 1;
            const prevSet = questionSets[userType][prevSetIndex];
            setCurrentQuestionSet(prevSetIndex);
            setCurrentQuestion(prevSet.length - 1);
        }
    };

    const handleMultiSelect = (option: string) => {
        const currentAnswers: string[] = responses[activeQuestion.id] || [];
        let newAnswers;
        const isRanking = activeQuestion.type === 'ranking';

        if (currentAnswers.includes(option)) {
            newAnswers = currentAnswers.filter((a: string) => a !== option);
        } else {
            // Only apply the 3-item limit to multiselect, not ranking questions
            if (isRanking || currentAnswers.length < 3) {
                newAnswers = [...currentAnswers, option];
            } else {
                toast({
                    title: "Maximum selections reached",
                    description: "You can only select up to 3 options for this question.",
                });
                newAnswers = currentAnswers;
            }
        }
        setResponses({ ...responses, [activeQuestion.id]: newAnswers });
    };

    const getSelectionPrompt = () => {
        switch (activeQuestion.type) {
            case 'multiselect':
                return "Select up to 3 options.";
            case 'single':
                return "Select one option.";
            case 'ranking':
                return "Click to rank, then drag to reorder.";
            default:
                return "";
        }
    }
    
    const renderQuestion = () => {
        switch (activeQuestion.type) {
            case 'multiselect':
                return (
                    <>
                        {activeQuestion.options.map((option, index) => (
                            <Button key={index} variant="outline" onClick={() => handleMultiSelect(option)} className={`w-full p-4 h-auto text-left justify-between border-2 rounded-lg group text-base ${(responses[activeQuestion.id] || []).includes(option) ? 'border-primary bg-accent text-accent-foreground' : 'hover:border-primary/50'}`}>
                                <span className="text-wrap normal-case font-normal">
                                    {option}
                                </span>
                                {(responses[activeQuestion.id] || []).includes(option) && <CheckCircle className="w-5 h-5 text-primary" />}
                            </Button>
                        ))}
                        {(responses[activeQuestion.id] || []).length > 0 && (
                            <Button onClick={() => handleNext(responses[activeQuestion.id])} className="w-full mt-6">
                                Continue
                            </Button>
                        )}
                    </>
                );
            case 'single':
                return (
                    <>
                        {activeQuestion.options.map((option, index) => (
                            <Button key={index} variant="outline" onClick={() => handleNext(option)} className="w-full p-4 h-auto text-left justify-between border-2 rounded-lg group hover:border-primary/50 text-base">
                                 <span className="text-wrap normal-case font-normal">{option}</span>
                                 <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                            </Button>
                        ))}
                    </>
                );
            case 'ranking':
                return <RankingQuestion 
                    question={activeQuestion}
                    responses={responses}
                    setResponses={setResponses}
                    handleNext={handleNext}
                    handleMultiSelect={handleMultiSelect}
                />
            default:
                return null;
        }
    }

    return (
        <div className="min-h-screen bg-background p-4 flex flex-col justify-center">
            <div className="max-w-3xl w-full mx-auto">
                <div className="mb-8">
                     <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-muted-foreground">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                     </Button>
                     <div className="p-3 mb-4 text-center rounded-lg bg-accent text-accent-foreground text-sm">
                        You are answering as: <strong className="font-bold">{currentContributor?.name} ({currentContributor?.relationship})</strong>
                     </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{questionsCompleted + 1} of {totalQuestions}</span>
                    </div>
                    <Progress value={((questionsCompleted + 1) / totalQuestions) * 100} className="h-2" />
                </div>

                <Card className="shadow-none border-none bg-transparent">
                    <CardHeader>
                        <CardTitle className="text-2xl lg:text-3xl font-bold text-balance">{activeQuestion.question}</CardTitle>
                        <CardDescription className="text-base">{activeQuestion.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm font-medium text-primary mb-4">{getSelectionPrompt()}</p>

                        <div className="space-y-3">
                           {renderQuestion()}
                        </div>
                        <div className="mt-8 flex justify-between items-center">
                            <Button variant="ghost" onClick={handlePrev} disabled={currentQuestion === 0 && currentQuestionSet === 0}>
                                Previous
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AssessmentScreen;
