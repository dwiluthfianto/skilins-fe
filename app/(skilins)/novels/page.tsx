"use client";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { Novels } from "@/components/user-panel/ui/novels";
import { useNovel } from "@/hooks/use-novel";

export default function NovelPage() {
  const { novels, isLoading, isError } = useNovel(1);
  if (isLoading) return <h1>loading..</h1>;
  if (isError) return <h1>loading..</h1>;

  return (
    <ContentLayout title="Novels">
      <Novels data={novels} />
    </ContentLayout>
  );
}
