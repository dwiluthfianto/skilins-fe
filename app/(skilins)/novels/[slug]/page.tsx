/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import axios from "../../../../utils/axios";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function NovelsDetail({ params }: any) {
  const { slug } = params;
  console.log(slug);

  const res = (await axios.get(`/contents/novels/${slug}`)).data;

  const novel = res.data;

  return (
    <ContentLayout title={slug}>
      <section className="py-2">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/novels">Novels</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{novel.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid grid-cols-1 md:grid-cols-4 mt-8">
            <div>
              <AspectRatio ratio={3 / 4}>
                <Image
                  src={novel.thumbnail}
                  alt="placeholder"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className=" rounded-lg"
                />
              </AspectRatio>
            </div>
            <div className="lg:px-10  col-span-3">
              <Card className=" rounded-lg p-4 lg:p-10">
                <CardContent>
                  <p className=" text-lg text-muted-foreground">
                    {novel.author}
                  </p>
                  <h2 className="text-balance text-3xl font-medium md:text-5xl">
                    {novel.title}
                  </h2>
                  <p className="mt-1 md:mt-6 text text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium">
                    Description
                  </p>
                  <p className="mt-1 text-muted-foreground line-clamp-3 text-justify">
                    {novel.description}
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="flex w-full items-center"
                      >
                        See more
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle className="text-center justify-center items-center">
                          Description
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[600px] pr-4">
                        <p className="text-justify text-muted-foreground	">
                          {novel.description}
                        </p>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <div className="flex gap-4 py-4 lg:py-8 flex-col items-start">
                    <div className="flex gap-2 flex-col">
                      <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium">
                        Detail novel
                      </p>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-4">
                        <div className="flex flex-row gap-6 w-full items-start">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                              Category
                            </p>
                            <p>{novel.category}</p>
                          </div>
                        </div>

                        <div className="flex flex-row gap-6 w-full items-start">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                              Pages
                            </p>
                            <p>{novel.pages}</p>
                          </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                              Release Date
                            </p>
                            <p>{format(novel.created_at, "dd MMM yyyy")}</p>
                          </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                              Subjects
                            </p>
                            <p>
                              {novel.subjects.map(
                                (subject: any, index: number) => (
                                  <Badge key={index} className="mr-2">
                                    {subject}
                                  </Badge>
                                )
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-row gap-6 items-start">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                              Tags
                            </p>
                            <p>
                              {novel.tags.map((tag: any, index: number) => (
                                <Badge key={index} className="mr-2">
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
        </div>
      </section>
    </ContentLayout>
  );
}

export async function generateStaticParams() {
  let page = 1;
  const limit = 25;
  let allNovels: any[] = [];
  let hasMore = true;

  // Lakukan fetching hingga tidak ada lagi data yang dikembalikan
  while (hasMore) {
    const res = await axios.get(`/contents/novels?page=${page}&limit=${limit}`);
    const novels = res.data?.data || [];

    // Gabungkan data dari halaman saat ini
    allNovels = allNovels.concat(novels);

    // Cek apakah data masih ada di halaman berikutnya
    hasMore = novels.length === limit;
    page++;
  }

  return allNovels.map((novel: any) => ({
    slug: novel.uuid,
  }));
}
