/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, PencilRuler, Trash2 } from "lucide-react";

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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Judges = {
  uuid: string;
  full_name: string;
  email: string;
  role: string;
  linkedin: string;
  instagram: string;
  competition: string;
};

export const columns: ColumnDef<Judges>[] = [
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=" line-clamp-3 break-words ">
          {row.original.full_name}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "linkedin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Linkedin
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "instagram",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Instagram
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "competition",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Competition
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
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
              <Link href={``}>
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
            pathApi={`/judges/${row.original.uuid}`}
          />
        </div>
      );
    },
  },
];
