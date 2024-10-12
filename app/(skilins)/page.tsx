"use client";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { Audio } from "@/components/user-panel/ui/audio";
import { Blog } from "@/components/user-panel/ui/blog";
import { Ebook } from "@/components/user-panel/ui/e-book";
import { Video } from "@/components/user-panel/ui/video";

export default function Home() {
  return (
    <ContentLayout title="Home">
      <Ebook />
      <Audio />
      <Video />
      <Blog />
    </ContentLayout>
  );
}
