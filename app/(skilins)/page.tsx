'use client';
import { ContentLayout } from '@/components/user-panel/content-layout';
import { AudioCarousel } from '@/components/user-panel/ui/audio-carousel';
import { BlogCarousel } from '@/components/user-panel/ui/blog-carousel';
import { EbookCarousel } from '@/components/user-panel/ui/ebook-carousel';
import { StoryCarousel } from '@/components/user-panel/ui/stories-carousel';
import { VideoCarousel } from '@/components/user-panel/ui/video-carousel';
import { useAudio } from '@/hooks/use-audio';
import { useBlog } from '@/hooks/use-blog';
import { useEbook } from '@/hooks/use-ebook';
import { useStory } from '@/hooks/use-story';
import { useVideo } from '@/hooks/use-video';

export default function Home() {
  const { stories } = useStory({ page: 1, limit: 10, status: 'approved' });
  const { ebooks } = useEbook({ page: 1, limit: 10 });
  const { audios } = useAudio({ page: 1, limit: 10, status: 'approved' });
  const { videos } = useVideo({ page: 1, limit: 10, status: 'approved' });
  const { blogs } = useBlog({ page: 1, limit: 10 });

  return (
    <ContentLayout title='Home'>
      {ebooks && <EbookCarousel data={ebooks} />}
      {stories && <StoryCarousel data={stories} />}
      {audios && <AudioCarousel data={audios} />}
      {videos && <VideoCarousel data={videos} />}
      {blogs && <BlogCarousel data={blogs} />}
    </ContentLayout>
  );
}
