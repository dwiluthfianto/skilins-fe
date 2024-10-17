/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ContentLayout } from "@/components/user-panel/content-layout";

import React from "react";
import Image from "next/image";
import { useCategory } from "@/hooks/use-category";
import { Badge } from "@/components/ui/badge";

export default function CategoriesPage() {
  const { categories, isLoading, isError } = useCategory();

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error cuy</h1>;
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
                Categories
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                Categorizing Knowledge, Finding Your Passion.
              </p>
            </div>
          </div>
        </div>
        <div className="z-30 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {categories?.map((category: any) => (
            <a
              key={category.uuid}
              href={`categories/${category.name.toLowerCase()}`}
            >
              <div className="flex flex-col gap-10 rounded-lg border bg-background p-8">
                <div>
                  <div className="h-10 w-10 relative">
                    {category?.avatar_url ? (
                      <Image
                        src={category.avatar_url}
                        alt="avatar categories"
                        layout="fill"
                        objectFit="cover"
                        priority={false}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <h3 className="mb-1 mt-2 font-medium">{category.name}</h3>
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
