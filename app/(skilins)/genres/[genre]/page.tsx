/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import Genre from "@/components/user-panel/genre";

export default async function Category({
  params,
}: {
  params: { genre: string };
}) {
  const { genre } = params;

  return (
    <ContentLayout title=''>
      <Genre genre={genre} />
    </ContentLayout>
  );
}
