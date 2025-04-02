/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import axios from "@/utils/axios";
import { Badge } from "@/components/ui/badge";
import { CircleOff, Loader, Signature } from "lucide-react";
import { AudioDetail } from "@/components/shared/audio-detail";
import FeedbackComponent from "@/components/skilins/features/feedback";

export default async function AudioDetailPage({ params }: any) {
  const { slug } = params;
  const res = (await axios.get(`/contents/audios/${slug}`)).data.data;

  return (
    <ContentLayout title={res.title}>
      <div>
        {res.status === "pending" ? (
          <Badge
            className='bg-yellow-600 p-2 text-white transition-transform transform hover:scale-105'
            variant={"outline"}
          >
            <Loader width={18} className='mr-2 animate-spin' />
            {res.status}
          </Badge>
        ) : res.status === "approved" ? (
          <Badge
            className='bg-green-600 text-white p-2 transition-transform transform hover:scale-105'
            variant={"outline"}
          >
            <Signature width={18} className='mr-2' />
            {res.status}
          </Badge>
        ) : (
          <Badge
            className='bg-red-600 text-white p-2 transition-transform transform hover:scale-105'
            variant={"destructive"}
          >
            <CircleOff width={18} className='mr-2' />
            {res.status}
          </Badge>
        )}
      </div>
      <AudioDetail audio={res} />
      <FeedbackComponent
        contentUuid={res.uuid}
        shareUrl={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/audio-podcasts/${res.slug}`}
        titleContent={res.title}
        comments={res.comment}
        avgRating={Number(res.avg_rating)}
        creator={res.audio_podcast.creator.name}
        className='my-8 lg:my-16 antialiased'
      />
    </ContentLayout>
  );
}
