/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useContentByTag } from "@/hooks/use-content";
import { useTagByName } from "@/hooks/use-tag";

export default function Tags({ tag }: { tag: string }) {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState("ebooks");
  const limit = 25;

  const { contents, isError, isLoading } = useContentByTag(
    content,
    tag,
    page,
    limit
  );

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        !isLoading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  const handleTabChange = (newContent: string) => {
    setContent(newContent); // Update content type
    setPage(1); // Reset page to 1
  };

  const aspectRatios: { [key: string]: string } = {
    ebooks: "aspect-[3/4]",
    audios: "aspect-[1/1]",
    videos: "aspect-[4/3]",
    novels: "aspect-[3/4]",
  };
  const { tag: dataTag } = useTagByName(tag);

  if (isError) return <div>Error loading contents</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-4 md:items-center md:flex-row">
        <div>
          <p className="text-4xl font-bold">{dataTag?.name}</p>
          <p className="mt-2 text-sm">{dataTag?.description}</p>
        </div>
      </div>
      <Tabs defaultValue="ebooks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="ebooks" onClick={() => handleTabChange("ebooks")}>
            eBooks
          </TabsTrigger>
          <TabsTrigger value="novels" onClick={() => handleTabChange("novels")}>
            Novels
          </TabsTrigger>
          <TabsTrigger value="audios" onClick={() => handleTabChange("audios")}>
            Audio Podcasts
          </TabsTrigger>
          <TabsTrigger value="videos" onClick={() => handleTabChange("videos")}>
            Video Podcasts
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value={content}
          className={`"w-full grid gap-2 grid-cols-2 md:grid-cols-4 ${
            content === "videos" ? "" : "lg:grid-cols-6"
          }`}
        >
          {contents?.map((item: any) => (
            <div
              key={item.uuid}
              className={`pl-[20px] ${
                content === "videos" ? "max-w-[352px]" : "max-w-[250px]"
              }`}
            >
              <Link
                href={`${tag}/${content.slice(0, -1)}/${item.uuid}`}
                className="flex flex-col justify-between group"
              >
                <div className={`flex ${aspectRatios[content]} text-clip`}>
                  <div className="flex-1">
                    <div className="relative transition duration-300 origin-bottom size-full group-hover:scale-105">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-4 mb-2 text-base font-semibold break-words line-clamp-3 md:mb-3 md:pt-4 lg:pt-4 lg:text-md">
                  {item.title}
                </div>
              </Link>
            </div>
          ))}
        </TabsContent>
      </Tabs>
      {isLoading && <p>Loading more...</p>}
    </div>
  );
}
