
'use client';

import React, { useState } from 'react';
import type { Career, CareerResults, CareerSpotlight, TimelineStage, WackyJob } from '@/lib/types';
import { useCareerCompass } from '@/context/career-compass-context';
import { Button } from './ui/button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Compass,
  ArrowLeft,
  Lightbulb,
  Share2,
  BookOpen,
  Sprout,
  DollarSign,
  Building,
  CheckCircle,
  User,
  Sparkles,
  Download,
  UserPlus,
  Play,
  Loader2,
  TriangleAlert,
  FlaskConical,
  Trophy
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ShareModal from './share-modal';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface ResultsScreenProps {
  results: CareerResults;
}

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({
  icon,
  title,
  children,
}) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 text-primary">{icon}</div>
    <div>
      <h4 className="font-semibold text-foreground">{title}</h4>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  </div>
);

const TimelineItem: React.FC<{ item: TimelineStage; isLast: boolean }> = ({ item, isLast }) => (
  <div className="relative pl-8">
    {!isLast && <div className="absolute left-[10px] top-4 h-full w-0.5 bg-border"></div>}
    <div className="absolute left-0 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
      <div className="h-2 w-2 rounded-full bg-primary"></div>
    </div>
    <p className="font-semibold text-foreground">{item.stage}</p>
    <p className="text-sm text-muted-foreground">{item.duration}</p>
    <p className="mt-1 text-sm text-muted-foreground">
      <span className="font-medium text-foreground/80">Focus:</span> {item.focus}
    </p>
    <p className="mt-1 text-sm text-muted-foreground">
      <span className="font-medium text-foreground/80">Details:</span> {item.details}
    </p>
    {item.salary && (
      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <DollarSign className="h-3 w-3" />
        <span>Est. Monthly Salary: {item.salary}</span>
      </div>
    )}
  </div>
);

const PrimaryCareerCard = ({ career }: { career: Career }) => (
  <Card className="overflow-hidden rounded-xl border-2 border-primary/20 bg-card shadow-none">
    <div className="p-6">
      <Badge variant="default" className="mb-2 bg-primary text-primary-foreground">
        Primary Recommendation
      </Badge>
      <h2 className="text-2xl font-bold text-foreground">{career.title}</h2>
      <p className="mt-1 text-sm font-semibold text-primary">{career.industry}</p>
      <p className="mt-4 text-muted-foreground">{career.description}</p>
      <p className="mt-4 text-sm font-medium text-accent-foreground">{career.reasoning}</p>
    </div>
    
    <div className="border-t bg-card p-6">
      <InfoCard icon={<DollarSign className="h-5 w-5" />} title="Expected Annual Salary">
        <p>{career.salary}</p>
      </InfoCard>
    </div>

    <div className="border-t bg-card p-6">
      <InfoCard icon={<BookOpen className="h-5 w-5" />} title="Recommended High School Subjects">
        <>
          <p className="mb-3 text-sm">Focusing on these subjects will provide a strong foundation for this path:</p>
          <div className="flex flex-wrap gap-2">
            {career.subjects?.map((subject) => (
              <Badge key={subject} variant="secondary">{subject}</Badge>
            ))}
          </div>
        </>
      </InfoCard>
    </div>

    <div className="border-t bg-card p-6">
      <InfoCard icon={<Sprout className="h-5 w-5" />} title="Growth Outlook">
        <p>{career.growth}</p>
      </InfoCard>
    </div>

    <div className="border-t bg-card p-6">
      <InfoCard icon={<Building className="h-5 w-5" />} title="Work Environment">
        <p>{career.workEnvironment}</p>
      </InfoCard>
    </div>

    <div className="border-t bg-card p-6">
      <h3 className="mb-4 font-semibold text-foreground">What You'll Do Daily</h3>
      <ul className="space-y-2">
        {career.dailyTasks?.map((task, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <span className="text-muted-foreground">{task}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="border-t bg-card p-6">
      <h3 className="mb-4 font-semibold text-foreground">Your Journey to Senior Level</h3>
      <div className="space-y-6">
        {career.timeline?.map((item, index) => (
          <TimelineItem key={index} item={item} isLast={index === career.timeline!.length - 1} />
        ))}
      </div>
    </div>

    <div className="border-t bg-card p-6">
      <InfoCard icon={<Sparkles className="h-5 w-5" />} title="Life & Work Balance">
        <>
          <p className="mb-3">A fulfilling career is about more than just work. To build a happy and balanced life, consider incorporating hobbies like these:</p>
          <ul className="space-y-2">
            {career.hobbies?.map((hobby, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">{hobby}</span>
              </li>
            ))}
          </ul>
        </>
      </InfoCard>
    </div>
  </Card>
);

const AlternativeCareersAccordion = ({ careers }: { careers: Career[] }) => (
  <section>
    <h2 className="mb-4 text-xl font-bold text-foreground">Other Top Suggestions</h2>
    <Accordion type="single" collapsible className="w-full rounded-xl border-2">
      {careers.map((career, index) => (
        <AccordionItem key={index} value={`item-${index}`} className={index === careers.length - 1 ? 'border-b-0' : ''}>
          <AccordionTrigger className="px-6 text-lg font-semibold hover:no-underline">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{`#${index + 2}`}</Badge>
              <span>{career.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pt-2 pb-6">
            <div className="space-y-6 pt-4">
              <p className="text-muted-foreground">{career.description}</p>
              <p className="text-sm font-medium text-accent-foreground">{career.reasoning}</p>
              <div className="space-y-px overflow-hidden rounded-lg bg-border">
                <div className="bg-card p-4">
                  <InfoCard icon={<DollarSign className="h-5 w-5" />} title="Expected Annual Salary">
                    <p>{career.salary}</p>
                  </InfoCard>
                </div>
                <div className="bg-card p-4">
                  <InfoCard icon={<Sprout className="h-5 w-5" />} title="Growth Outlook">
                    <p>{career.growth}</p>
                  </InfoCard>
                </div>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-foreground">Your Journey to Senior Level</h4>
                <div className="space-y-6">
                  {career.timeline?.map((item, i) => (
                    <TimelineItem key={i} item={item} isLast={i === career.timeline!.length - 1} />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-foreground">What You'll Do Daily</h4>
                <ul className="space-y-2">
                  {career.dailyTasks?.map((task, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <InfoCard icon={<BookOpen className="h-5 w-5" />} title="Recommended Subjects">
                  <div className="flex flex-wrap gap-2">
                    {career.subjects?.map((subject) => (
                      <Badge key={subject} variant="secondary">{subject}</Badge>
                    ))}
                  </div>
                </InfoCard>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

const AsideContent = ({ spotlight, jobs }: { spotlight: CareerSpotlight, jobs: WackyJob[] }) => (
    <aside className="space-y-4 lg:col-span-1">
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full rounded-xl border-2 shadow-none">
            <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="px-4 text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                        <User className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">Career Spotlight</h3>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4">
                    <div className="flex flex-col items-start gap-2">
                        <p className="text-sm font-semibold text-primary">{spotlight.title} - {spotlight.location}</p>
                        <p className="mt-2 text-sm italic text-muted-foreground">"{spotlight.story}"</p>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        
        <Accordion type="single" collapsible className="w-full rounded-xl border-2 shadow-none">
            <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="px-4 text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                        <FlaskConical className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">Wacky Job Ideas</h3>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4">
                    <div className="space-y-4">
                        {jobs.map((job, index) => (
                            <div key={index} className="flex flex-col items-start gap-1">
                                <p className="font-bold text-foreground">{job.title}</p>
                                <p className="mt-1 text-sm text-muted-foreground">{job.description}</p>
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </aside>
);

const ComparisonTableCard = ({
  careers,
  selectedCareer,
  onCareerSelect,
}: {
  careers: Career[];
  selectedCareer: Career;
  onCareerSelect: (career: Career) => void;
}) => (
    <div className="mt-4 space-y-4">
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full overflow-hidden rounded-xl border-2 shadow-none">
            <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="bg-card p-6 text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                        <Trophy className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">Career Comparison</h3>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="bg-card px-6 pt-0 pb-6">
                    <p className="text-sm text-muted-foreground mb-4">Select the career that interests you most to update the "Explore Further" links.</p>
                    <RadioGroup
                        value={selectedCareer.title}
                        onValueChange={(title) => {
                            const newSelectedCareer = careers.find((c) => c.title === title);
                            if (newSelectedCareer) {
                                onCareerSelect(newSelectedCareer);
                            }
                        }}
                    >
                        <Table className="text-xs">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12"></TableHead>
                                    <TableHead>Career</TableHead>
                                    <TableHead>Salary (Annual)</TableHead>
                                    <TableHead>Work Environment</TableHead>
                                    <TableHead>Growth</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {careers.map((career, index) => (
                                    <TableRow key={index} className="cursor-pointer" onClick={() => onCareerSelect(career)}>
                                        <TableCell>
                                            <RadioGroupItem value={career.title} id={`career-${index}`} />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <Label htmlFor={`career-${index}`}>{career.title}</Label>
                                        </TableCell>
                                        <TableCell>{career.salary}</TableCell>
                                        <TableCell>{career.workEnvironment}</TableCell>
                                        <TableCell>{career.growth}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </RadioGroup>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
);

const ActionCards = ({
  onShareClick,
  onDownloadClick,
  isDownloading,
  selectedCareer,
  country
}: {
  onShareClick: () => void;
  onDownloadClick: () => void;
  isDownloading: boolean;
  selectedCareer: Career;
  country: string;
}) => {
    const careerTitle = encodeURIComponent(selectedCareer.title);
    const careerIndustry = encodeURIComponent(selectedCareer.industry || selectedCareer.title);

    return (
      <div className="mt-4 space-y-4" data-no-print="true">
        <Card className="rounded-xl border-2 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Share2 className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Share & Save</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={onShareClick} className="w-full">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite More Contributors
            </Button>
            <Button variant="secondary" className="w-full" onClick={onDownloadClick} disabled={isDownloading}>
              {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
              {isDownloading ? 'Generating PDF...' : 'Download Full Report'}
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-2 shadow-none">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Play className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Explore "{selectedCareer.title}"</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href={`https://www.youtube.com/results?search_query=day+in+the+life+of+a+${careerTitle}`} target="_blank" rel="noopener noreferrer" className="block">
              <Button size="sm" variant="outline" className="w-full justify-center">Watch Career Videos</Button>
            </a>
            <a href={`https://www.udemy.com/courses/search/?q=${careerTitle}&sort=price-asc`} target="_blank" rel="noopener noreferrer" className="block">
              <Button size="sm" variant="outline" className="w-full justify-center">Find Online Courses</Button>
            </a>
            <a href={`https://www.linkedin.com/search/results/people/?keywords=${careerTitle}`} target="_blank" rel="noopener noreferrer" className="block">
              <Button size="sm" variant="outline" className="w-full justify-center">Connect with Professionals</Button>
            </a>
            <a href={`https://www.linkedin.com/search/results/companies/?keywords=${careerIndustry}&location=${country}`} target="_blank" rel="noopener noreferrer" className="block">
              <Button size="sm" variant="outline" className="w-full justify-center">View Companies</Button>
            </a>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-2 bg-accent/50 text-center shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold">Ready for the Next Step?</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Start building your future today with the right subject choices and career preparation.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button variant="default">Get Subject Planning Guide</Button>
              <Button variant="outline" onClick={onShareClick}>Add More Perspectives</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
};


const ResultsScreen: React.FC<ResultsScreenProps> = ({ results }) => {
  const { resetSession, sessionData } = useCareerCompass();
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { primaryCareer, alternativeCareer, thirdCareer, insights, careerSpotlight, wackyJobs } = results;
  const [selectedCareer, setSelectedCareer] = useState<Career>(primaryCareer);

  const country = encodeURIComponent(sessionData.country);

  const handleStartOver = () => {
    resetSession();
    router.push('/');
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    const reportElement = document.getElementById('report-content');

    if (reportElement) {
        try {
            const canvas = await html2canvas(reportElement, {
                scale: 2,
                useCORS: true,
                onclone: (doc) => {
                    doc.querySelectorAll('[data-no-print="true"]').forEach((el) => {
                        (el as HTMLElement).style.display = 'none';
                    });
                    doc.querySelectorAll('div[data-state="closed"]').forEach(el => {
                        const trigger = el.previousSibling as HTMLElement;
                        if(trigger && trigger.getAttribute('data-state') === 'closed') {
                             trigger.setAttribute('data-state', 'open');
                        }
                        el.setAttribute('data-state', 'open');
                    });
                },
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            let heightLeft = pdfHeight;
            let position = 0;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();

            while (heightLeft > 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pdf.internal.pageSize.getHeight();
            }
            
            pdf.save('Career-Compass-Report.pdf');

        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    }
    setIsDownloading(false);
  };

  const allCareers = [primaryCareer, alternativeCareer, thirdCareer];

  return (
    <>
      <div className="min-h-screen bg-background">
        <div id="report-content" className="mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
          <header className="mb-8">
            <Button variant="ghost" onClick={() => router.back()} data-no-print="true" className="-ml-4 mb-4 text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3 text-2xl font-bold text-foreground">
                  <Compass className="h-8 w-8 text-primary" />
                  <h1>Your Career Compass Results</h1>
                </div>
                <p className="mt-2 text-muted-foreground">
                  Explore your personalized career paths based on your unique strengths and interests.
                </p>
              </div>
            </div>
          </header>

          <main>
            {results.isFallback && (
                <Alert variant="warning" className="mb-4" data-no-print="true">
                    <TriangleAlert className="h-4 w-4" />
                    <AlertTitle>Displaying Sample Results</AlertTitle>
                    <AlertDescription>
                        We couldn't generate personalized results at this time. The report below is a high-quality sample to show you what to expect. Please try again later for your personalized analysis.
                    </AlertDescription>
                </Alert>
            )}

            <Card className="mb-4 rounded-xl border-2 border-primary/10 bg-primary/5 shadow-none">
                <CardHeader>
                    <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Your Personal Insights</h3>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
                    <p><strong className="text-foreground">Personality Type:</strong><span className="text-muted-foreground"> {insights.personalityType}</span></p>
                    <p><strong className="text-foreground">Key Strengths:</strong><span className="text-muted-foreground"> {insights.strengths.join(', ')}.</span></p>
                    <p><strong className="text-foreground">Motivations:</strong><span className="text-muted-foreground"> {insights.motivations.join(', ')}.</span></p>
                    <p><strong className="text-foreground">Ideal Work Style:</strong><span className="text-muted-foreground"> {insights.workStyle}</span></p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                <PrimaryCareerCard career={primaryCareer} />
                <AlternativeCareersAccordion careers={[alternativeCareer, thirdCareer]} />
              </div>
              <AsideContent spotlight={careerSpotlight} jobs={wackyJobs} />
            </div>
            
            <ComparisonTableCard
              careers={allCareers}
              selectedCareer={selectedCareer}
              onCareerSelect={setSelectedCareer}
            />

            <ActionCards
              onShareClick={() => setShowShareModal(true)}
              onDownloadClick={handleDownload}
              isDownloading={isDownloading}
              selectedCareer={selectedCareer}
              country={country}
            />
            
            <div className="mt-8 text-center" data-no-print="true">
                <Button onClick={handleStartOver} variant="ghost" className="text-muted-foreground">
                    Start Over
                </Button>
            </div>
          </main>
        </div>
      </div>
      {showShareModal && <ShareModal setShow={setShowShareModal} />}
    </>
  );
};

export default ResultsScreen;
