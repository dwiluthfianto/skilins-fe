/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import Categories from "@/components/user-panel/categories";

export default async function Category({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;

  return (
    <ContentLayout title=''>
      <Categories category={category} />
    </ContentLayout>
  );
}
