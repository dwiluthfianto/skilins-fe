/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import axios from "../../../../../../utils/axios";
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
import { AudioPlayer } from "@/components/user-panel/ui/audio-player";
import { Card, CardContent } from "@/components/ui/card";

export default async function AudioDetail({ params }: any) {
  const { id } = params;
  const res = (await axios.get(`/contents/audios/${id}`)).data;

  const audio = res.data;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const track = {
    src: audio.file_url,
    title: audio.title,
    category: audio.category,
    image: audio.thumbnail,
    creator: audio.creator,
  };

  return (
    <ContentLayout title={audio.title}>
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
                  <Link href="/audio-podcasts">audios</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{audio.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid grid-cols-1 lg:grid-cols-4 mt-8">
            <div className="relative">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={audio.thumbnail}
                  alt="placeholder"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className=" rounded-lg"
                />
              </AspectRatio>
              <AudioPlayer data={track} />
            </div>
            <div className="lg:mx-10 col-span-3 ">
              <Card className=" rounded-lg p-4 lg:p-10">
                <CardContent>
                  <p className=" text-lg text-muted-foreground">
                    {audio.creator}
                  </p>
                  <h2 className="text-balance text-3xl font-medium md:text-5xl">
                    {audio.title}
                  </h2>
                  <p className="mt-1 md:mt-6 text text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium">
                    Description
                  </p>
                  <p className="mt-1 text-muted-foreground line-clamp-3 text-justify">
                    {audio.description}
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
                          {audio.description}
                        </p>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <div className="flex gap-4 py-4 lg:py-8 flex-col items-start">
                    <div className="flex gap-2 flex-col">
                      <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium">
                        Detail Audio
                      </p>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-4">
                        <div className="flex flex-row gap-6 w-full items-start">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                              Category
                            </p>
                            <p>{audio.category}</p>
                          </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                              Duration
                            </p>
                            <p>{formatTime(audio.duration)} </p>
                          </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                              Release Date
                            </p>
                            <p>{format(audio.created_at, "dd MMM yyyy")}</p>
                          </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                              Subjects
                            </p>
                            <p>
                              {audio.subjects.map(
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
                              {audio.tags.map((tag: any, index: number) => (
                                <Badge
                                  key={index}
                                  className="mr-2 items-center"
                                >
                                  #{tag.name}
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
    const res = await axios.get(`/contents/audios?page=${page}&limit=${limit}`);
    const audios = res.data?.data || [];

    // Gabungkan data dari halaman saat ini
    allAudios = allAudios.concat(audios);

    // Cek apakah data masih ada di halaman berikutnya
    hasMore = audios.length === limit;
    page++;
  }

  return allAudios.map((ebook: any) => ({
    id: ebook.uuid,
  }));
}
