/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";
import { useTag } from "@/hooks/use-tag";
import React from "react";
import DeleteDialog from "@/components/admin-panel/delete-dialog";
import TagForm from "@/components/admin-panel/forms/tag/tag-form";
import Image from "next/image";
import TagEditForm from "@/components/admin-panel/forms/tag/tag-edit-form";

export default function TagsPage() {
  const [editUuid, setEditUuid] = React.useState<string | null>(null);
  const [deleteUuid, setDeleteUuid] = React.useState<string | null>(null);
  const { tags, isLoading, isError } = useTag();

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error cuy</h1>;
  return (
    <ContentLayout title="Tags">
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
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tags</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="py-12 space-y-8">
        <div className="flex flex-col items-start md:items-center md:flex-row justify-between gap-4">
          <div>
            <p className="font-bold text-4xl">Tags</p>
            <p className="text-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <TagForm />
        </div>
        <div className="z-30 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {tags?.map((tag: any) => (
            <div
              key={tag.uuid}
              className="flex flex-col gap-10 rounded-lg border bg-background p-8"
            >
              <div>
                <div className="h-10 w-10 relative">
                  <Image
                    src={tag.avatar_url}
                    alt="avatar tags"
                    layout="fill"
                    objectFit="cover"
                    priority={false}
                  />
                </div>
                <h3 className="mb-1 mt-2 font-medium">#{tag.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {tag.description}
                </p>
              </div>
              <div className="w-full grow flex items-end">
                <Button onClick={() => setEditUuid(tag.uuid)}>Edit</Button>
                <Button variant="link" onClick={() => setDeleteUuid(tag.uuid)}>
                  Delete
                </Button>
              </div>
              <TagEditForm
                isEditDialogOpen={editUuid === tag.uuid}
                setIsEditDialogOpen={() => setEditUuid(null)}
                values={tag}
              />
              <DeleteDialog
                isDeleteDialogOpen={deleteUuid === tag.uuid}
                setIsDeleteDialogOpen={() => setDeleteUuid(null)}
                pathApi={`/tags/${tag.uuid}`}
              />
            </div>
          ))}
        </div>
      </section>
    </ContentLayout>
  );
}
