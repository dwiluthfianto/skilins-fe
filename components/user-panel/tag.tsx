/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEbookInfinite } from "@/hooks/use-ebook";
import { useAudioInfinite } from "@/hooks/use-audio";
import { useVideoInfinite } from "@/hooks/use-video";
import ContentCard from "@/components/content-card";
import { useStoryInfinite } from "@/hooks/use-story";
import { useTagByName } from "@/hooks/use-tag";

export default function Tag({ tag }: { tag: string }) {
  const [content, setContent] = useState("ebooks");

  // Use infinite scroll hooks
  const {
    ebooks,
    isLoading: ebooksLoading,
    isError: ebooksError,
    loadMore: loadMoreEbooks,
    isReachingEnd: isEbooksEnd,
  } = useEbookInfinite({ tag });

  const {
    audios,
    isLoading: audiosLoading,
    isError: audiosError,
    loadMore: loadMoreAudios,
    isReachingEnd: isAudiosEnd,
  } = useAudioInfinite({ tag });

  const {
    videos,
    isLoading: videosLoading,
    isError: videosError,
    loadMore: loadMoreVideos,
    isReachingEnd: isVideosEnd,
  } = useVideoInfinite({ tag });

  const {
    stories,
    isLoading: storiesLoading,
    isError: storiesError,
    loadMore: loadMoreStories,
    isReachingEnd: isStoriesEnd,
  } = useStoryInfinite({ tag });

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
          case "stories":
            if (!storiesLoading && !isStoriesEnd) loadMoreStories();
            break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [content, ebooksLoading, audiosLoading, videosLoading, storiesLoading]);

  const { tag: dataTag } = useTagByName(tag);

  if (ebooksError || audiosError || videosError || storiesError) {
    return <div>Error loading contents</div>;
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col items-start justify-between gap-4 md:items-center md:flex-row'>
        <div>
          <p className='text-4xl font-bold'>{dataTag?.name}</p>
          <p className='mt-2 text-sm'>{dataTag?.description}</p>
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
          <TabsTrigger value='stories'>Stories</TabsTrigger>
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

        <TabsContent
          value='stories'
          className='grid grid-cols-2 gap-2 md:grid-cols-4'
        >
          {stories?.map((item: any) => (
            <ContentCard
              key={item.uuid}
              href={`/stories/${item.slug}`}
              imageSrc={item.thumbnail}
              title={item.title}
              variant='default'
            />
          ))}
        </TabsContent>
      </Tabs>

      {(content === "ebooks" && ebooksLoading) ||
      (content === "audios" && audiosLoading) ||
      (content === "videos" && videosLoading) ||
      (content === "stories" && storiesLoading) ? (
        <p>Loading more...</p>
      ) : null}
    </div>
  );
}
