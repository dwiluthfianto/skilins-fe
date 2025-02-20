/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import Tag from "@/components/user-panel/tag";

export default async function Category({
  params,
}: {
  params: { tag: string };
}) {
  const { tag } = params;

  return (
    <ContentLayout title=''>
      <Tag tag={tag} />
    </ContentLayout>
  );
}
