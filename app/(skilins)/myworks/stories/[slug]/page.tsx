/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from '@/components/user-panel/content-layout';
import axios from '@/utils/axios';
import StoryUpdate from '../update/page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import TableofContent from '@/components/skilins/features/table-of-content';

export default async function StoriesDetail({ params }: any) {
  const { slug } = params;
  const res = (await axios.get(`/contents/stories/${slug}`)).data.data;

  return (
    <ContentLayout title={res.title}>
      <section className='md:py-2'>
        <div className='max-w-4xl mx-auto'>
          <Card>
            <CardContent className='pt-6'>
              <Tabs defaultValue='detail'>
                <TabsList variant={'ghost'}>
                  <TabsTrigger
                    value='detail'
                    variant={'underline'}
                    className='text-xl'
                  >
                    Story Detail
                  </TabsTrigger>
                  <TabsTrigger
                    value='table'
                    variant={'underline'}
                    className='text-xl'
                  >
                    Table of Contents
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='detail'>
                  <StoryUpdate story={res} />
                </TabsContent>
                <TabsContent value='table'>
                  <TableofContent episodes={res.story.episode} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </ContentLayout>
  );
}
