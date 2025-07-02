'use client';

import React, { useState } from 'react';
import { useCareerCompass } from '@/context/career-compass-context';
import { useRouter } from 'next/navigation';
import { questionSets } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ChevronRight, ArrowLeft, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, children }: { id: string, children: React.ReactNode }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    
    return (
        <div ref={setNodeRef} style={style} {...attributes} className="flex items-center bg-card border rounded-lg p-3 text-card-foreground touch-none shadow-sm w-full">
            <button {...listeners} className="cursor-grab p-2 -ml-2 mr-2 text-muted-foreground hover:text-foreground">
                <GripVertical className="w-5 h-5" />
            </button>
            <div className="flex-1">{children}</div>
        </div>
    );
};

const AssessmentScreen = () => {
    const { userType, responses, setResponses, sessionData, setSessionData } = useCareerCompass();
    const router = useRouter();

    const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

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

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const rankedItems: string[] = responses[activeQuestion.id] || [];
        if (active.id !== over?.id && over) {
            const oldIndex = rankedItems.findIndex(item => item === active.id);
            const newIndex = rankedItems.findIndex(item => item === over.id);

            if (oldIndex > -1 && newIndex > -1) {
                const newOrder = arrayMove(rankedItems, oldIndex, newIndex);
                setResponses({ ...responses, [activeQuestion.id]: newOrder });
            }
        }
    };

    const getSelectionPrompt = () => {
        switch (activeQuestion.type) {
            case 'multiselect':
                return "Select all that apply.";
            case 'single':
                return "Select one option.";
            case 'ranking':
                return "Click to rank, then drag to reorder.";
            default:
                return "";
        }
    }

    return (
        <div className="min-h-screen bg-background p-4 flex flex-col justify-center">
            <div className="max-w-3xl w-full mx-auto">
                <div className="mb-8">
                     <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-muted-foreground">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                     </Button>
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
                            {activeQuestion.type === 'multiselect' && (
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
                            )}
                            {activeQuestion.type === 'single' && (
                                <>
                                    {activeQuestion.options.map((option, index) => (
                                        <Button key={index} variant="outline" onClick={() => handleNext(option)} className="w-full p-4 h-auto text-left justify-between border-2 rounded-lg group hover:border-primary/50 text-base">
                                             <span className="text-wrap normal-case font-normal">{option}</span>
                                             <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                        </Button>
                                    ))}
                                </>
                            )}
                             {activeQuestion.type === 'ranking' && (() => {
                                const rankedItems: string[] = responses[activeQuestion.id] || [];
                                const unrankedItems = activeQuestion.options.filter(opt => !rankedItems.includes(opt));
                                
                                return (
                                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <h3 className="font-semibold text-foreground">Your Ranking (drag to reorder)</h3>
                                                <div className="p-4 border rounded-lg min-h-[5rem] space-y-3 bg-accent/20">
                                                    {rankedItems.length > 0 ? (
                                                        <SortableContext items={rankedItems} strategy={verticalListSortingStrategy}>
                                                            {rankedItems.map((item, index) => (
                                                                <SortableItem key={item} id={item}>
                                                                    <span className="font-bold text-primary mr-3">{index + 1}.</span>
                                                                    <span className="text-wrap normal-case font-normal">{item}</span>
                                                                </SortableItem>
                                                            ))}
                                                        </SortableContext>
                                                    ) : (
                                                        <p className="text-muted-foreground text-sm text-center py-4">Click items below to add them to your ranking.</p>
                                                    )}
                                                </div>
                                            </div>

                                            {unrankedItems.length > 0 && (
                                                <div className="space-y-2">
                                                    <h3 className="font-semibold text-foreground">Available Options</h3>
                                                    <div className="space-y-2">
                                                        {unrankedItems.map((option) => (
                                                            <Button key={option} variant="outline" className="w-full justify-start" onClick={() => handleMultiSelect(option)}>
                                                                {option}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {rankedItems.length === activeQuestion.options.length && (
                                                <Button onClick={() => handleNext(rankedItems)} className="w-full mt-6">
                                                    Continue
                                                </Button>
                                            )}
                                        </div>
                                    </DndContext>
                                )
                            })()}
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
