"use client";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { Novels } from "@/components/user-panel/ui/novels";

export default function NovelPage() {
  return (
    <ContentLayout title="">
      <Novels />
    </ContentLayout>
  );
}
