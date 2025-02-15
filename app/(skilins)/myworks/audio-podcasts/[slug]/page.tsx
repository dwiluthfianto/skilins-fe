/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from '@/components/user-panel/content-layout';
import axios from '@/utils/axios';
import Image from 'next/image';
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
import { AudioPlayer } from '@/components/user-panel/ui/audio-player';
import { Card, CardContent } from '@/components/ui/card';
import MinimalTiptapPreview from '@/components/minimal-tiptap/minimal-tiptap-preview';
import { CircleOff, Loader, Signature } from 'lucide-react';

export default async function AudioDetail({ params }: any) {
  const { slug } = params;
  const res = (await axios.get(`/contents/audios/${slug}`)).data.data;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const track = {
    src: res.audio_podcast.file_attachment.file,
    title: res.title,
    category: res.category.name,
    image: res.thumbnail,
    creator: res.audio_podcast.creator.name,
  };

  return (
    <ContentLayout title={res.title}>
      <section className='md:py-2'>
        <div className='md:container'>
          <div>
            {res.status === 'pending' ? (
              <Badge
                className='bg-yellow-600 p-2 text-white transition-transform transform hover:scale-105'
                variant={'outline'}
              >
                <Loader width={18} className='mr-2 animate-spin' />
                {res.status}
              </Badge>
            ) : res.status === 'approved' ? (
              <Badge
                className='bg-green-600 text-white p-2 transition-transform transform hover:scale-105'
                variant={'outline'}
              >
                <Signature width={18} className='mr-2' />
                {res.status}
              </Badge>
            ) : (
              <Badge
                className='bg-red-600 text-white p-2 transition-transform transform hover:scale-105'
                variant={'destructive'}
              >
                <CircleOff width={18} className='mr-2' />
                {res.status}
              </Badge>
            )}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-4 mt-8 gap-y-6 md:gap-8 lg:gap-10'>
            <div className='relative'>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={res.thumbnail}
                  alt='placeholder'
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                  className='rounded-lg '
                />
              </AspectRatio>
              <AudioPlayer data={track} />
            </div>
            <div className='col-span-3 '>
              <Card className='rounded-lg '>
                <CardContent className='p-6'>
                  <p className='text-lg text-muted-foreground'>
                    {res.audio_podcast.creator.name}
                  </p>
                  <h2 className='text-3xl font-medium text-balance md:text-5xl'>
                    {res.title}
                  </h2>
                  <p className='max-w-xl mt-1 text-lg font-medium leading-relaxed tracking-tight md:mt-6 text lg:max-w-xl'>
                    Description
                  </p>
                  <MinimalTiptapPreview
                    value={res.description}
                    editable={false}
                  />

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='link'
                        className='flex items-center w-full'
                      >
                        See more
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px] md:max-w-[600px]'>
                      <DialogHeader>
                        <DialogTitle className='items-center justify-center text-center'>
                          Description
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className='max-h-[600px] pr-4'>
                        <MinimalTiptapPreview
                          value={res.description}
                          editable={false}
                        />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <div className='flex flex-col items-start gap-4 py-4 lg:py-8'>
                    <div className='flex flex-col gap-2'>
                      <p className='max-w-xl text-lg font-medium leading-relaxed tracking-tight lg:max-w-xl'>
                        Detail Audio
                      </p>
                    </div>
                    <div className='flex flex-col w-full'>
                      <div className='grid items-start grid-cols-2 gap-4 lg:grid-cols-3'>
                        <div className='flex flex-row items-start w-full gap-6'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-sm text-muted-foreground'>
                              Category
                            </p>
                            <p>{res.category.name}</p>
                          </div>
                        </div>
                        <div className='flex flex-row items-start gap-6'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-sm text-muted-foreground'>
                              Duration
                            </p>
                            <p>{formatTime(res.audio_podcast.duration)} </p>
                          </div>
                        </div>
                        <div className='flex flex-row items-start gap-6'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-sm text-muted-foreground'>
                              Release Date
                            </p>
                            <p>{format(res.created_at, 'dd MMM yyyy')}</p>
                          </div>
                        </div>
                        <div className='flex flex-row items-start gap-6'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-sm text-muted-foreground'>
                              Genres
                            </p>
                            <p>
                              {res.genre.map((genre: any, index: number) => (
                                <Badge key={index} className='mr-2'>
                                  {genre.text}
                                </Badge>
                              ))}
                            </p>
                          </div>
                        </div>
                        <div className='flex flex-row items-start gap-6'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-sm text-muted-foreground'>
                              Tags
                            </p>
                            <p>
                              {res.tag.map((tag: any, index: number) => (
                                <Badge
                                  key={index}
                                  className='items-center mr-2'
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
  let allAudios: any[] = [];
  let hasMore = true;

  // Lakukan fetching hingga tidak ada lagi data yang dikembalikan
  while (hasMore) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contents/audios?page=${page}&limit=${limit}`
    );
    const data = await res.json();
    const audios = data?.data || [];

    // Gabungkan data dari halaman saat ini
    allAudios = allAudios.concat(audios);

    // Cek apakah data masih ada di halaman berikutnya
    hasMore = audios.length === limit;
    page++;
  }

  return allAudios.map((audio: any) => ({
    slug: audio.slug,
  }));
}
