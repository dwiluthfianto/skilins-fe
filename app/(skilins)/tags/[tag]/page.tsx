/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import Tags from "@/components/user-panel/ui/tags";

export default async function Category({
  params,
}: {
  params: { tag: string };
}) {
  const { tag } = params;

  return (
    <ContentLayout title={tag.charAt(0).toUpperCase() + tag.slice(1)}>
      <Tags tag={tag} />
    </ContentLayout>
  );
}

export async function generateStaticParams() {
  let page = 1;
  const limit = 25;
  const allTags: any[] = [];
  let hasMore = true;

  // Lakukan fetching hingga tidak ada lagi data yang dikembalikan
  while (hasMore) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contents/ebooks?page=${page}&limit=${limit}`
    );
    const data = await res.json();
    const ebooks = data?.data || [];

    // Gabungkan tags dari setiap ebook
    ebooks.forEach((ebook: any) => {
      ebook.tags.forEach((tag: any) => {
        if (
          !allTags.some(
            (existingTag: any) => existingTag.tag === tag.name.toLowerCase()
          )
        ) {
          allTags.push({ tag: tag.name.toLowerCase() });
        }
      });
    });

    // Cek apakah data masih ada di halaman berikutnya
    hasMore = ebooks.length === limit;
    page++;
  }

  return allTags;
}
