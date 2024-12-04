/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  CircleOff,
  FileSearch,
  MoreHorizontal,
  Signature,
  Trash2,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import DeleteDialog from '@/components/staff-panel/delete-dialog';
import ApproveDialog from '@/components/staff-panel/approve-dialog';
import RejectDialog from '@/components/staff-panel/reject-dialog';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Stories = {
  uuid: string;
  title: string;
  thumbnail: string;
  description: string;
  genres: string[];
  category: string;
  creator: string;
  tags: string[];
  status: string;
};

export const columns: ColumnDef<Stories>[] = [
  {
    accessorKey: 'thumbnail',
    header: 'Thumbnail',
    cell: ({ row }) => (
      <Image
        key={row.original.thumbnail}
        src={`${row.original.thumbnail}`}
        alt='Image'
        className=' object-cover'
        width={96}
        height={96}
      />
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'creator',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Creator
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'genres',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Genres
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.genres.map((genre: any) => genre?.text).join(', ');
    },
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tags
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.tags.map((tag: any) => tag?.text).join(', ');
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    id: 'actions',
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
              <DropdownMenuItem className='cursor-pointer'>
                <FileSearch className='mr-2' width={16} /> Detail
              </DropdownMenuItem>
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
            pathApi={`/contents/stories/${row.original.uuid}`}
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
