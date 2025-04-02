/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  CircleOff,
  FileSearch,
  MoreHorizontal,
  Paperclip,
  Signature,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown } from "lucide-react";
import React from "react";
import Image from "next/image";
import DeleteDialog from "@/components/staff-panel/delete-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import ApprovedDialog from "@/components/staff-panel/approve-dialog";
import RejectDialog from "@/components/staff-panel/reject-dialog";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Report = {
  uuid: string;
  title: string;
  thumbnail: string;
  description: string;
  prakerin: {
    pages: number;
    file_attachment: { file: string };
    creator: { name: string; major: { name: string } };
    published_at: Date;
  };
  status: string;
  slug: string;
};

export const columns: ColumnDef<Report>[] = [
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
      <AspectRatio ratio={3 / 4} className='h-full relative'>
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
      return row.original.prakerin.creator.name;
    },
  },
  {
    accessorKey: "major",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Major
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.prakerin.creator.major.name;
    },
  },
  {
    accessorKey: "pages",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pages
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.prakerin.pages;
    },
  },
  {
    accessorKey: "file",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          File
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <a
          href={`${
            row.original.prakerin.file_attachment.file
          }?t=${new Date().getTime()}`}
          className='text-pink-600 items-center flex gap-2'
        >
          <Paperclip width={16} />
          .pdf
        </a>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.status === "pending" ? (
        <Badge className='bg-yellow-500 text-white' variant={"outline"}>
          {row.original.status}
        </Badge>
      ) : row.original.status === "approved" ? (
        <Badge className='bg-green-500 text-white' variant={"outline"}>
          {row.original.status}
        </Badge>
      ) : (
        <Badge className='bg-red-500 text-white' variant={"outline"}>
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [approveOpen, setApproveOpen] = React.useState(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [rejectOpen, setRejectOpen] = React.useState(false);
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
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => setApproveOpen(true)}
              >
                <Signature className='mr-2' width={16} /> Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => setRejectOpen(true)}
              >
                <CircleOff className='mr-2' width={16} /> Reject
              </DropdownMenuItem>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link href={`/staff/student-works/prakerin/${row.original.slug}`}>
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
            pathApi={`/contents/prakerin/${row.original.uuid}`}
          />

          <ApprovedDialog
            open={approveOpen}
            onOpenChange={setApproveOpen}
            pathApi={`/contents/${row.original.uuid}`}
          />
          <RejectDialog
            open={rejectOpen}
            onOpenChange={setRejectOpen}
            pathApi={`/contents/${row.original.uuid}`}
          />
        </div>
      );
    },
  },
];
