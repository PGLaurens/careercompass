'use client';

import React, { useState } from 'react';
import { useCareerCompass } from '@/context/career-compass-context';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Share2, Copy, CheckCircle, Clock } from 'lucide-react';

interface ShareModalProps {
  setShow: (show: boolean) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ setShow }) => {
  const { sessionData } = useCareerCompass();
  const { toast } = useToast();
  const shareLink = `${window.location.origin}/contribute/${sessionData.sessionId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Copied to clipboard!",
      description: "You can now share the link with others.",
    });
  };

  return (
    <Dialog open onOpenChange={setShow}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-center text-xl">Get More Perspectives</DialogTitle>
          <DialogDescription className="text-center">
            Invite family and friends to contribute their insights about {sessionData.studentName || 'the student'}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Share Link</label>
                <div className="flex items-center space-x-2">
                    <Input value={shareLink} readOnly />
                    <Button size="icon" onClick={copyToClipboard}>
                        <Copy className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Contributors So Far</h4>
                <div className="space-y-2">
                {sessionData.contributors.map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-green-700">{contributor.name} ({contributor.relationship})</span>
                    {contributor.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                        <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                    </div>
                ))}
                </div>
                {sessionData.contributors.length < 5 &&
                    <p className="text-xs text-green-600 mt-2">
                        {5 - sessionData.contributors.length} more contributors can be added.
                    </p>
                }
            </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => setShow(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
