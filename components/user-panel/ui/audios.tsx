/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Badge } from '@/components/ui/badge';
import { useAudioInfinite } from '@/hooks/use-audio';
import { LoadingContent3 } from './skeletons/skeleton-card';
import ContentCard from '@/components/content-card';
import { useInView } from 'react-intersection-observer';
import React from 'react';

export function Audios() {
  const { audios, isLoading, isLoadingMore, isReachingEnd, loadMore, isError } =
    useAudioInfinite();
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && !isLoadingMore && !isReachingEnd) {
      loadMore();
    }
  }, [inView, isLoadingMore, isReachingEnd]);

  if (isLoading) return <LoadingContent3 />;
  if (isError) return <h1>Error</h1>;
  return (
    <section className='py-2'>
      <div className='flex flex-col gap-10 mb-8'>
        <div className='flex gap-4 flex-col items-start'>
          <div>
            <Badge>Contents</Badge>
          </div>
          <div className='flex gap-2 flex-col'>
            <h2 className='text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left'>
              Audio Podcasts
            </h2>
            <p className='text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left'>
              Voices that Inspire, Stories that Connect.
            </p>
          </div>
        </div>
      </div>
      <div className='w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
        {audios.map((item: any) => {
          return (
            <ContentCard
              key={item.uuid}
              href={`audio-podcasts/${item.slug}`}
              imageSrc={item.thumbnail}
              variant='audio'
              title={item.title}
            />
          );
        })}
      </div>
      <div ref={ref} className='w-full py-4 flex justify-center'>
        {!isReachingEnd &&
          (isLoadingMore ? <p>Loading more...</p> : <p>Scroll for more</p>)}
        {isReachingEnd && <p>No more audios to load</p>}
      </div>
    </section>
  );
}
