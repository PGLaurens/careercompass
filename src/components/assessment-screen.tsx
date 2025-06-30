'use client';

import React, { useState } from 'react';
import { useCareerCompass } from '@/context/career-compass-context';
import { useRouter } from 'next/navigation';
import { questionSets } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ChevronRight } from 'lucide-react';

const AssessmentScreen = () => {
    const { userType, responses, setResponses, sessionData, setSessionData } = useCareerCompass();
    const router = useRouter();

    const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    if (!userType) return null;

    const activeQuestionSet = questionSets[userType][currentQuestionSet];
    const activeQuestion = activeQuestionSet[currentQuestion];
    
    const totalQuestions = questionSets[userType].reduce((sum, set) => sum + set.length, 0);
    const questionsCompleted = questionSets[userType].slice(0, currentQuestionSet).reduce((sum, set) => sum + set.length, 0) + currentQuestion;

    const handleNext = (answer: any) => {
        const newResponses = { ...responses, [activeQuestion.id]: answer };
        setResponses(newResponses);

        const isLastQuestion = currentQuestion === activeQuestionSet.length - 1;
        const isLastSet = currentQuestionSet === questionSets[userType].length - 1;

        if (isLastQuestion && isLastSet) {
            const currentUserEmail = sessionData.contributors[0]?.email;
            const updatedContributors = sessionData.contributors.map(c =>
                c.email === currentUserEmail ? { ...c, completed: true } : c
            );
            
            setSessionData(prev => ({
                ...prev,
                contributors: updatedContributors,
                allResponses: [...prev.allResponses, {
                    contributor: sessionData.contributors[0].name,
                    relationship: sessionData.contributors[0].relationship,
                    responses: newResponses
                }]
            }));

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
        const currentAnswers = responses[activeQuestion.id] || [];
        const newAnswers = currentAnswers.includes(option)
            ? currentAnswers.filter((a: string) => a !== option)
            : [...currentAnswers, option];
        setResponses({ ...responses, [activeQuestion.id]: newAnswers });
    };

    const toneMessage = userType === 'parent'
        ? "We understand this is an important decision for your child's future. Take your time and trust your parental instincts."
        : "This is your journey of discovery. There are no wrong answers - just honest ones that will help us understand you better.";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 flex items-center">
            <div className="max-w-3xl w-full mx-auto">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 font-medium">Progress</span>
                        <span className="text-sm text-gray-600">{questionsCompleted + 1} of {totalQuestions}</span>
                    </div>
                    <Progress value={((questionsCompleted + 1) / totalQuestions) * 100} className="h-2" />
                     <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">Set {currentQuestionSet + 1} of {questionSets[userType].length}</span>
                    </div>
                </div>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-balance">{activeQuestion.question}</CardTitle>
                        <CardDescription className="text-wrap">{activeQuestion.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6 p-3 rounded-lg bg-primary/10 text-primary-foreground/80">
                            <p className="text-sm text-blue-800 text-wrap">{toneMessage}</p>
                        </div>

                        <div className="space-y-3">
                            {activeQuestion.type === 'multiselect' && (
                                <>
                                    <p className="text-sm text-muted-foreground mb-2">Select all that apply.</p>
                                    {activeQuestion.options.map((option, index) => (
                                        <Button key={index} variant="outline" onClick={() => handleMultiSelect(option)} className={`w-full p-4 h-auto text-left justify-between border-2 rounded-lg group ${(responses[activeQuestion.id] || []).includes(option) ? 'border-primary bg-primary/10' : 'hover:border-primary/50'}`}>
                                            <span className={`text-base normal-case text-wrap ${(responses[activeQuestion.id] || []).includes(option) ? 'text-primary-foreground/90 font-medium' : 'text-foreground'}`}>{option}</span>
                                            {(responses[activeQuestion.id] || []).includes(option) && <CheckCircle className="w-5 h-5 text-primary" />}
                                        </Button>
                                    ))}
                                    {(responses[activeQuestion.id] || []).length > 0 && (
                                        <Button onClick={() => handleNext(responses[activeQuestion.id])} className="w-full mt-4 bg-gradient-to-r from-primary to-purple-600 text-white">
                                            Continue with {(responses[activeQuestion.id] || []).length} selected
                                        </Button>
                                    )}
                                </>
                            )}
                            {activeQuestion.type === 'single' && (
                                <>
                                    <p className="text-sm text-muted-foreground mb-2">Select one option.</p>
                                    {activeQuestion.options.map((option, index) => (
                                        <Button key={index} variant="outline" onClick={() => handleNext(option)} className="w-full p-4 h-auto text-left justify-between border-2 rounded-lg group hover:border-primary/50">
                                             <span className="text-base normal-case text-foreground text-wrap">{option}</span>
                                             <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                                        </Button>
                                    ))}
                                </>
                            )}
                             {activeQuestion.type === 'ranking' && (
                                <div>
                                    <p className="text-sm text-gray-600 mb-4 text-wrap">Click to rank from most important to least important. The first click is most important.</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {(responses[activeQuestion.id] || []).map((item: string, index: number) => (
                                            <div key={index} className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm flex items-center">
                                                <span className="text-balance">{index + 1}. {item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        {activeQuestion.options
                                            .filter(opt => !(responses[activeQuestion.id] || []).includes(opt))
                                            .map((option, index) => (
                                                <Button key={index} variant="outline" className="w-full justify-start" onClick={() => handleMultiSelect(option)}>
                                                    {option}
                                                </Button>
                                        ))}
                                    </div>
                                    {(responses[activeQuestion.id] || []).length === activeQuestion.options.length && (
                                        <Button onClick={() => handleNext(responses[activeQuestion.id])} className="w-full mt-4 bg-gradient-to-r from-primary to-purple-600 text-white">
                                            Continue with Ranking
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="mt-8 flex justify-between items-center">
                            <Button variant="ghost" onClick={handlePrev} disabled={currentQuestion === 0 && currentQuestionSet === 0}>
                                Previous
                            </Button>
                            <div className="text-sm text-gray-500">
                                Question {questionsCompleted + 1} of {totalQuestions}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AssessmentScreen;
