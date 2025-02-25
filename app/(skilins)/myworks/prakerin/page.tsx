/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/user-panel/content-layout";
import withRole from "@/utils/with-role";
import {
  CircleOff,
  Loader,
  MoreHorizontal,
  PencilRuler,
  Plus,
  Signature,
  SquareLibrary,
  Trash2,
} from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
import { useReportByStudent } from "@/hooks/use-report";
function PrakerinStudent() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { prakerin, isLoading, isError } = useReportByStudent();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <ContentLayout title=''>
      <div className='flex flex-wrap justify-between items-center'>
        <div>
          <div>
            <Badge>Student Works</Badge>
          </div>
          <div className='flex gap-2 flex-col'>
            <h2 className='text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular'>
              The Prakerin Report!
            </h2>
          </div>
        </div>
      </div>

      {prakerin ? (
        <Card
          className='max-w-2xl mx-auto rounded-sm my-12'
          key={prakerin.uuid}
        >
          <CardContent className='pt-6 flex flex-col justify-center items-center'>
            <div className='w-80 h-fit relative'>
              {prakerin.status === "pending" ? (
                <Badge
                  className='bg-yellow-600 p-2 text-white transition-transform transform hover:scale-105'
                  variant={"outline"}
                >
                  <Loader width={18} className='mr-2 animate-spin' />
                  {prakerin.status}
                </Badge>
              ) : prakerin.status === "approved" ? (
                <Badge
                  className='bg-green-600 text-white p-2 transition-transform transform hover:scale-105'
                  variant={"outline"}
                >
                  <Signature width={18} className='mr-2' />
                  {prakerin.status}
                </Badge>
              ) : (
                <Badge
                  className='bg-red-600 text-white p-2 transition-transform transform hover:scale-105'
                  variant={"destructive"}
                >
                  <CircleOff width={18} className='mr-2' />
                  {prakerin.status}
                </Badge>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='absolute top-0 end-0 flex p-1 rounded-md transform  z-10 translate-y-[-8px] translate-x-2 bg-white border dark:bg-neutral-900 dark:ring-neutral-900 items-center h-8 w-8'
                  >
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <Link href={`prakerin/update?slug=${prakerin.slug}`}>
                    <DropdownMenuItem className='cursor-pointer'>
                      <PencilRuler className='mr-2' width={16} /> Edit
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
                pathApi={`/contents/prakerin/${prakerin.uuid}`}
              />
              <AspectRatio ratio={3 / 4}>
                <Image
                  src={prakerin.thumbnail}
                  alt={prakerin.title}
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                  className='rounded-md'
                />
              </AspectRatio>
              <h1 className='text-center font-bold text-xl capitalize'>
                {prakerin.title}
              </h1>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className='max-w-2xl mx-auto rounded-sm my-5'>
            <CardContent className='pt-6 flex flex-col justify-center items-center'>
              <div className='flex items-center text-center justify-center'>
                <SquareLibrary className='w-32 h-32 md:w-52 md:h-52 text-muted-foreground' />
              </div>
              <p className='text-center font-semibold text-xl text-muted-foreground'>{`Hi, You haven't written any prakerin report yet.`}</p>
              <Link href={"prakerin/create"} className='mt-4'>
                <Button>
                  <Plus width={18} /> Add Prakerin Report
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      )}
    </ContentLayout>
  );
}

export default withRole(PrakerinStudent, ["student"], "/auth/user/login");
