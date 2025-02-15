/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import type { CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import ContentCard from '@/components/content-card';

export function BlogCarousel({ data }: any) {
  const blogs = data || [];
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on('select', updateSelection);
    return () => {
      carouselApi.off('select', updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className='py-12'>
      <div>
        <div className='mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16'>
          <div>
            <h2 className='mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6'>
              Blogs
            </h2>
            <a
              href='#'
              className='group flex items-center text-xs font-medium md:text-base lg:text-lg'
            >
              See all{' '}
              <ArrowRight className='ml-2 size-4 transition-transform group-hover:translate-x-1' />
            </a>
          </div>
          <div className='mt-8 flex shrink-0 items-center justify-center gap-2'>
            <Button
              size='icon'
              variant='outline'
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className='disabled:pointer-events-auto'
            >
              <ArrowLeft className='size-5' />
            </Button>
            <Button
              size='icon'
              variant='outline'
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className='disabled:pointer-events-auto'
            >
              <ArrowRight className='size-5' />
            </Button>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent>
            {blogs?.map((item: any) => (
              <CarouselItem key={item.uuid}>
                <ContentCard
                  key={item.uuid}
                  variant='blog'
                  href={`blogs/${item.slug}`}
                  imageSrc={item.thumbnail}
                  title={item.title}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
