/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/utils/axios";
import MinimalTiptapPreview from "@/components/minimal-tiptap/minimal-tiptap-preview";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { LibraryBig, Star, User } from "lucide-react";
import { format } from "date-fns";
import { BackButton } from "@/components/shared/back-button";
import { ContentLayout } from "@/components/staff-panel/content-layout";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug, order } = params;
  const res = (
    await axios.get(`/contents/stories/episodes/${slug}?order=${order}`)
  ).data.data;

  return {
    title: `${res.title} - Chapter ${order}`,
    description: res.episode.content.substring(0, 150) + "...",
    openGraph: {
      images: [res.thumbnail],
      type: "article",
      publishedTime: res.created_at,
      authors: [res.story.creator.name],
    },
  };
}

export default async function OrderDetail({ params }: any) {
  const { slug, order } = params;
  const res = (
    await axios.get(`/contents/stories/episodes/${slug}?order=${order}`)
  ).data.data;

  return (
    <ContentLayout title={res.title}>
      <BackButton />
      <section className='md:py-8'>
        {/* Hero Section */}
        <div className='relative bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-16 mb-12'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-col lg:flex-row gap-12 items-center'>
              <div className='w-full lg:w-1/4'>
                <div className='relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300'>
                  <AspectRatio ratio={3 / 4}>
                    <Image
                      src={res.thumbnail}
                      alt={res.title}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                  </AspectRatio>
                </div>
              </div>

              <div className='w-full lg:w-2/3 space-y-6'>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-2 bg-background px-4 py-2 rounded-full'>
                    <User className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                    <span className='font-medium dark:text-gray-300'>
                      {res.story.creator.name}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 bg-background px-4 py-2 rounded-full'>
                    <Star className='w-5 h-5 text-amber-600 dark:text-amber-400' />
                    <span className='font-medium dark:text-gray-300'>
                      {res.avg_rating}/5.0 ({res.total_reviews} reviews)
                    </span>
                  </div>
                </div>

                <h1 className='text-2xl md:text-4xl font-bold '>{res.title}</h1>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  <div className='bg-background p-4 rounded-xl'>
                    <p className='text-sm text-muted-foreground'>Chapter</p>
                    <p className='text-xl font-semibold dark:text-white'>
                      {res.episode.order}
                    </p>
                  </div>
                  <div className='bg-background p-4 rounded-xl'>
                    <p className='text-sm text-muted-foreground'>Genre</p>
                    <p className='text-xl font-semibold dark:text-white'>
                      {res.story.genre || "Fantasy"}
                    </p>
                  </div>
                  <div className='bg-background p-4 rounded-xl'>
                    <p className='text-sm text-muted-foreground'>Status</p>
                    <p className='text-xl font-semibold dark:text-white'>
                      {res.story.status || "Ongoing"}
                    </p>
                  </div>
                  <div className='bg-background p-4 rounded-xl'>
                    <p className='text-sm text-muted-foreground'>
                      First Published
                    </p>
                    <p className='text-xl font-semibold dark:text-white'>
                      {format(res.created_at, "dd MMM yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto prose prose-lg dark:prose-invert'>
            <div className='flex items-center gap-4 mb-12'>
              <LibraryBig className='w-8 h-8 text-purple-600 dark:text-purple-400' />
              <h2 className='text-3xl font-bold'>
                Chapter {res.episode.order}: {res.episode.title}
              </h2>
            </div>

            <MinimalTiptapPreview
              value={res.episode.content}
              editable={false}
              className='text-lg leading-relaxed'
            />

            {/* Chapter Navigation */}
            <div className='mt-16 grid grid-cols-2 gap-4'>
              {res.prev_episode && (
                <Button
                  variant='secondary'
                  className='h-auto py-4 text-left justify-start'
                  asChild
                >
                  <Link href={`/stories/${slug}/${res.prev_episode.order}`}>
                    <div className='space-y-2'>
                      <span className='text-sm text-muted-foreground'>
                        Previous
                      </span>
                      <p className='font-semibold'>
                        ← {res.prev_episode.title}
                      </p>
                    </div>
                  </Link>
                </Button>
              )}
              {res.next_episode && (
                <Button
                  variant='secondary'
                  className='h-auto py-4 text-left justify-end'
                  asChild
                >
                  <Link href={`/stories/${slug}/${res.next_episode.order}`}>
                    <div className='space-y-2 text-right'>
                      <span className='text-sm text-muted-foreground'>
                        Next
                      </span>
                      <p className='font-semibold'>
                        {res.next_episode.title} →
                      </p>
                    </div>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
}
