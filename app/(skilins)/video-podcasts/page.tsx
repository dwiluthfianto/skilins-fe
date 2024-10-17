"use client";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { Videos } from "@/components/user-panel/ui/videos";
import { useVideo } from "@/hooks/use-video";

export default function VideoPage() {
  const { videos, isLoading, isError } = useVideo(1);
  if (isLoading) return <h1>loading..</h1>;
  if (isError) return <h1>loading..</h1>;

  return (
    <ContentLayout title="">
      <Videos data={videos} />
    </ContentLayout>
  );
}
