/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ContentLayout } from "@/components/user-panel/content-layout";

import React from "react";
import Image from "next/image";
import { useTag } from "@/hooks/use-tag";

export default function TagsPage() {
  const { tags, isLoading, isError } = useTag();

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error..</h1>;
  return (
    <ContentLayout title="Tags">
      <section className="py-4 space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 md:items-center md:flex-row">
          <div>
            <p className="text-4xl font-bold">Tags</p>
            <p className="mt-2 text-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
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
