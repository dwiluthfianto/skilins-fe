/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import axios from "../../../../utils/axios";
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
import LikeComponent from "@/components/user-panel/ui/like";
import CommentComponent from "@/components/user-panel/ui/comment";

export default async function VideoDetail({ params }: any) {
  const { slug } = params;
  const res = (await axios.get(`/contents/videos/${slug}`)).data;

  const video = res.data;

  function convertToEmbedLink(youtubeUrl: any) {
    // Regular expression untuk menangkap video ID dari URL YouTube
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)|youtu\.be\/([a-zA-Z0-9_-]+)/;
    const match = youtubeUrl.match(regex);

    if (match && (match[1] || match[2])) {
      // Ambil video ID dari URL YouTube
      const videoId = match[1] || match[2];

      // Return embed link
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      return null; // Jika tidak valid
    }
  }

  const embedUrl = convertToEmbedLink(video.file_url);

  return (
    <ContentLayout title={video.title}>
      <section className="md:py-2">
        <div className="md:container">
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
                  <Link href="/audio-podcasts">videos</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{video.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="mt-4">
            <AspectRatio ratio={16 / 9}>
              <iframe
                className="w-full h-full"
                src={embedUrl || undefined}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </AspectRatio>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 mt-8">
            <div className="  col-span-4">
              <Card className=" rounded-lg ">
                <CardContent className="p-6">
                  <p className=" text-lg text-muted-foreground">
                    {video.creator}
                  </p>
                  <h2 className="text-balance text-3xl font-medium md:text-5xl">
                    {video.title}
                  </h2>
                  <p className="mt-1 md:mt-6 text text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium">
                    Description
                  </p>
                  <p className="mt-1 text-muted-foreground line-clamp-3 text-justify">
                    {video.description}
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
                          {video.description}
                        </p>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <div className="flex gap-4 py-4 lg:py-8 flex-col items-start">
                    <div className="flex gap-2 flex-col">
                      <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium">
                        Detail Video
                      </p>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-4">
                        <div className="flex flex-row gap-6 w-full items-start">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                              Category
                            </p>
                            <p>{video.category}</p>
                          </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                              Duration
                            </p>
                            <p>{video.duration} </p>
                          </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                              Release Date
                            </p>
                            <p>{format(video.created_at, "dd MMM yyyy")}</p>
                          </div>
                        </div>
                        <div className="flex flex-row gap-6 items-start">
                          <div className="flex flex-col gap-1">
                            <p className="text-muted-foreground text-sm">
                              Subjects
                            </p>
                            <p>
                              {video.subjects.map(
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
                              {video.tags.map((tag: any, index: number) => (
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
          <Card className=" py-8 lg:py-16 antialiased mt-10">
            <CardContent className="space-y-4">
              <LikeComponent likes={video.likes} contentUuid={slug} />
              <CommentComponent comment={video.comments} contentUuid={slug} />
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
  let allVideos: any[] = [];
  let hasMore = true;

  // Lakukan fetching hingga tidak ada lagi data yang dikembalikan
  while (hasMore) {
    const res = await axios.get(`/contents/videos?page=${page}&limit=${limit}`);
    const videos = res.data?.data || [];

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
