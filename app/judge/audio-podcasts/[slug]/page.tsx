/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import MinimalTiptapPreview from '@/components/minimal-tiptap/minimal-tiptap-preview';
import { ContentLayout } from '@/components/judge-panel/content-layout';
import { useAudioBySlug } from '@/hooks/use-audio';
import FeedbackJudge from '@/components/judge-panel/feedback';
import { useState } from 'react';
import JudgeAudioPlayer from '@/components/judge-panel/judge-audio-player';
import { Loading } from '@/components/loading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';

export default function AudioDetail({ params }: any) {
  const { slug } = params;
  const { audio, isLoading: audioLoading } = useAudioBySlug(slug);
  const [hasPlayed, setHasPlayed] = useState(false);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const track = {
    src: audio?.audio_podcast.file_attachment.file,
    title: audio?.title,
    category: audio?.category.name,
    image: audio?.thumbnail,
    creator: audio?.audio_podcast.creator.name,
  };

  if (audioLoading) return <Loading />;

  return (
    <ContentLayout>
      <section className='md:py-2'>
        <div className='md:container'>
          <Breadcrumb className='mb-6'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/'>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/audio-podcasts'>Audio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{audio.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className='grid grid-cols-1 md:grid-cols-4 mt-8 gap-y-6 md:gap-8'>
            <div className='relative'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={audio.thumbnail}
                  alt={audio.title}
                  fill
                  className='rounded-lg object-cover'
                />
              </AspectRatio>
              <JudgeAudioPlayer data={track} onHasCheck={setHasPlayed} />
            </div>

            <div className='col-span-3 space-y-8'>
              {!hasPlayed && (
                <Alert variant='destructive'>
                  <AlertDescription>
                    Please listen to the entire audio before making an
                    assessment
                  </AlertDescription>
                </Alert>
              )}

              <Card>
                <CardContent className='p-6 space-y-6'>
                  <div className='space-y-2'>
                    <h1 className='text-3xl font-bold'>{audio.title}</h1>
                    <p className='text-lg text-muted-foreground'>
                      {audio.audio_podcast.creator.name}
                    </p>
                  </div>

                  <div className='space-y-4'>
                    <h3 className='text-xl font-semibold'>Description</h3>
                    <MinimalTiptapPreview
                      value={audio.description}
                      editable={false}
                    />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant='link'
                          className='flex w-full items-center'
                        >
                          See more
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='sm:max-w-[425px] md:max-w-[600px]'>
                        <DialogHeader>
                          <DialogTitle className='text-center justify-center items-center'>
                            Description
                          </DialogTitle>
                        </DialogHeader>
                        <ScrollArea className='max-h-[600px] pr-4'>
                          <MinimalTiptapPreview
                            value={audio.description}
                            editable={false}
                          />
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    <div className='space-y-1'>
                      <p className='text-sm text-muted-foreground'>Category</p>
                      <p className='font-medium'>{audio.category.name}</p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm text-muted-foreground'>Duration</p>
                      <p className='font-medium'>
                        {formatTime(audio.audio_podcast.duration)}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm text-muted-foreground'>
                        Release Date
                      </p>
                      <p className='font-medium'>
                        {format(audio.created_at, 'dd MMM yyyy')}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm text-muted-foreground'>Genre</p>
                      <p className='font-medium'>
                        {audio.genre.map((genre: any) => (
                          <Badge key={genre.text} variant='secondary'>
                            {genre.text}
                          </Badge>
                        ))}
                      </p>
                    </div>
                    <div className='space-y-1'>
                      <p className='text-sm text-muted-foreground'>Tag</p>
                      <p className='font-medium'>
                        {audio.tag.map((tag: any) => (
                          <Badge key={tag.text} variant='secondary'>
                            #{tag.text}
                          </Badge>
                        ))}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {hasPlayed && (
                <FeedbackJudge
                  submissionUuid={audio.submission.uuid}
                  competitionUuid={audio.submission.competition.uuid}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
}
