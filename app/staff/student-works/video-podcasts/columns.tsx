/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import { FilePenLine, MoreHorizontal, Trash2, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import DeleteDialog from "@/components/staff-panel/delete-dialog";
import VideoEditForm from "@/components/staff-panel/forms/video/video-edit-form";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Video = {
  uuid: string;
  title: string;
  thumbnail: string;
  genres: string[];
  category: string;
  creator: string;
  duration: number;
  file_url: string;
  tags: string[];
};

export const columns: ColumnDef<Video>[] = [
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
    header: () => <div className="text-right">Image</div>,
    cell: ({ row }) => (
      <Image
        key={row.original.thumbnail}
        src={`${row.original.thumbnail}`}
        alt="Image"
        width={120}
        height={100}
        objectFit="cover"
        objectPosition="center"
      />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=" line-clamp-3 break-words ">{row.original.title}</div>
      );
    },
  },
  {
    accessorKey: "genres",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Genres
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.genres.map((genre: any) => genre?.text).join(", ");
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "creator",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creator
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tags
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.tags.map((tag: any) => tag?.text).join(", ");
    },
  },
  {
    accessorKey: "file_url",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          File
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <a
          key={row.original.file_url}
          href={`${row.original.file_url}`}
          className="text-pink-600 items-center flex gap-2"
        >
          <Youtube width={16} />
          Youtube
        </a>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <FilePenLine className="mr-2" width={16} /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="mr-2" width={16} /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <VideoEditForm
            isEditDialogOpen={isEditDialogOpen}
            setIsEditDialogOpen={setIsEditDialogOpen}
            values={row.original}
          />
          <DeleteDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            pathApi={`/contents/videos/${row.original.uuid}`}
          />
        </div>
      );
    },
  },
];
