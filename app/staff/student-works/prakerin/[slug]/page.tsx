/* eslint-disable @typescript-eslint/no-explicit-any */
import { AudioDetail } from "@/components/shared/audio-detail";
import { BackButton } from "@/components/shared/back-button";
import { PrakerinDetail } from "@/components/shared/prakerin-detail";
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
  const res = (await axios.get(`/contents/prakerin/${slug}`)).data;
  const prakerin = res.data;

  return {
    title: `${prakerin.title} - ${prakerin.prakerin.creator.name} | skilins.`,
    openGraph: {
      images: [`${prakerin.thumbnail}`],
    },
  };
}

export default async function PrakerinDetailPage({ params }: any) {
  const { slug } = params;
  const prakerin = (await axios.get(`/contents/prakerin/${slug}`)).data.data;

  return (
    <ContentLayout title={prakerin.title}>
      <div className='flex items-center justify-between'>
        <BackButton />
        {prakerin.status === "pending" && (
          <ActionButtons contentUuid={prakerin.uuid} contentType='prakerin' />
        )}
      </div>
      <PrakerinDetail prakerin={prakerin} />
    </ContentLayout>
  );
}
