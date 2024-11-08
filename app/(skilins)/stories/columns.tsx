"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Episode = {
  uuid: string;
  order: number;
  title: string;
  created_at: Date;
};

export const columns: ColumnDef<Episode>[] = [
  {
    accessorKey: "order",
    header: "",
    cell: ({ row }) => (
      <p className="line-clamp-1 break-words">
        Chapter {row.original.order}. {row.original.title}
      </p>
    ),
  },
  {
    accessorKey: "created_at",
    header: "",
    cell: ({ row }) => format(row.original.created_at, "EEEE, dd MMM yyyy"),
  },
];
