'use client';

import React, { useState } from 'react';
import { useCareerCompass } from '@/context/career-compass-context';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, UserPlus, Pencil } from 'lucide-react';
import type { Contributor } from '@/lib/types';

interface ShareModalProps {
  setShow: (show: boolean) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ setShow }) => {
  const { sessionData, addContributor, selectContributorForAssessment } = useCareerCompass();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');

  const handleAddContributor = (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionData.contributors.length >= 5) {
      toast({
        variant: "destructive",
        title: "Maximum Contributors Reached",
        description: "You can only add up to 5 contributors.",
      });
      return;
    }
    if (name && relationship) {
      const newContributor: Contributor = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        relationship: relationship as Contributor['relationship'],
        email: '', // Email is not mandatory for this flow
        completed: false,
      };
      addContributor(newContributor);
      toast({
        title: "Contributor Added!",
        description: `${name} can now take the assessment.`,
      });
      setName('');
      setRelationship('');
    }
  };

  const startAssessmentFor = (contributorId: string) => {
    selectContributorForAssessment(contributorId);
    setShow(false);
  };

  return (
    <Dialog open onOpenChange={setShow}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-6 h-6 text-primary-foreground" />
          </div>
          <DialogTitle className="text-center text-xl text-balance">Add More Perspectives</DialogTitle>
          <DialogDescription className="text-center text-wrap">
            Add up to 5 family members, friends, or mentors to contribute insights for {sessionData.studentName || 'the student'}. This works best by passing the device to each person.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <h4 className="font-semibold text-accent-foreground mb-3 text-balance">Contributors ({sessionData.contributors.length}/5)</h4>
                <div className="space-y-2">
                {sessionData.contributors.map((contributor, index) => (
                    <div key={`${contributor.id}-${index}`} className="flex items-center justify-between text-sm p-2 rounded-md bg-background">
                        <div className="flex items-center gap-2">
                            {contributor.completed ? (
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            ) : (
                                <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            )}
                            <span className="text-foreground/90 text-wrap">{contributor.name} ({contributor.relationship})</span>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => startAssessmentFor(contributor.id)}>
                            <Pencil className="w-3 h-3 mr-1" />
                            {contributor.completed ? 'Edit' : 'Start'}
                        </Button>
                    </div>
                ))}
                </div>
            </div>

            {sessionData.contributors.length < 5 && (
                <form onSubmit={handleAddContributor} className="space-y-4 border-t pt-6">
                    <div>
                        <h4 className="font-semibold text-accent-foreground mb-2 text-balance">Add a New Contributor</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Jane Doe" required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="relationship">Relationship</Label>
                                 <Select onValueChange={setRelationship} value={relationship}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select relationship" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Parent">Parent</SelectItem>
                                        <SelectItem value="Friend">Friend</SelectItem>
                                        <SelectItem value="Teacher">Teacher</SelectItem>
                                        <SelectItem value="Mentor">Mentor</SelectItem>
                                        <SelectItem value="Family">Other Family</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                       <UserPlus className="w-4 h-4 mr-2" />
                       Add Contributor
                    </Button>
                </form>
            )}
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => setShow(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
