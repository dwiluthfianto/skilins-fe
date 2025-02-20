/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import axios from "@/utils/axios";
import { AudioPlayer } from "@/components/user-panel/ui/audio-player";
import { Metadata } from "next";
import FeedbackComponent from "@/components/skilins/features/feedback";
import { AudioDetail } from "@/components/shared/audio-detail";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const res = (await axios.get(`/contents/audios/${slug}`)).data;
  const audio = res.data;

  return {
    title: `${audio.title} - ${audio.creator} | skilins.`,
    openGraph: {
      images: [`${audio.thumbnail}`],
    },
  };
}

export default async function AudioDetailPage({ params }: any) {
  const { slug } = params;
  const res = (await axios.get(`/contents/audios/${slug}`)).data.data;

  return (
    <ContentLayout title={res.title}>
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
