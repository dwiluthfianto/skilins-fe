/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { LoadingContent } from "./skeletons/skeleton-card";
import { useBlog } from "@/hooks/use-blog";
import { ArrowRight } from "lucide-react";

export function Blogs() {
  const { blogs, isLoading } = useBlog(1);

  if (isLoading) return <LoadingContent />;
  return (
    <section className="py-2">
      <div className="flex flex-col gap-10 mb-8">
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Badge>Contents</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              e-Books
            </h2>
            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
              Portable Wisdom, Endless Possibilities.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {blogs?.map((item: any) => {
          return (
            <div key={item.uuid} className="pl-[20px] md:max-w-[452px]">
              <a
                href={`blogs/${item.slug}`}
                className="group flex flex-col justify-between"
              >
                <div>
                  <div className="flex aspect-[3/2] text-clip rounded-xl">
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
                </div>
                <div className="mb-2 line-clamp-3 break-words pt-4 text-base font-semibold md:mb-3 md:pt-4 lg:pt-4 lg:text-md">
                  {item.title}
                </div>
                <div className="flex items-center text-sm">
                  Read more{" "}
                  <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
