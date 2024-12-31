'use client';
import DeleteDialog from '@/components/staff-panel/delete-dialog';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Binoculars, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function TableofContent({ episodes }: any) {
  const params = useParams<{ slug: string }>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const sortedEpisodes = episodes.sort((a: any, b: any) => b.order - a.order);

  return (
    <div>
      <Separator className='my-4' />
      <Link href={`${params.slug}/write`}>
        <Button>
          <Plus width={18} /> New Part
        </Button>
      </Link>
      <Separator className='my-4' />
      {sortedEpisodes.map((item: any) => {
        return (
          <div
            key={item.uuid}
            className='flex justify-between items-center mb-4'
          >
            <div className='flex flex-col gap-3'>
              <Link
                href={`${params.slug}/${item.order}`}
                className='hover:underline'
              >
                <h1 className='text-lg font-bold'>{item.title}</h1>
              </Link>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <p>Episode {item.order}</p>
                <span>-</span>
                <p> {format(item.created_at, 'MMM dd, yyyy')}</p>
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className=' bg-white border dark:bg-neutral-900 dark:ring-neutral-900 items-center h-8 w-8'
                  >
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <Link href={`/stories/${params.slug}/${item.order}`}>
                    <DropdownMenuItem className='cursor-pointer'>
                      <Binoculars className='mr-2' width={16} /> View as reader
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
                pathApi={`/contents/stories/episodes/${item.uuid}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
