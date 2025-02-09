/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ColumnDef } from '@tanstack/react-table';

import { FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import React from 'react';

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
  file: string;
  published_at: string;
  tags: string[];
};

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'author',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Author
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'major',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Major
          <ArrowUpDown className='w-4 h-4 ml-2' />
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
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'pages',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pages
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
  },

  {
    accessorKey: 'file',
    header: 'Report File',
    cell: ({ row }) => {
      return (
        <a
          href={`${row.original.file}?t=${new Date().getTime()}`}
          className='flex items-center gap-2 text-pink-600'
        >
          <FileText width={16} />
          .pdf
        </a>
      );
    },
  },

  {
    accessorKey: 'published_at',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Published At
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(row.original.published_at, 'dd MMM yyyy');
    },
  },
];
