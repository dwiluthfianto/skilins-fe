/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import axios from "@/utils/axios";
import { Badge } from "@/components/ui/badge";
import { Loader, Signature, CircleOff } from "lucide-react";
import { convertToEmbedLink } from "@/utils/youtube";
import { VideoDetail } from "@/components/shared/video-detail";
import FeedbackComponent from "@/components/skilins/features/feedback";

export default async function VideoDetailPage({ params }: any) {
  const { slug } = params;
  const video = (await axios.get(`/contents/videos/${slug}`)).data.data;

  const embedUrl = convertToEmbedLink(video.video_podcast.link);

  return (
    <ContentLayout title={video.title}>
      <div>
        {video.status === "pending" ? (
          <Badge
            className='bg-yellow-600 p-2 text-white transition-transform transform hover:scale-105'
            variant={"outline"}
          >
            <Loader width={18} className='mr-2 animate-spin' />
            {video.status}
          </Badge>
        ) : video.status === "approved" ? (
          <Badge
            className='bg-green-600 text-white p-2 transition-transform transform hover:scale-105'
            variant={"outline"}
          >
            <Signature width={18} className='mr-2' />
            {video.status}
          </Badge>
        ) : (
          <Badge
            className='bg-red-600 text-white p-2 transition-transform transform hover:scale-105'
            variant={"destructive"}
          >
            <CircleOff width={18} className='mr-2' />
            {video.status}
          </Badge>
        )}
      </div>
      <VideoDetail video={video} embedUrl={embedUrl} />
      <FeedbackComponent
        contentUuid={video.uuid}
        shareUrl={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/video-podcasts/${video.slug}`}
        titleContent={video.title}
        comments={video.comment}
        avgRating={Number(video.avg_rating)}
        creator={video.video_podcast.creator.name}
        className='my-8 lg:my-16 antialiased'
      />
    </ContentLayout>
  );
}
