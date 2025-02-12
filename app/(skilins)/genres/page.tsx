'use client';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ContentLayout } from '@/components/user-panel/content-layout';
import { useGenre } from '@/hooks/use-genre';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function GenrePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = React.useState(initialQuery);
  const [activeQuery, setActiveQuery] = React.useState(initialQuery);
  const { ref, inView } = useInView();
  const { genres, isLoading, isError, isLoadingMore, isReachingEnd, loadMore } =
    useGenre(activeQuery);

  // Trigger loadMore when the last element is visible
  React.useEffect(() => {
    if (inView && !isLoadingMore && !isReachingEnd) {
      loadMore();
    }
  }, [inView, isLoadingMore, isReachingEnd]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setActiveQuery(searchQuery);
      const params = new URLSearchParams(searchParams);
      if (searchQuery) {
        params.set('q', searchQuery);
      } else {
        params.delete('q');
      }
      router.replace(`/genres?${params.toString()}`, { scroll: false });
    }
  };

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error cuy</h1>;
  return (
    <ContentLayout title=''>
      <section className='py-4 space-y-8'>
        <div className='flex flex-col items-start md:items-center md:flex-row justify-between gap-4'>
          <div className='space-y-2'>
            <div>
              <Badge>Groups</Badge>
            </div>
            <h2 className='text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left'>
              Genres
            </h2>
            <p className='text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left'>
              Path to Career, Recognized by Expertise.
            </p>
          </div>
          <div className='w-full md:w-64'>
            <Input
              type='text'
              placeholder='Search genres...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className='w-full px-4 py-2'
            />
          </div>
        </div>
        <div className='z-30 grid gap-6 md:grid-cols-3 lg:grid-cols-4'>
          {genres?.map((genre: any) => (
            <div
              key={genre.uuid}
              className='flex flex-col gap-10 rounded-lg border bg-background p-8'
            >
              <div>
                <div className='h-10 w-10 relative'>
                  {genre?.avatar ? (
                    <Image
                      src={genre.avatar}
                      alt='avatar genres'
                      layout='fill'
                      objectFit='cover'
                      priority={false}
                    />
                  ) : (
                    ''
                  )}
                </div>
                <h3 className='mb-1 mt-2 font-medium'>{genre.name}</h3>
                <p className='text-sm text-muted-foreground line-clamp-3'>
                  {genre.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <div ref={ref} className='w-full py-4 flex justify-center'>
          {!isReachingEnd &&
            (isLoadingMore ? <p>Loading more...</p> : <p>Scroll for more</p>)}
          {isReachingEnd && <p>No more genres to load</p>}
        </div>
      </section>
    </ContentLayout>
  );
}
