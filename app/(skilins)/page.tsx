"use client";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { Audio } from "@/components/user-panel/ui/audio";
import { Blog } from "@/components/user-panel/ui/blog";
import { Ebook } from "@/components/user-panel/ui/ebook";
import { Video } from "@/components/user-panel/ui/video";
import { useEbookLatest } from "@/hooks/use-ebook";

export default function Home() {
  const { ebooks, isLoading, isError } = useEbookLatest();
  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error..</h1>;
  return (
    <ContentLayout title="Home">
      <Ebook data={ebooks} />
      <Audio />
      <Video />
      <Blog />
    </ContentLayout>
  );
}
