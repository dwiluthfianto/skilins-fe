/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import { FileSearch, MoreHorizontal, PencilRuler, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/staff-panel/delete-dialog";
import Link from "next/link";
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Competitions = {
  uuid: string;
  thumbnail: string;
  title: string;
  slug: string;
  type: string;
  start_date: Date;
  end_date: Date;
  submission_deadline: Date;
};

export const columns: ColumnDef<Competitions>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title of Competition
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
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(row.original.start_date, "dd MMM yyyy");
    },
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(row.original.end_date, "dd MMM yyyy");
    },
  },
  {
    accessorKey: "submission_deadline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submission Deadline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(row.original.submission_deadline, "dd MMM yyyy");
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
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link
                href={`/staff/competitions/${row.original.type.toLowerCase()}/${
                  row.original.slug
                }`}
              >
                <DropdownMenuItem className="cursor-pointer">
                  <FileSearch className="mr-2" width={16} /> Detail
                </DropdownMenuItem>
              </Link>
              <Link href={`/staff/`}>
                <DropdownMenuItem className="cursor-pointer">
                  <PencilRuler className="mr-2" width={16} /> Edit
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
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            pathApi={`/competitions/${row.original.uuid}`}
          />
        </div>
      );
    },
  },
];
