/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContentLayout } from "@/components/user-panel/content-layout";
import axios from "../../../../utils/axios";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { format } from "date-fns";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import CommentComponent from "@/components/user-panel/ui/comment";
// import { BookText } from "lucide-react";
// import LikeComponent from "@/components/user-panel/ui/like";
import { Metadata } from "next";
import MinimalTiptapPreview from "@/components/minimal-tiptap/minimal-tiptap-preview";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const res = await axios.get(`/contents/blogs/${params.slug}`);
  const blog = res.data.data;

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: blog.thumbnail,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blogs/${blog.slug}`,
    },
  };
}

export default async function EbookDetail({ params }: any) {
  const { slug } = params;

  const res = (await axios.get(`/contents/blogs/${slug}`)).data;

  const blog = res.data;

  return (
    <ContentLayout title={blog.title}>
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
                  <Link href="/blogs">blogs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{blog.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid grid-cols-5">
            <div className="col-span-3">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={blog.thumbnail}
                  alt="placeholder"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className=" rounded-lg"
                />
              </AspectRatio>
              <MinimalTiptapPreview value={blog.description} editable={false} />
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
  let allBlogs: any[] = [];
  let hasMore = true;

  // Lakukan fetching hingga tidak ada lagi data yang dikembalikan
  while (hasMore) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/contents/blogs?page=${page}&limit=${limit}`
    );
    const data = await res.json();
    const blogs = data?.data || [];

    // Gabungkan data dari halaman saat ini
    allBlogs = allBlogs.concat(blogs);

    // Cek apakah data masih ada di halaman berikutnya
    hasMore = blogs.length === limit;
    page++;
  }

  return allBlogs.map((blog: any) => ({
    slug: blog.slug,
  }));
}
