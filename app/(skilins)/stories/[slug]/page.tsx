/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from '@/components/user-panel/content-layout';
import axios from '../../../../utils/axios';
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import FeedbackComponent from '@/components/skilins/features/feedback';
import MinimalTiptapPreview from '@/components/minimal-tiptap/minimal-tiptap-preview';
import { DataTable } from './data-table';
import { columns } from './columns';

export default async function StoryDetail({ params }: any) {
  const { slug } = params;

  const res = (await axios.get(`/contents/stories/${slug}`)).data.data;

  return (
    <ContentLayout title={res.title}>
      <section className='md:py-2'>
        <div className='md:container'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/'>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/stories'>Stories</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{res.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='grid grid-cols-1 min-[1340px]:grid-cols-4 mt-8 gap-y-6 min-[1340px]:gap-8'>
            <div>
              <AspectRatio ratio={3 / 4}>
                <Image
                  src={res.thumbnail}
                  alt='placeholder'
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                  className=' rounded-lg'
                />
              </AspectRatio>
            </div>
            <div className='col-span-3'>
              <Card className=' rounded-lg'>
                <CardContent className='p-6'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className=' text-lg text-muted-foreground'>
                        {res.story.creator.name}
                      </p>
                      <h2 className='text-balance text-3xl font-medium md:text-5xl'>
                        {res.title}
                      </h2>
                    </div>
                  </div>
                  <p className='mt-1 md:mt-6 text text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium'>
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
                          value={res.description}
                          editable={false}
                        />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <div className='flex gap-4 py-4 lg:py-8 flex-col items-start'>
                    <div className='flex gap-2 flex-col'>
                      <p className='text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium'>
                        Detail story
                      </p>
                    </div>
                    <div className='flex flex-col w-full'>
                      <div className='grid grid-cols-2 items-start lg:grid-cols-3 gap-4'>
                        <div className='flex flex-row gap-6 w-full items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Category
                            </p>
                            <p>{res.category.name}</p>
                          </div>
                        </div>
                        <div className='flex flex-row gap-6 items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Release Date
                            </p>
                            <p>{format(res.created_at, 'dd MMM yyyy')}</p>
                          </div>
                        </div>
                        <div className='flex flex-row gap-6 items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Subjects
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

                        <div className='flex flex-row gap-6 items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Tags
                            </p>
                            <p>
                              {res.tag.map((tag: any, index: number) => (
                                <Badge key={index} className='mr-2'>
                                  {tag.text}
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
          <div className='mt-8'>
            <DataTable columns={columns} data={res.story.episode} />
          </div>
          <FeedbackComponent
            contentUuid={res.uuid}
            shareUrl={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/stories/${res.slug}`}
            titleContent={res.title}
            comments={res.comment}
            avgRating={Number(res.avg_rating)}
            creator={res.story.creator.name}
            className='my-8 lg:my-16 antialiased'
          />
        </div>
      </section>
    </ContentLayout>
  );
}
