'use client';

import React, { useState } from 'react';
import type { CareerResults } from '@/lib/types';
import { useCareerCompass } from '@/context/career-compass-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ShareModal from '@/components/share-modal';
import {
  Star,
  UserCheck,
  Clock,
  BarChart3,
  BookOpen,
  Heart,
  Share2,
  Plus,
  Download,
  Play,
  User,
} from 'lucide-react';

interface ResultsScreenProps {
  results: CareerResults;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results }) => {
  const { sessionData } = useCareerCompass();
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2 font-headline">
            {sessionData.studentName ? `${sessionData.studentName}'s` : 'Your'} Career Path Revealed!
          </h1>
          <p className="text-gray-600">
            Based on {sessionData.contributors.length} perspective{sessionData.contributors.length !== 1 ? 's' : ''}, here's what we discovered
          </p>
          <div className="flex justify-center mt-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">
                  {sessionData.contributors.filter(c => c.completed).length} of {sessionData.contributors.length} contributors completed
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold">{results.primaryCareer.title}</CardTitle>
                        <p className="text-gray-600 mt-1">{results.primaryCareer.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                        <div className="text-3xl font-bold text-green-500">{results.primaryCareer.matchPercentage}%</div>
                        <div className="text-sm text-gray-500">Match</div>
                    </div>
                </div>
                <p className="text-sm text-primary mt-2 font-medium bg-primary/10 p-3 rounded-lg">{results.primaryCareer.reasoning}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"><Clock className="w-5 h-5 mr-2 text-primary" />Your Journey Timeline</h3>
                    <div className="relative pl-6">
                        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border"></div>
                        {results.primaryCareer.timeline?.map((stage, index) => (
                        <div key={index} className="flex items-start mb-4">
                            <div className="absolute left-0 w-6 h-6 bg-background border-2 border-primary rounded-full flex items-center justify-center -translate-x-1/2">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                            </div>
                            <div className="pl-4">
                                <h4 className="font-semibold text-gray-800">{stage.stage}</h4>
                                <p className="text-sm text-gray-600">{stage.duration}</p>
                                <p className="text-sm text-gray-700 mt-1">{stage.focus}</p>
                                <p className="text-xs text-gray-500 mt-1">{stage.details}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center"><BarChart3 className="w-5 h-5 mr-2 text-primary" />What You'll Do Daily</h3>
                    <div className="grid md:grid-cols-2 gap-x-4 gap-y-2">
                      {results.primaryCareer.dailyTasks?.map((task, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700"><div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>{task}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center"><BookOpen className="w-5 h-5 mr-2 text-primary" />Recommended High School Subjects</h3>
                    <div className="flex flex-wrap gap-2">
                      {results.primaryCareer.subjects?.map((subject, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary-foreground/80 text-blue-800 rounded-full text-sm font-medium">{subject}</span>
                      ))}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div><h4 className="font-semibold text-green-800">Expected Salary</h4><p className="text-green-700 text-sm">{results.primaryCareer.salary}</p></div>
                    <div><h4 className="font-semibold text-green-800">Growth Outlook</h4><p className="text-green-700 text-sm">{results.primaryCareer.growth}</p></div>
                    <div><h4 className="font-semibold text-green-800">Environment</h4><p className="text-green-700 text-sm">{results.primaryCareer.workEnvironment}</p></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                {[results.alternativeCareer, results.thirdCareer].map((career, index) => (
                    <Card key={index} className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg">Alternative Path #{index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-700">{career.title}</h4>
                                <div className="text-lg font-bold text-primary">{career.matchPercentage}%</div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{career.description}</p>
                            <div className="flex flex-wrap gap-1">
                                {career.subjects?.slice(0, 3).map((subject, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{subject}</span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>

          <aside className="space-y-6">
            <Card className="shadow-lg">
                <CardHeader><h3 className="text-lg font-semibold text-gray-800 flex items-center"><User className="w-5 h-5 mr-2 text-primary" />Personality Insights</h3></CardHeader>
                <CardContent className="space-y-4">
                    <div><h4 className="font-medium text-gray-700">Personality Type</h4><p className="text-sm text-gray-600 mt-1">{results.insights.personalityType}</p></div>
                    <div><h4 className="font-medium text-gray-700">Core Strengths</h4><ul className="text-sm text-gray-600 mt-1 list-disc list-inside">{results.insights.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
                    <div><h4 className="font-medium text-gray-700">What Drives You</h4><ul className="text-sm text-gray-600 mt-1 list-disc list-inside">{results.insights.motivations.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
                    <div><h4 className="font-medium text-gray-700">Work Style</h4><p className="text-sm text-gray-600 mt-1">{results.insights.workStyle}</p></div>
                </CardContent>
            </Card>
            <Card className="shadow-lg">
                <CardHeader><h3 className="text-lg font-semibold text-gray-800 flex items-center"><Heart className="w-5 h-5 mr-2 text-purple-500" />Balanced Life</h3></CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600 mb-3">Hobbies that complement your career:</p>
                    <div className="space-y-2">
                        {results.primaryCareer.hobbies?.map((hobby, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-700"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>{hobby}</div>
                        ))}
                    </div>
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader><h3 className="text-lg font-semibold text-gray-800 flex items-center"><Share2 className="w-5 h-5 mr-2 text-primary" />Share & Save</h3></CardHeader>
                <CardContent className="space-y-3">
                    <Button onClick={() => setShowShareModal(true)} className="w-full bg-gradient-to-r from-primary to-purple-600 text-white"><Plus className="w-4 h-4 mr-2" />Invite More Contributors</Button>
                    <Button variant="outline" className="w-full"><Download className="w-4 h-4 mr-2" />Download Full Report</Button>
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader><h3 className="text-lg font-semibold text-gray-800 flex items-center"><Play className="w-5 h-5 mr-2 text-green-500" />Explore Further</h3></CardHeader>
                <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full">Watch Career Videos</Button>
                    <Button variant="outline" className="w-full">Find Online Courses</Button>
                    <Button variant="outline" className="w-full">Connect with Professionals</Button>
                </CardContent>
            </Card>
          </aside>
        </main>
      </div>
      {showShareModal && <ShareModal setShow={setShowShareModal} />}
    </div>
  );
};

export default ResultsScreen;
