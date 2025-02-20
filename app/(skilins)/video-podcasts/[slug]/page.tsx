/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import axios from "@/utils/axios";
import { VideoDetail } from "@/components/shared/video-detail";
import { convertToEmbedLink } from "@/utils/youtube";
import FeedbackComponent from "@/components/skilins/features/feedback";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const res = (await axios.get(`/contents/videos/${slug}`)).data;
  const video = res.data;

  return {
    title: `${video.title} - ${video.video_podcast.creator.name} | skilins.`,
    openGraph: {
      images: [`${video.thumbnail}`],
    },
  };
}

export default async function VideoDetailPage({ params }: any) {
  const { slug } = params;
  const res = (await axios.get(`/contents/videos/${slug}`)).data;
  const video = res.data;

  const embedUrl = convertToEmbedLink(video.video_podcast.link);

  return (
    <ContentLayout title={video.title}>
      <VideoDetail video={video} embedUrl={embedUrl} />
      <FeedbackComponent
        comments={video.comment}
        contentUuid={video.uuid}
        creator={video.video_podcast.creator.name}
        shareUrl={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/video-podcasts/${video.slug}`}
        titleContent={video.title}
        avgRating={Number(video.avg_rating)}
        className='my-8 lg:my-16 antialiased'
      />
    </ContentLayout>
  );
}
