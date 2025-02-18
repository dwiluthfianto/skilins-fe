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
import { Metadata } from 'next';
import FeedbackComponent from '@/components/skilins/features/feedback';
import { BookText } from 'lucide-react';
import MinimalTiptapPreview from '@/components/minimal-tiptap/minimal-tiptap-preview';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const res = await axios.get(`/contents/ebooks/${params.slug}`);
  const ebook = res.data.data;

  return {
    title: ebook.title,
    description: ebook.description,
    openGraph: {
      title: ebook.title,
      description: ebook.description,
      images: [
        {
          url: ebook.thumbnail,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/ebooks/${ebook.uuid}`,
    },
  };
}

export default async function EbookDetail({ params }: any) {
  const { slug } = params;

  const res = (await axios.get(`/contents/ebooks/${slug}`)).data.data;

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
                  <Link href='/ebooks'>ebooks</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{res.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='grid grid-cols-1 md:grid-cols-4 mt-8 gap-y-6 md:gap-8 lg:gap-10'>
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
              <Card className=' rounded-lg '>
                <CardContent className='p-6'>
                  <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                    <div>
                      <p className=' text-lg text-muted-foreground'>
                        {res.author}
                      </p>
                      <h2 className='text-balance text-3xl font-medium md:text-5xl'>
                        {res.title}
                      </h2>
                    </div>
                    <Button variant={'default'}>
                      <BookText width={16} className='mr-2' />
                      <Link href={res.ebook.file_attachment.file}>
                        Read book
                      </Link>
                    </Button>
                    {/* <ShareButton
                      title={ebook.title}
                      url={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/ebooks/${ebook.uuid}`}
                    /> */}
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
                        Detail Ebook
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
                              ISBN
                            </p>
                            <p>{res.ebook.isbn} </p>
                          </div>
                        </div>
                        <div className='flex flex-row gap-6 items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Publication
                            </p>
                            <p>{res.ebook.publication}</p>
                          </div>
                        </div>
                        <div className='flex flex-row gap-6 w-full items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Pages
                            </p>
                            <p>{res.ebook.pages}</p>
                          </div>
                        </div>
                        <div className='flex flex-row gap-6 items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Release Date
                            </p>
                            <p>
                              {format(res.ebook.release_date, 'dd MMM yyyy')}
                            </p>
                          </div>
                        </div>
                        <div className='flex flex-row gap-6 items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Tags
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
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <FeedbackComponent
            contentUuid={res.uuid}
            shareUrl={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/ebooks/${res.slug}`}
            titleContent={res.title}
            comments={res.comment}
            avgRating={Number(res.avg_rating)}
            creator={res.ebook.author}
            className='my-8 lg:my-16 antialiased'
          />
        </div>
      </section>
    </ContentLayout>
  );
}
