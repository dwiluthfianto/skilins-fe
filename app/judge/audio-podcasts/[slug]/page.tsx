/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
export default function AudioDetail({ params }: any) {
  const { slug } = params;
  const { audio, isLoading: audioLoading } = useAudioBySlug(slug);
  const [hasPlayed, setHasPlayed] = useState(false);

  if (audioLoading) return <Loading />;
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const track = {
    src: audio.file,
    title: audio.title,
    category: audio.category,
    image: audio.thumbnail,
    creator: audio.creator,
  };

  return (
    <ContentLayout>
      <section className='md:py-2'>
        <div className='md:container'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/'>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/audio-podcasts'>audios</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{audio.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {hasPlayed ? (
            <FeedbackJudge
              submissionUuid={audio.submission_uuid}
              competitionUuid={audio.competition_uuid}
            />
          ) : (
            ''
          )}
          <div className='grid grid-cols-1  md:grid-cols-4 mt-8 gap-y-6  md:gap-8'>
            <div className='relative'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={audio.thumbnail}
                  alt='placeholder'
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                  className='rounded-lg '
                />
              </AspectRatio>
              <JudgeAudioPlayer data={track} onHasCheck={setHasPlayed} />
            </div>
            <div className='col-span-3 '>
              <Card className='rounded-lg '>
                <CardContent className='p-6'>
                  <p className='text-lg text-muted-foreground'>
                    {audio.creator}
                  </p>
                  <h2 className='text-3xl font-medium text-balance md:text-5xl'>
                    {audio.title}
                  </h2>
                  <p className='max-w-xl mt-1 text-lg font-medium leading-relaxed tracking-tight md:mt-6 text lg:max-w-xl'>
                    Description
                  </p>
                  <MinimalTiptapPreview
                    value={audio.description}
                    editable={false}
                  />

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='link'
                        className='flex items-center w-full'
                      >
                        See more
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px] md:max-w-[600px]'>
                      <DialogHeader>
                        <DialogTitle className='items-center justify-center text-center'>
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
                  <div className='flex flex-col items-start gap-4 py-4 lg:py-8'>
                    <div className='flex flex-col gap-2'>
                      <p className='max-w-xl text-lg font-medium leading-relaxed tracking-tight lg:max-w-xl'>
                        Detail Audio
                      </p>
                    </div>
                    <div className='flex flex-col w-full'>
                      <div className='grid items-start grid-cols-2 gap-4 lg:grid-cols-3'>
                        <div className='flex flex-row items-start w-full gap-6'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-sm text-muted-foreground'>
                              Category
                            </p>
                            <p>{audio.category}</p>
                          </div>
                        </div>
                        <div className='flex flex-row items-start gap-6'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-sm text-muted-foreground'>
                              Duration
                            </p>
                            <p>{formatTime(audio.duration)} </p>
                          </div>
                        </div>
                        <div className='flex flex-row items-start gap-6'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-sm text-muted-foreground'>
                              Release Date
                            </p>
                            <p>{format(audio.created_at, 'dd MMM yyyy')}</p>
                          </div>
                        </div>
                        <div className='flex flex-row items-start gap-6'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-sm text-muted-foreground'>
                              Genres
                            </p>
                            <p>
                              {audio.genres.map((genre: any, index: number) => (
                                <Badge key={index} className='mr-2'>
                                  {genre.text}
                                </Badge>
                              ))}
                            </p>
                          </div>
                        </div>
                        <div className='flex flex-row items-start gap-6'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-sm text-muted-foreground'>
                              Tags
                            </p>
                            <p>
                              {audio.tags.map((tag: any, index: number) => (
                                <Badge
                                  key={index}
                                  className='items-center mr-2'
                                >
                                  #{tag.text}
                                </Badge>
                              ))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
}
