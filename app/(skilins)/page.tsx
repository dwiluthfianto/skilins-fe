"use client";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { AudioCarousel } from "@/components/user-panel/ui/audio-carousel";
import { Blog } from "@/components/user-panel/ui/blog";
import { EbookCarousel } from "@/components/user-panel/ui/ebook-carousel";
import { NovelCarousel } from "@/components/user-panel/ui/novel-carousel";
import { SkeletonCard } from "@/components/user-panel/ui/skeletons/skeleton-card";
import { VideoCarousel } from "@/components/user-panel/ui/video-carousel";
import { useAudioLatest } from "@/hooks/use-audio";
import { useEbookLatest } from "@/hooks/use-ebook";
import { useNovelLatest } from "@/hooks/use-novel";
import { useVideoLatest } from "@/hooks/use-video";

export default function Home() {
  const { ebooks, isLoading } = useEbookLatest(1, 10, 12);
  const { novels } = useNovelLatest(1, 10, 12);
  const { audios } = useAudioLatest(1, 10, 12);
  const { videos } = useVideoLatest(1, 10, 12);

  if (isLoading) return <SkeletonCard total={6} />;
  return (
    <ContentLayout title="Home">
      <EbookCarousel data={ebooks} />
      <NovelCarousel data={novels} />
      <AudioCarousel data={audios} />
      <VideoCarousel data={videos} />
      <Blog />
    </ContentLayout>
  );
}
