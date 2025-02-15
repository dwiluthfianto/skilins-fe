/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from '@/components/user-panel/content-layout';
import axios from '@/utils/axios';
import FeedbackComponent from '@/components/skilins/features/feedback';
import MinimalTiptapPreview from '@/components/minimal-tiptap/minimal-tiptap-preview';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function OrderDetail({ params }: any) {
  const { slug, order } = params;

  const res = (
    await axios.get(`/contents/stories/episodes/${slug}?order=${order}`)
  ).data.data;

  return (
    <ContentLayout title={res.title}>
      <section className='md:py-2'>
        <div className='rounded-md p-6 bg-white'>
          <div className='w-32 h-44 mx-auto mb-4'>
            <AspectRatio ratio={3 / 4}>
              <Image
                src={res.thumbnail}
                alt={res.title}
                fill
                objectFit='cover'
                objectPosition='center'
              ></Image>
            </AspectRatio>
          </div>
          <p className='text-center text-muted-foreground'>
            {res.story.creator.name}
          </p>
          <h1 className='text-center font-bold text-2xl'>
            {`Ch. ${res.episode.order}: ${res.episode.title}`}
          </h1>
          <div className='max-w-md mx-auto'>
            <Separator className='my-8' />
            <MinimalTiptapPreview
              value={res.episode.content}
              editable={false}
            />
            <div className='mt-8 flex justify-between'>
              {res.prev_episode && (
                <Button variant={'link'} className='px-0'>
                  <Link href={`/stories/${slug}/${res.prev_episode.order}`}>
                    ← Back: {res.prev_episode.title}
                  </Link>
                </Button>
              )}
              {res.next_episode && (
                <Button variant={'link'} className='px-0'>
                  <Link href={`/stories/${slug}/${res.next_episode.order}`}>
                    Next: {res.next_episode.title} →
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className='md:container'>
          <FeedbackComponent
            contentUuid={res.uuid}
            shareUrl={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/stories/${res.slug}`}
            titleContent={res.title}
            comments={res.comment}
            avgRating={Number(res.avg_rating)}
            creator={res.story.creator.name}
            className='my-8 lg:my-16 antialiased'
          />
        </div>
      </section>
    </ContentLayout>
  );
}
