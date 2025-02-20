/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ContentCard from "@/components/content-card";
import TabsStatus from "@/components/tabs-status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { useAudioByStudent, useAudioSummaryByStudent } from "@/hooks/use-audio";
import withRole from "@/utils/with-role";
import { AudioLines, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteDialog from "@/components/staff-panel/delete-dialog";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
import { SummaryStats } from "@/components/summary-stats";

function AudioStudent() {
  const [contentStatus, setContentStatus] = useState("approved");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { audios, isLoading, isError, last_page } = useAudioByStudent({
    page: currentPage,
    limit: 10,
    status: contentStatus,
  });
  const {
    summary,
    isLoading: isLoadingSummary,
    isError: isErrorSummary,
  } = useAudioSummaryByStudent();

  const summaryItems = [
    {
      label: "Approved",
      value: summary?.approved || 0,
      variant: "success" as const,
    },
    {
      label: "Rejected",
      value: summary?.rejected || 0,
      variant: "danger" as const,
    },
    {
      label: "Pending",
      value: summary?.pending || 0,
      variant: "warning" as const,
    },
    {
      label: "Total",
      value:
        (summary?.approved || 0) +
        (summary?.rejected || 0) +
        (summary?.pending || 0),
      variant: "info" as const,
    },
  ];

  if (isLoading || isLoadingSummary) return <Loading />;
  if (isError || isErrorSummary) return <Error />;

  return (
    <ContentLayout title=''>
      <div className='flex flex-wrap justify-between items-center'>
        <div>
          <div>
            <Badge>Student Works</Badge>
          </div>
          <div className='flex gap-2 flex-col'>
            <h2 className='text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular'>
              The Voice of Yours!
            </h2>
            <p className='text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground'>
              Create your stories, ideas and inspiration.
            </p>
          </div>
        </div>
        <Link href={"audio-podcasts/create"}>
          <Button>
            <AudioLines width={18} /> Create audio
          </Button>
        </Link>
      </div>
      <SummaryStats items={summaryItems} />
      <TabsStatus status={contentStatus} onUpdateStatus={setContentStatus} />
      <div className='w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
        {audios.map((item: any) => {
          return (
            <div key={item.uuid} className='relative'>
              <ContentCard
                href={`audio-podcasts/${item.slug}`}
                variant='audio'
                imageSrc={item.thumbnail}
                title={item.title}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='absolute top-0 end-0 flex p-1 rounded-md transform translate-y-[-8px] translate-x-2 bg-white border dark:bg-neutral-900 dark:ring-neutral-900 items-center h-8 w-8'
                  >
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <Link href={`audio-podcasts/update?slug=${item.slug}`}>
                    <DropdownMenuItem className='cursor-pointer'>
                      <Pencil className='mr-2' width={16} /> Edit
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash2 className='mr-2' width={16} /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DeleteDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                pathApi={`/contents/audios/${item.uuid}`}
              />
            </div>
          );
        })}
      </div>
      {last_page > 1 && (
        <div className='flex justify-center items-center mt-4'>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='mr-2'
          >
            Previous
          </Button>
          {last_page > 5 ? (
            <>
              {currentPage > 3 && (
                <>
                  <Button onClick={() => setCurrentPage(1)} className='mx-1'>
                    1
                  </Button>
                  {currentPage > 4 && <span className='mx-1'>...</span>}
                </>
              )}
              {Array.from({ length: Math.min(5, last_page) }, (_, index) => {
                const pageIndex = index + Math.max(1, currentPage - 2);
                if (pageIndex <= last_page) {
                  return (
                    <Button
                      key={pageIndex}
                      onClick={() => setCurrentPage(pageIndex)}
                      className={`mx-1 ${
                        currentPage === pageIndex
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {pageIndex}
                    </Button>
                  );
                }
                return null;
              })}
              {currentPage < last_page - 2 && (
                <>
                  {currentPage < last_page - 3 && (
                    <span className='mx-1'>...</span>
                  )}
                  <Button
                    onClick={() => setCurrentPage(last_page)}
                    className='mx-1'
                  >
                    {last_page}
                  </Button>
                </>
              )}
            </>
          ) : (
            Array.from({ length: last_page }, (_, index) => (
              <Button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className='mx-1'
                variant={currentPage === index + 1 ? "default" : "outline"}
              >
                {index + 1}
              </Button>
            ))
          )}
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, last_page))
            }
            disabled={currentPage === last_page}
            className='ml-2'
          >
            Next
          </Button>
        </div>
      )}
    </ContentLayout>
  );
}

export default withRole(AudioStudent, ["student"], "/auth/user/login");
