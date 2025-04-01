/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/staff-panel/content-layout";
import axios from "@/utils/axios";
import { Metadata } from "next";
import { ActionButtons } from "@/components/staff-panel/action-buttons";
import { BackButton } from "@/components/shared/back-button";
import StoryDetail from "@/components/shared/story-detail";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const res = (await axios.get(`/contents/stories/${slug}`)).data;
  const story = res.data;

  return {
    title: `${story.title} - ${story.creator} | skilins.`,
    openGraph: {
      images: [`${story.thumbnail}`],
    },
  };
}

export default async function VideoDetailPage({ params }: any) {
  const { slug } = params;

  const story = (await axios.get(`/contents/stories/${slug}`)).data.data;

  return (
    <ContentLayout title={story.title}>
      <div className='flex items-center justify-between'>
        <BackButton />
        {story.status === "pending" && (
          <ActionButtons contentUuid={story.uuid} contentType='stories' />
        )}
      </div>

      <StoryDetail story={story} />
    </ContentLayout>
  );
}
