/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import Categories from "@/components/user-panel/ui/categories";
import axios from "@/utils/axios";

export default async function Category({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;

  const res = (
    await axios.get(`/contents/ebooks?category=${category}&page=1&limit=25`)
  ).data.data;

  return (
    <ContentLayout title={category.charAt(0).toUpperCase() + category.slice(1)}>
      <Categories initialEbooks={res} category={category} />
    </ContentLayout>
  );
}

export async function generateStaticParams() {
  let page = 1;
  const limit = 25;
  let allEbooks: any[] = [];
  let hasMore = true;

  // Lakukan fetching hingga tidak ada lagi data yang dikembalikan
  while (hasMore) {
    const res = await axios.get(`/contents/ebooks?page=${page}&limit=${limit}`);
    const ebooks = res.data?.data || [];

    // Gabungkan data dari halaman saat ini
    allEbooks = allEbooks.concat(ebooks);

    // Cek apakah data masih ada di halaman berikutnya
    hasMore = ebooks.length === limit;
    page++;
  }

  return allEbooks.map((ebook: any) => ({
    category: ebook.category.toLowerCase(),
  }));
}
