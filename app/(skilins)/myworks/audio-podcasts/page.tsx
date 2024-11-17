/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ContentCard from "@/components/content-card";
import TabsStatus from "@/components/tabs-status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { useUserAudio } from "@/hooks/use-audio";
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

function AudioStudent() {
  const [contentStatus, setContentStatus] = useState("APPROVED");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { audios, isLoading, isError } = useUserAudio(1, 10, contentStatus);

  if (isLoading) return <h1>loading..</h1>;
  if (isError) return <h1>error..</h1>;

  return (
    <ContentLayout title="">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <div>
            <Badge>Student Works</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
              The Voice of Yours!
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
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
      <TabsStatus status={contentStatus} onUpdateStatus={setContentStatus} />
      <div className="w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {audios.map((item: any) => {
          return (
            <div key={item.uuid} className="relative">
              <ContentCard
                className="max-w-[250px]"
                href={`audio-podcasts/${item.slug}`}
                aspectRatio="aspect-[1/1]"
                imageSrc={item.thumbnail}
                title={item.title}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="absolute top-0 end-0 flex p-1 rounded-md transform translate-y-[-8px] translate-x-2 bg-white border dark:bg-neutral-900 dark:ring-neutral-900 items-center h-8 w-8"
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <Link href={`audio-podcasts/update?slug=${item.slug}`}>
                    <DropdownMenuItem className="cursor-pointer">
                      <Pencil className="mr-2" width={16} /> Edit
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash2 className="mr-2" width={16} /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DeleteDialog
                isDeleteDialogOpen={isDeleteDialogOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                pathApi={`/contents/audios/${item.uuid}`}
              />
            </div>
          );
        })}
      </div>
    </ContentLayout>
  );
}

export default withRole(AudioStudent, ["Student"], "/auth/user/login");
