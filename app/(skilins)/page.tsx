'use client';
import { ContentLayout } from '@/components/user-panel/content-layout';
import { AudioCarousel } from '@/components/user-panel/ui/audio-carousel';
import { BlogCarousel } from '@/components/user-panel/ui/blog-carousel';
import { EbookCarousel } from '@/components/user-panel/ui/ebook-carousel';
import { StoryCarousel } from '@/components/user-panel/ui/stories-carousel';
import { VideoCarousel } from '@/components/user-panel/ui/video-carousel';
import { useAudioLatest } from '@/hooks/use-audio';
import { useEbookLatest } from '@/hooks/use-ebook';
import { useStoryLatest } from '@/hooks/use-story';
import { useVideoLatest } from '@/hooks/use-video';

export default function Home() {
  const { stories } = useStoryLatest(1, 10, 12, 'APPROVED');
  const { ebooks } = useEbookLatest(1, 10, 12, 'APPROVED');
  const { audios } = useAudioLatest(1, 10, 12, 'APPROVED');
  const { videos } = useVideoLatest(1, 10, 12, 'APPROVED');

  return (
    <ContentLayout title='Home'>
      {ebooks && <EbookCarousel data={ebooks} />}
      {stories && <StoryCarousel data={stories} />}
      {audios && <AudioCarousel data={audios} />}
      {videos && <VideoCarousel data={videos} />}
      <BlogCarousel />
    </ContentLayout>
  );
}
