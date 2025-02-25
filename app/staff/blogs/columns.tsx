/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import { FileSearch, MoreHorizontal, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/staff-panel/delete-dialog";
import { format } from "date-fns";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { PencilRuler } from "lucide-react";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Blogs = {
  uuid: string;
  title: string;
  thumbnail: string;
  blog: {
    creator: { full_name: string };
  };
  updated_at: string;
  slug: string;
};

export const columns: ColumnDef<Blogs>[] = [
  {
    accessorKey: "No",
    header: () => {
      return <p>No</p>;
    },
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "thumbnail",
    header: () => <div className='text-right'>Image</div>,
    cell: ({ row }) => (
      <AspectRatio ratio={4 / 3} className='h-full relative'>
        <Image
          src={`${row.original.thumbnail}?t=${new Date().getTime()}`}
          alt='Image'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </AspectRatio>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=' line-clamp-3 break-words '>{row.original.title}</div>
      );
    },
  },
  {
    accessorKey: "creator",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creator
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.blog.creator.full_name;
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Release Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(row.original.updated_at, "dd MMM yyyy");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link href={`blogs/update?slug=${row.original.slug}`}>
                <DropdownMenuItem className='cursor-pointer'>
                  <PencilRuler className='mr-2' width={16} /> Edit
                </DropdownMenuItem>
              </Link>
              <Link href={`blogs/${row.original.slug}`}>
                <DropdownMenuItem className='cursor-pointer'>
                  <FileSearch className='mr-2' width={16} /> Detail
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
            pathApi={`/contents/audios/${row.original.uuid}`}
          />
        </div>
      );
    },
  },
];
