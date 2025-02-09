/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Badge } from '@/components/ui/badge';
import { useEbook } from '@/hooks/use-ebook';
import { LoadingContent } from './skeletons/skeleton-card';
import ContentCard from '@/components/content-card';

export function Ebooks() {
  const { ebooks, isLoading } = useEbook({ page: 1, limit: 15 });

  if (isLoading) return <LoadingContent />;
  return (
    <section className='py-2'>
      <div className='flex flex-col gap-10 mb-8'>
        <div className='flex gap-4 flex-col items-start'>
          <div>
            <Badge>Contents</Badge>
          </div>
          <div className='flex gap-2 flex-col'>
            <h2 className='text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left'>
              e-Books
            </h2>
            <p className='text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left'>
              Portable Wisdom, Endless Possibilities.
            </p>
          </div>
        </div>
      </div>
      <div className='w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
        {ebooks?.map((item: any) => {
          return (
            <ContentCard
              key={item.uuid}
              href={`ebooks/${item.slug}`}
              imageSrc={item.thumbnail}
              variant='default'
              title={item.title}
            />
          );
        })}
      </div>
    </section>
  );
}
