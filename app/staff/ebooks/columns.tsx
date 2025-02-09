/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ColumnDef } from '@tanstack/react-table';

import { FileSearch, FileText, MoreHorizontal, Trash2 } from 'lucide-react';

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
import { format } from 'date-fns';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type eBooks = {
  uuid: string;
  thumbnail: string;
  title: string;
  slug: string;
  category: { name: string };
  ebook: {
    author: string;
    category: string;
    publication: string;
    isbn: string;
    pages: number;
    release_date: Date;
    file_attachment: {
      file: string;
    };
  };
};

export const columns: ColumnDef<eBooks>[] = [
  {
    accessorKey: 'No',
    header: () => {
      return <p>No</p>;
    },
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: 'thumbnail',
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
    cell: ({ row }) => {
      return (
        <div className=' line-clamp-3 break-words '>{row.original.title}</div>
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
    cell: ({ row }) => {
      return row.original.category.name;
    },
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
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.ebook.author;
    },
  },
  {
    accessorKey: 'isbn',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ISBN
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.ebook.isbn;
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
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.ebook.pages;
    },
  },
  {
    accessorKey: 'publication',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Publication
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.ebook.publication;
    },
  },
  {
    accessorKey: 'file',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
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
            row.original.ebook.file_attachment.file
          }?t=${new Date().getTime()}`}
          className='text-pink-600 items-center flex gap-2'
        >
          <FileText width={16} />
          .pdf
        </a>
      );
    },
  },
  {
    accessorKey: 'release_date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Release Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(row.original.ebook.release_date, 'dd MMM yyyy');
    },
  },

  {
    id: 'actions',
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
            pathApi={`/contents/audios/${row.original.uuid}`}
          />
        </div>
      );
    },
  },
];
