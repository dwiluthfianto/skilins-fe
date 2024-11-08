/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ContentLayout } from "@/components/user-panel/content-layout";

import Image from "next/image";
import { useTag } from "@/hooks/use-tag";
import { Badge } from "@/components/ui/badge";

export default function TagsPage() {
  const { tags, isLoading, isError } = useTag();

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error..</h1>;
  return (
    <ContentLayout title="">
      <section className="py-4 space-y-8">
        <div className="flex flex-col gap-10 mb-8">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Groups</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Tags
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                Linking Ideas, Creating Connections.
              </p>
            </div>
          </div>
        </div>
        <div className="z-30 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {tags?.map((category: any) => (
            <a key={category.uuid} href={`tags/${category.name}`}>
              <div className="flex flex-col gap-10 p-8 border rounded-lg bg-background">
                <div>
                  <div className="relative w-10 h-10">
                    {category?.avatar_url ? (
                      <Image
                        src={category.avatar_url}
                        alt="avatar tags"
                        layout="fill"
                        objectFit="cover"
                        priority={false}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <h3 className="mt-2 mb-1 font-medium">#{category.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {category.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </ContentLayout>
  );
}
