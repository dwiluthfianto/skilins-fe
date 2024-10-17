"use client";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { useEbook } from "@/hooks/use-ebook";
import { Ebooks } from "@/components/user-panel/ui/ebooks";

export default function EbookPage() {
  const { ebooks, isLoading, isError } = useEbook(1);
  if (isLoading) return <h1>loading..</h1>;
  if (isError) return <h1>loading..</h1>;

  return (
    <ContentLayout title="">
      <Ebooks data={ebooks} />
    </ContentLayout>
  );
}
