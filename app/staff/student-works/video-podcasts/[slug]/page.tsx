/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/staff-panel/content-layout";
import axios from "@/utils/axios";
import { Metadata } from "next";
import { convertToEmbedLink } from "@/utils/youtube";
import { VideoDetail } from "@/components/shared/video-detail";
import { ActionButtons } from "@/components/staff-panel/action-buttons";
import { BackButton } from "@/components/shared/back-button";

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
    title: `${video.title} - ${video.creator} | skilins.`,
    openGraph: {
      images: [`${video.thumbnail}`],
    },
  };
}

export default async function VideoDetailPage({ params }: any) {
  const { slug } = params;

  const video = (await axios.get(`/contents/videos/${slug}`)).data.data;

  const embedUrl = convertToEmbedLink(video.video_podcast.link);

  return (
    <ContentLayout title={video.title}>
      <div className='flex items-center justify-between'>
        <BackButton />
        {video.status === "pending" && (
          <ActionButtons contentUuid={video.uuid} contentType='videos' />
        )}
      </div>

      <VideoDetail video={video} embedUrl={embedUrl} />
    </ContentLayout>
  );
}
