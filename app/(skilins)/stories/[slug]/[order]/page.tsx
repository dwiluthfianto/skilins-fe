/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from '@/components/user-panel/content-layout';
import axios from '@/utils/axios';
import FeedbackComponent from '@/components/skilins/features/feedback';
import MinimalTiptapPreview from '@/components/minimal-tiptap/minimal-tiptap-preview';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default async function OrderDetail({ params }: any) {
  const { slug, order } = params;

  const res = (
    await axios.get(`/contents/stories/episodes/${slug}?order=${order}`)
  ).data;

  const story = res.data;

  return (
    <ContentLayout title={story.title}>
      <section className='md:py-2'>
        <div className='grid md:container grid-cols-1 min-[1340px]:grid-cols-8 gap-8 relative'>
          <div className='col-span-full sticky top-20 rounded-md p-6 bg-white z-10'>
            <div className='w-32 h-44 mx-auto mb-4'>
              <AspectRatio ratio={3 / 4}>
                <Image
                  src={story.thumbnail}
                  alt={story.title}
                  fill
                  objectFit='cover'
                  objectPosition='center'
                ></Image>
              </AspectRatio>
            </div>
            <p className='text-center text-muted-foreground'>{story.author}</p>
            <h1 className='text-center font-bold text-2xl'>
              {`Ch. ${story.episode.order}: ${story.episode.title}`}
            </h1>
          </div>
          <span className='min-[1340px]:col-span-2 min-[1340px]:block hidden'></span>
          <div className='min-[1340px]:col-span-4'>
            <Separator className='mb-8' />
            <MinimalTiptapPreview
              value={story.episode.content}
              editable={false}
            />
          </div>
          <span className='min-[1340px]:col-span-2 min-[1340px]:block'></span>
        </div>
        <div className='md:container'>
          <FeedbackComponent
            contentUuid={story.uuid}
            shareUrl={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/stories/${story.slug}`}
            titleContent={story.title}
            comments={story.comments}
            avgRating={Number(story.avg_rating)}
            creator={story.creator}
            className='my-8 lg:my-16 antialiased'
          />
        </div>
      </section>
    </ContentLayout>
  );
}
