/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

import { ContentLayout } from "@/components/staff-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";
import React from "react";
import DeleteDialog from "@/components/staff-panel/delete-dialog";
import Image from "next/image";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
import { useGenre } from "@/hooks/use-genre";
import GenreEditForm from "@/components/staff-panel/forms/genre/genre-edit-form";
import GenreForm from "@/components/staff-panel/forms/genre/genre-form";
export default function GenresPage() {
  const [editUuid, setEditUuid] = React.useState<string | null>(null);
  const [deleteUuid, setDeleteUuid] = React.useState<string | null>(null);
  const { ref, inView } = useInView();
  const { genres, isLoading, isError, isLoadingMore, isReachingEnd, loadMore } =
    useGenre();

  // Trigger loadMore when the last element is visible
  React.useEffect(() => {
    if (inView && !isLoadingMore && !isReachingEnd) {
      loadMore();
    }
  }, [inView, isLoadingMore, isReachingEnd]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <ContentLayout title='Genres'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/dashboard'>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Genres</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className='py-12 space-y-8'>
        <div className='flex flex-col items-start md:items-center md:flex-row justify-between gap-4'>
          <div>
            <p className='font-bold text-4xl'>Genres</p>
            <p className='text-sm'>
              Genres are a way to categorize content. They are used to help
              users find content that they are interested in.
            </p>
          </div>
          <GenreForm />
        </div>
        <div className='z-30 grid gap-6 md:grid-cols-3 lg:grid-cols-4'>
          {genres?.map((genre: any) => (
            <div
              key={genre.uuid}
              className='flex flex-col gap-10 rounded-lg border bg-background p-8'
            >
              <div>
                <div className='h-10 w-10 relative'>
                  {genre?.avatar ? (
                    <Image
                      src={genre.avatar}
                      alt='avatar genres'
                      layout='fill'
                      objectFit='cover'
                      priority={false}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <h3 className='mb-1 mt-2 font-medium'>{genre.name}</h3>
                <p className='text-sm text-muted-foreground line-clamp-3'>
                  {genre.description}
                </p>
              </div>
              <div className='w-full grow flex items-end'>
                <Button onClick={() => setEditUuid(genre.uuid)}>Edit</Button>
                <Button
                  variant='link'
                  onClick={() => setDeleteUuid(genre.uuid)}
                >
                  Delete
                </Button>
              </div>
              <GenreEditForm
                isEditDialogOpen={editUuid === genre.uuid}
                setIsEditDialogOpen={() => setEditUuid(null)}
                values={genre}
              />
              <DeleteDialog
                open={deleteUuid === genre.uuid}
                onOpenChange={() => setDeleteUuid(null)}
                pathApi={`/genres/${genre.uuid}`}
              />
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <div ref={ref} className='w-full py-4 flex justify-center'>
          {!isReachingEnd &&
            (isLoadingMore ? <p>Loading more...</p> : <p>Scroll for more</p>)}
          {isReachingEnd && <p>No more tags to load</p>}
        </div>
      </section>
    </ContentLayout>
  );
}
