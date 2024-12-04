/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import axios from "@/utils/axios";
import StoryUpdate from "../update/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import TableofContent from "@/components/skilins/features/table-of-content";

export default async function StoriesDetail({ params }: any) {
  const { slug } = params;
  const res = (await axios.get(`/contents/stories/${slug}`)).data;

  const story = res.data;

  return (
    <ContentLayout title={story.title}>
      <section className="md:py-2">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="detail">
                <TabsList variant={"ghost"}>
                  <TabsTrigger
                    value="detail"
                    variant={"underline"}
                    className="text-xl"
                  >
                    Story Detail
                  </TabsTrigger>
                  <TabsTrigger
                    value="table"
                    variant={"underline"}
                    className="text-xl"
                  >
                    Table of Contents
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="detail">
                  <StoryUpdate story={story} />
                </TabsContent>
                <TabsContent value="table">
                  <TableofContent episodes={story.episodes} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </ContentLayout>
  );
}

export async function generateStaticParams() {
  let page = 1;
  const limit = 25;
  let allStories: any[] = [];
  let hasMore = true;

  // Lakukan fetching hingga tidak ada lagi data yang dikembalikan
  while (hasMore) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contents/stories?page=${page}&limit=${limit}`
    );
    const data = await res.json();
    const stories = data?.data || [];

    // Gabungkan data dari halaman saat ini
    allStories = allStories.concat(stories);

    // Cek apakah data masih ada di halaman berikutnya
    hasMore = stories.length === limit;
    page++;
  }

  return allStories.map((story: any) => ({
    slug: story.slug,
  }));
}
