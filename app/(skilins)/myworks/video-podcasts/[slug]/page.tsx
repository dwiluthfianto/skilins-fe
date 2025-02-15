/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from '@/components/user-panel/content-layout';
import axios from '@/utils/axios';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import MinimalTiptapPreview from '@/components/minimal-tiptap/minimal-tiptap-preview';
import { Loader, Signature, CircleOff } from 'lucide-react';
export default async function VideoDetail({ params }: any) {
  const { slug } = params;
  const video = (await axios.get(`/contents/videos/${slug}`)).data.data;

  function convertToEmbedLink(youtubeUrl: any) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)|youtu\.be\/([a-zA-Z0-9_-]+)/;
    const match = youtubeUrl.match(regex);

    if (match && (match[1] || match[2])) {
      const videoId = match[1] || match[2];

      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      return null;
    }
  }

  const embedUrl = convertToEmbedLink(video.video_podcast.link);

  return (
    <ContentLayout title={video.title}>
      <section className='md:py-2'>
        <div className='md:container'>
          <div>
            {video.status === 'pending' ? (
              <Badge
                className='bg-yellow-600 p-2 text-white transition-transform transform hover:scale-105'
                variant={'outline'}
              >
                <Loader width={18} className='mr-2 animate-spin' />
                {video.status}
              </Badge>
            ) : video.status === 'approved' ? (
              <Badge
                className='bg-green-600 text-white p-2 transition-transform transform hover:scale-105'
                variant={'outline'}
              >
                <Signature width={18} className='mr-2' />
                {video.status}
              </Badge>
            ) : (
              <Badge
                className='bg-red-600 text-white p-2 transition-transform transform hover:scale-105'
                variant={'destructive'}
              >
                <CircleOff width={18} className='mr-2' />
                {video.status}
              </Badge>
            )}
          </div>
          <div className='mt-4'>
            <AspectRatio ratio={16 / 9}>
              <iframe
                className='w-full h-full'
                src={embedUrl || undefined}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; clipboard-write; encrypted-media; gyroscope; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              ></iframe>
            </AspectRatio>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-4 mt-8'>
            <div className='  col-span-4'>
              <Card className=' rounded-lg '>
                <CardContent className='p-6'>
                  <p className=' text-lg text-muted-foreground'>
                    {video.video_podcast.creator.name}
                  </p>
                  <h2 className='text-balance text-3xl font-medium md:text-5xl'>
                    {video.title}
                  </h2>
                  <p className='mt-1 md:mt-6 text text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium'>
                    Description
                  </p>
                  <MinimalTiptapPreview
                    value={video.description}
                    editable={false}
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='link'
                        className='flex w-full items-center'
                      >
                        See more
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px] md:max-w-[600px]'>
                      <DialogHeader>
                        <DialogTitle className='text-center justify-center items-center'>
                          Description
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className='max-h-[600px] pr-4'>
                        <MinimalTiptapPreview
                          value={video.description}
                          editable={false}
                        />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <div className='flex gap-4 py-4 lg:py-8 flex-col items-start'>
                    <div className='flex gap-2 flex-col'>
                      <p className='text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium'>
                        Detail Video
                      </p>
                    </div>
                    <div className='flex flex-col w-full'>
                      <div className='grid grid-cols-2 items-start lg:grid-cols-3 gap-4'>
                        <div className='flex flex-row gap-6 w-full items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Category
                            </p>
                            <p>{video.category.name}</p>
                          </div>
                        </div>
                        <div className='flex flex-row gap-6 items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Release Date
                            </p>
                            <p>{format(video.created_at, 'dd MMM yyyy')}</p>
                          </div>
                        </div>
                        <div className='flex flex-row gap-6 items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Genres
                            </p>
                            <p>
                              {video.genre.map((genre: any, index: number) => (
                                <Badge key={index} className='mr-2'>
                                  {genre.text}
                                </Badge>
                              ))}
                            </p>
                          </div>
                        </div>
                        <div className='flex flex-row gap-6 items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Tags
                            </p>
                            <p>
                              {video.tag.map((tag: any, index: number) => (
                                <Badge
                                  key={index}
                                  className='mr-2 items-center'
                                >
                                  #{tag.text}
                                </Badge>
                              ))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
}

export async function generateStaticParams() {
  let page = 1;
  const limit = 25;
  let allVideos: any[] = [];
  let hasMore = true;

  // Lakukan fetching hingga tidak ada lagi data yang dikembalikan
  while (hasMore) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contents/videos?page=${page}&limit=${limit}`
    );
    const data = await res.json();
    const videos = data?.data || [];

    // Gabungkan data dari halaman saat ini
    allVideos = allVideos.concat(videos);

    // Cek apakah data masih ada di halaman berikutnya
    hasMore = videos.length === limit;
    page++;
  }

  return allVideos.map((video: any) => ({
    slug: video.uuid,
  }));
}
