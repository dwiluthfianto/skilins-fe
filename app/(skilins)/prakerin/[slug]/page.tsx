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
import { BookText } from 'lucide-react';
import LikeComponent from '@/components/user-panel/ui/rating';
import CommentComponent from '@/components/user-panel/ui/comment';

export default async function ReportDetail({ params }: any) {
  const { slug } = params;

  const res = (await axios.get(`/contents/reports/${slug}`)).data;

  const report = res.data;

  return (
    <ContentLayout title={report.title}>
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
                  <Link href='/reports'>reports</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{report.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='grid grid-cols-1 md:grid-cols-4 mt-8 gap-y-6 md:gap-8 lg:gap-10'>
            <div>
              <AspectRatio ratio={3 / 4}>
                <Image
                  src={report.thumbnail}
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
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className=' text-lg text-muted-foreground'>
                        {report.author}
                      </p>
                      <h2 className='text-balance text-3xl font-medium md:text-5xl'>
                        {report.title}
                      </h2>
                    </div>
                    <Button variant={'default'}>
                      <BookText width={16} className='mr-2' />
                      <Link href={report.file}>Read book</Link>
                    </Button>
                  </div>
                  <p className='mt-1 md:mt-6 text text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium'>
                    Description
                  </p>
                  <p className='mt-1 text-muted-foreground line-clamp-3 text-justify'>
                    {report.description}
                  </p>
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
                        <p className='text-justify text-muted-foreground	'>
                          {report.description}
                        </p>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <div className='flex gap-4 py-4 lg:py-8 flex-col items-start'>
                    <div className='flex gap-2 flex-col'>
                      <p className='text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium'>
                        Detail report
                      </p>
                    </div>
                    <div className='flex flex-col w-full'>
                      <div className='grid grid-cols-2 items-start lg:grid-cols-3 gap-4'>
                        <div className='flex flex-row gap-6 w-full items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Category
                            </p>
                            <p>{report.category}</p>
                          </div>
                        </div>

                        <div className='flex flex-row gap-6 w-full items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Pages
                            </p>
                            <p>{report.pages}</p>
                          </div>
                        </div>
                        <div className='flex flex-row gap-6 items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Published at
                            </p>
                            <p>{format(report.published_at, 'dd MMM yyyy')}</p>
                          </div>
                        </div>
                        <div className='flex flex-row gap-6 items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Subjects
                            </p>
                            <p>
                              {report.subjects.map(
                                (subject: any, index: number) => (
                                  <Badge key={index} className='mr-2'>
                                    {subject}
                                  </Badge>
                                )
                              )}
                            </p>
                          </div>
                        </div>

                        <div className='flex flex-row gap-6 items-start'>
                          <div className='flex flex-col gap-1'>
                            <p className='text-muted-foreground text-sm'>
                              Tags
                            </p>
                            <p>
                              {report.tags.map((tag: any, index: number) => (
                                <Badge key={index} className='mr-2'>
                                  {tag.name}
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
          <Card className=' py-8 lg:py-16 antialiased mt-10'>
            <CardContent className='space-y-4'>
              <LikeComponent contentUuid={slug} />
              <CommentComponent comments={report.comment} contentId={slug} />
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
  let allreports: any[] = [];
  let hasMore = true;

  // Lakukan fetching hingga tidak ada lagi data yang dikembalikan
  while (hasMore) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contents/reports?page=${page}&limit=${limit}`
    );
    const data = await res.json();
    const reports = data?.data || [];

    // Gabungkan data dari halaman saat ini
    allreports = allreports.concat(reports);

    // Cek apakah data masih ada di halaman berikutnya
    hasMore = reports.length === limit;
    page++;
  }

  return allreports.map((report: any) => ({
    slug: report.uuid,
  }));
}
