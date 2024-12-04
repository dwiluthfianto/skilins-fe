/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { useVideo } from "@/hooks/use-video";
import { LoadingContent2 } from "./skeletons/skeleton-card";
import ContentCard from "@/components/content-card";

export function Videos() {
  const { videos, isLoading } = useVideo(1);
  if (isLoading) return <LoadingContent2 />;
  return (
    <section className="py-2">
      <div className="flex flex-col gap-10 mb-8">
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Badge>Contents</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              Video Podcasts
            </h2>
            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
              Navigating the Challenges, One Story at a Time.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full grid gap-2 grid-cols-2  lg:grid-cols-4">
        {videos.map((item: any) => {
          return (
            <ContentCard
              key={item.uuid}
              variant="video"
              href={`video-podcasts/${item.slug}`}
              imageSrc={item.thumbnail}
              title={item.title}
            />
          );
        })}
      </div>
    </section>
  );
}
