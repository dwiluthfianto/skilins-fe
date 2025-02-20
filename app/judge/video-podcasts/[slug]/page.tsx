/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/judge-panel/content-layout";
import axios from "../../../../utils/axios";
import type { Metadata } from "next";
import FeedbackJudge from "@/components/judge-panel/feedback";
import { convertToEmbedLink } from "@/utils/youtube";
import { VideoDetail } from "@/components/shared/video-detail";

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
    <ContentLayout>
      <FeedbackJudge
        submissionUuid={video.submission.uuid}
        competitionUuid={video.submission.competition.uuid}
      />
      <VideoDetail video={video} embedUrl={embedUrl} />
    </ContentLayout>
  );
}
