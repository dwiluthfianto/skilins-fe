/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useContentByCategory } from "@/hooks/use-content";
import { useCategoryByName } from "@/hooks/use-category";
import { useEbookInfinite } from "@/hooks/use-ebook";
import { useAudioInfinite } from "@/hooks/use-audio";
import { useVideoInfinite } from "@/hooks/use-video";
import ContentCard from "@/components/content-card";

export default function Categories({ category }: { category: string }) {
  const [content, setContent] = useState("ebooks");

  // Use infinite scroll hooks
  const {
    ebooks,
    isLoading: ebooksLoading,
    isError: ebooksError,
    loadMore: loadMoreEbooks,
    isReachingEnd: isEbooksEnd,
  } = useEbookInfinite({ category });

  const {
    audios,
    isLoading: audiosLoading,
    isError: audiosError,
    loadMore: loadMoreAudios,
    isReachingEnd: isAudiosEnd,
  } = useAudioInfinite({ category });

  const {
    videos,
    isLoading: videosLoading,
    isError: videosError,
    loadMore: loadMoreVideos,
    isReachingEnd: isVideosEnd,
  } = useVideoInfinite({ category });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        // Load more based on current content type
        switch (content) {
          case "ebooks":
            if (!ebooksLoading && !isEbooksEnd) loadMoreEbooks();
            break;
          case "audios":
            if (!audiosLoading && !isAudiosEnd) loadMoreAudios();
            break;
          case "videos":
            if (!videosLoading && !isVideosEnd) loadMoreVideos();
            break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [content, ebooksLoading, audiosLoading, videosLoading]);

  const { category: dataCategory } = useCategoryByName(category);

  if (ebooksError || audiosError || videosError) {
    return <div>Error loading contents</div>;
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col items-start justify-between gap-4 md:items-center md:flex-row'>
        <div>
          <p className='text-4xl font-bold'>{dataCategory?.name}</p>
          <p className='mt-2 text-sm'>{dataCategory?.description}</p>
        </div>
      </div>

      <Tabs
        defaultValue='ebooks'
        className='space-y-6'
        onValueChange={setContent}
      >
        <TabsList>
          <TabsTrigger value='ebooks'>eBooks</TabsTrigger>
          <TabsTrigger value='audios'>Audio Podcasts</TabsTrigger>
          <TabsTrigger value='videos'>Video Podcasts</TabsTrigger>
        </TabsList>

        <TabsContent
          value='ebooks'
          className='grid grid-cols-2 gap-2 md:grid-cols-4'
        >
          {ebooks?.map((item: any) => (
            <ContentCard
              key={item.uuid}
              href={`/ebooks/${item.slug}`}
              imageSrc={item.thumbnail}
              title={item.title}
            />
          ))}
        </TabsContent>

        <TabsContent
          value='audios'
          className='grid grid-cols-2 gap-2 md:grid-cols-4'
        >
          {audios?.map((item: any) => (
            <ContentCard
              key={item.uuid}
              href={`/audio-podcasts/${item.slug}`}
              imageSrc={item.thumbnail}
              title={item.title}
              variant='audio'
            />
          ))}
        </TabsContent>

        <TabsContent
          value='videos'
          className='grid grid-cols-2 gap-2 md:grid-cols-3'
        >
          {videos?.map((item: any) => (
            <ContentCard
              key={item.uuid}
              href={`/video-podcasts/${item.slug}`}
              imageSrc={item.thumbnail}
              title={item.title}
              variant='video'
            />
          ))}
        </TabsContent>
      </Tabs>

      {(content === "ebooks" && ebooksLoading) ||
      (content === "audios" && audiosLoading) ||
      (content === "videos" && videosLoading) ? (
        <p>Loading more...</p>
      ) : null}
    </div>
  );
}
