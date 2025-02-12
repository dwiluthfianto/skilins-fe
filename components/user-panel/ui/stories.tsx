/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Badge } from '@/components/ui/badge';
import { LoadingContent } from './skeletons/skeleton-card';
import { useStoryInfinite } from '@/hooks/use-story';
import ContentCard from '@/components/content-card';
import React from 'react';
import { useInView } from 'react-intersection-observer';

export function Stories() {
  const {
    stories,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    isError,
  } = useStoryInfinite();
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && !isLoadingMore && !isReachingEnd) {
      loadMore();
    }
  }, [inView, isLoadingMore, isReachingEnd]);

  if (isLoading) return <LoadingContent />;
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
              Stories
            </h2>
            <p className='text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left'>
              Where Every Page Turns a New Adventure.
            </p>
          </div>
        </div>
      </div>
      <div className='w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
        {stories.map((item: any) => {
          return (
            <ContentCard
              key={item.uuid}
              href={`stories/${item.slug}`}
              imageSrc={item.thumbnail}
              variant='default'
              title={item.title}
            />
          );
        })}
      </div>
      <div ref={ref} className='w-full py-4 flex justify-center'>
        {!isReachingEnd &&
          (isLoadingMore ? <p>Loading more...</p> : <p>Scroll for more</p>)}
        {isReachingEnd && <p>No more stories to load</p>}
      </div>
    </section>
  );
}
