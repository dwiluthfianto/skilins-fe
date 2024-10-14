/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ContentLayout } from "@/components/user-panel/content-layout";

import React from "react";
import Image from "next/image";
import { useCategory } from "@/hooks/use-category";

export default function CategoriesPage() {
  const { categories, isLoading, isError } = useCategory();

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error cuy</h1>;
  return (
    <ContentLayout title="categories">
      <section className="py-4 space-y-8">
        <div className="flex flex-col items-start md:items-center md:flex-row justify-between gap-4">
          <div>
            <p className="font-bold text-4xl">Categories</p>
            <p className="text-sm mt-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
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
