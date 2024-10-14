/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import { FileText, MoreHorizontal, PencilRuler, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import Image from "next/image";
import DeleteDialog from "@/components/admin-panel/delete-dialog";
import ReportEditForm from "@/components/admin-panel/forms/report/report-edit-form";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Report = {
  uuid: string;
  thumbnail: string;
  author: string;
  title: string;
  description: string;
  category: string;
  pages: number;
  major: string;
  subjects: string[];
  file_url: string;
  published_at: string;
  tags: string[];
};

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => (
      <Image
        src={`${row.original.thumbnail}?t=${new Date().getTime()}`}
        alt="Image"
        className=" object-cover"
        width={96}
        height={96}
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
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "major",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Major
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
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
    accessorKey: "pages",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pages
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "subjects",
    header: "Subjects",
    cell: ({ row }) => {
      return row.original.subjects.join(", ");
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      return row.original.tags.map((tag: any) => tag?.name).join(", ");
    },
  },
  {
    accessorKey: "file_url",
    header: "Report File",
    cell: ({ row }) => {
      return (
        <a
          href={`${row.original.file_url}?t=${new Date().getTime()}`}
          className="text-pink-600 items-center flex gap-2"
        >
          <FileText width={16} />
          .pdf
        </a>
      );
    },
  },

  {
    accessorKey: "published_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(row.original.published_at, "dd MMM yyyy");
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
                <PencilRuler className="mr-2" width={16} /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="mr-2" width={16} /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ReportEditForm
            isEditDialogOpen={isEditDialogOpen}
            setIsEditDialogOpen={setIsEditDialogOpen}
            values={row.original}
          />
          <DeleteDialog
            isDeleteDialogOpen={isDeleteDialogOpen}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            pathApi={`/contents/reports/${row.original.uuid}`}
          />
        </div>
      );
    },
  },
];
