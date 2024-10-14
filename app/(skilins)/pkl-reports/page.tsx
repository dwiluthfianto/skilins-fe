"use client";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { Reports } from "@/components/user-panel/ui/reports";
import { useReport } from "@/hooks/use-report";

export default function NovelPage() {
  const { reports, isLoading, isError } = useReport(1);
  if (isLoading) return <h1>loading..</h1>;
  if (isError) return <h1>loading..</h1>;

  return (
    <ContentLayout title="PKL Reports">
      <Reports data={reports} />
    </ContentLayout>
  );
}
