/* eslint-disable @typescript-eslint/no-explicit-any */
import { AudioDetail } from "@/components/shared/audio-detail";
import { BackButton } from "@/components/shared/back-button";
import { ActionButtons } from "@/components/staff-panel/action-buttons";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import axios from "@/utils/axios";
import { Metadata } from "next";

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
  const audio = (await axios.get(`/contents/audios/${slug}`)).data.data;

  return (
    <ContentLayout title={audio.title}>
      <div className='flex items-center justify-between'>
        <BackButton />
        {audio.status === "pending" && (
          <ActionButtons contentUuid={audio.uuid} contentType='audios' />
        )}
      </div>
      <AudioDetail audio={audio} />
    </ContentLayout>
  );
}
