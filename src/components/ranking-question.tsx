'use client';

import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { Question } from '@/lib/types';
import { Button } from './ui/button';

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


interface RankingQuestionProps {
    question: Question;
    responses: Record<string, any>;
    setResponses: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    handleNext: (answer: any) => void;
    handleMultiSelect: (option: string) => void;
}

const RankingQuestion: React.FC<RankingQuestionProps> = ({ question, responses, setResponses, handleNext, handleMultiSelect }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const rankedItems: string[] = responses[question.id] || [];
        if (active.id !== over?.id && over) {
            const oldIndex = rankedItems.findIndex(item => item === active.id);
            const newIndex = rankedItems.findIndex(item => item === over.id);

            if (oldIndex > -1 && newIndex > -1) {
                const newOrder = arrayMove(rankedItems, oldIndex, newIndex);
                setResponses({ ...responses, [question.id]: newOrder });
            }
        }
    };

    const rankedItems: string[] = responses[question.id] || [];
    const unrankedItems = question.options.filter(opt => !rankedItems.includes(opt));
    
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
                
                {rankedItems.length === question.options.length && (
                    <Button onClick={() => handleNext(rankedItems)} className="w-full mt-6">
                        Continue
                    </Button>
                )}
            </div>
        </DndContext>
    );
};

export default RankingQuestion;
