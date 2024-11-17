/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  CircleOff,
  FileAudio,
  FileSearch,
  MoreHorizontal,
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React from "react";
import DeleteDialog from "@/components/staff-panel/delete-dialog";
import ApproveDialog from "@/components/staff-panel/approve-dialog";
import RejectDialog from "@/components/staff-panel/reject-dialog";
import { Badge } from "@/components/ui/badge";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Audio = {
  uuid: string;
  title: string;
  thumbnail: string;
  description: string;
  genres: string[];
  category: string;
  creator: string;
  duration: number;
  file_url: string;
  tags: string[];
  status: string;
};

export const columns: ColumnDef<Audio>[] = [
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
      <AspectRatio ratio={4 / 3} className="h-full relative">
        <Image
          src={`${row.original.thumbnail}?t=${new Date().getTime()}`}
          alt="Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </AspectRatio>
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
    accessorKey: "duration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Duration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return new Date(1000 * row.original.duration)
        .toISOString()
        .substring(11, 19)
        .replace(/^[0:]+/, "");
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
      return row.original.tags.map((genre: any) => genre?.text).join(", ");
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
          href={`${row.original.file_url}?t=${new Date().getTime()}`}
          className="text-pink-600 items-center flex gap-2"
        >
          <FileAudio width={16} />
          .mp3
        </a>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.status === "PENDING" ? (
        <Badge className="bg-yellow-500 text-white" variant={"outline"}>
          {row.original.status}
        </Badge>
      ) : row.original.status === "APPROVED" ? (
        <Badge className="bg-green-500 text-white" variant={"outline"}>
          {row.original.status}
        </Badge>
      ) : (
        <Badge className="bg-red-500 text-white" variant={"outline"}>
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
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setApproveOpen(true)}
              >
                <Signature className="mr-2" width={16} /> Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setRejectOpen(true)}
              >
                <CircleOff className="mr-2" width={16} /> Reject
              </DropdownMenuItem>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">
                <FileSearch className="mr-2" width={16} /> Detail
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2" width={16} /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            pathApi={`/contents/audios/${row.original.uuid}`}
          />

          <ApproveDialog
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
