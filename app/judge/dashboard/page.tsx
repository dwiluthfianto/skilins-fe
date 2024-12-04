/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ContentCard from '@/components/content-card';
import { ContentLayout } from '@/components/judge-panel/content-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useJudgeSubmission, useJudgeUser } from '@/hooks/use-judge';
import { format } from 'date-fns';
import { Badge, BadgeCheck, BadgePercent, CalendarClock } from 'lucide-react';
import { useState } from 'react';

export default function JudgeDashboard() {
  const [scored, setScored] = useState(true);
  const { judge } = useJudgeUser();
  const { data, summary, isLoading, isError } = useJudgeSubmission(
    scored,
    judge && judge?.Judges[0].competition.uuid
  );
  if (isLoading) return <h1>loading...</h1>;
  if (isError) return <h1>error</h1>;
  return (
    <ContentLayout>
      <div className='md:container'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Scored Submissions
              </CardTitle>
              <BadgeCheck className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {summary.scoredSubmissions}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Unscored Submissions
              </CardTitle>
              <Badge className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {summary.unscoredSubmissions}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Submissions
              </CardTitle>
              <BadgePercent className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {summary.totalSubmissions}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Deadline judge
              </CardTitle>
              <CalendarClock className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {format(summary.deadlineJudge.end_date, 'dd MMM yyyy')}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='flex flex-wrap gap-2 py-8'>
          <Button
            variant={scored ? 'default' : 'outline'}
            onClick={() => setScored(true)}
          >
            Scored
          </Button>
          <Button
            variant={!scored ? 'default' : 'outline'}
            onClick={() => setScored(false)}
          >
            Unscored
          </Button>
        </div>
        <div className='w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
          {data.map((item: any) => {
            return item.competition.type === 'AUDIO' ? (
              <ContentCard
                key={item.content.slug}
                href={`/judge/audio-podcasts/${item.content.slug}`}
                variant='audio'
                imageSrc={item.content.thumbnail}
                title={item.content.title}
              />
            ) : item.competition.type === 'VIDEO' ? (
              <ContentCard
                key={item.content.slug}
                href={`/judge/video-podcasts/${item.content.slug}`}
                variant='video'
                imageSrc={item.content.thumbnail}
                title={item.content.title}
              />
            ) : (
              <ContentCard
                key={item.content.slug}
                href={`/judge/prakerin/${item.content.slug}`}
                variant='default'
                imageSrc={item.content.thumbnail}
                title={item.content.title}
              />
            );
          })}
        </div>
      </div>
    </ContentLayout>
  );
}
