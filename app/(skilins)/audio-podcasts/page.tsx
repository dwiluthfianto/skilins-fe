"use client";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { Audios } from "@/components/user-panel/ui/audios";
import { useAudio } from "@/hooks/use-audio";

export default function AudioPage() {
  const { audios, isLoading, isError } = useAudio(1);
  if (isLoading) return <h1>loading..</h1>;
  if (isError) return <h1>loading..</h1>;

  return (
    <ContentLayout title="">
      <Audios data={audios} />
    </ContentLayout>
  );
}
