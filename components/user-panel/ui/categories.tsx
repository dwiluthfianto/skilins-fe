/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function Categories({ category }: { category: string }) {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState("ebooks");
  const limit = 25;
  const [loading, setLoading] = useState(false);

  const fetchContents = async () => {
    setLoading(true);
    const res = await axios.get(
      `/contents/${content}?category=${category}&page=${page}&limit=${limit}`
    );
    setContents((prev) => {
      const newEbooks = res.data.data.filter(
        (newItem: any) => !prev.some((item: any) => item.uuid === newItem.uuid)
      );
      return [...prev, ...newEbooks];
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchContents();
  }, [content, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const handleTabChange = (newContent: string) => {
    if (loading) return;
    setContent(newContent); // Update content type
    setContents([]); // Clear current ebooks
    setPage(1); // Reset page to 1
  };

  const aspectRatios: { [key: string]: string } = {
    ebooks: "aspect-[3/4]",
    audios: "aspect-[1/1]",
    videos: "aspect-[4/3]",
    novels: "aspect-[3/4]",
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start md:items-center md:flex-row justify-between gap-4">
        <div>
          <p className="font-bold text-4xl">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </p>
          <p className="text-sm mt-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
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
          {contents.map((item: any) => (
            <div
              key={item.uuid}
              className={`pl-[20px] ${
                content === "videos" ? "max-w-[352px]" : "max-w-[250px]"
              }`}
            >
              <Link
                href={`${item.category.toLowerCase()}/${content.slice(0, -1)}/${
                  item.uuid
                }`}
                className="group flex flex-col justify-between"
              >
                <div className={`flex ${aspectRatios[content]} text-clip`}>
                  <div className="flex-1">
                    <div className="relative size-full origin-bottom transition duration-300 group-hover:scale-105">
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
                <div className="mb-2 line-clamp-3 break-words pt-4 text-base font-semibold md:mb-3 md:pt-4 lg:pt-4 lg:text-md">
                  {item.title}
                </div>
              </Link>
            </div>
          ))}
        </TabsContent>
      </Tabs>
      {loading && <p>Loading more...</p>}
    </div>
  );
}
