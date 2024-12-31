/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ContentCard from '@/components/content-card';
import TabsStatus from '@/components/tabs-status';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContentLayout } from '@/components/user-panel/content-layout';
import withRole from '@/utils/with-role';
import {
  Binoculars,
  LibrarySquare,
  MoreHorizontal,
  Plus,
  SquareLibrary,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DeleteDialog from '@/components/staff-panel/delete-dialog';
import { useUserStory } from '@/hooks/use-story';
import { Card, CardContent } from '@/components/ui/card';

function StoryStudent() {
  const [contentStatus, setContentStatus] = useState('APPROVED');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { stories, isLoading, isError } = useUserStory(1, 10, contentStatus);

  if (isLoading) return <h1>loading..</h1>;
  if (isError) return <h1>error..</h1>;

  return (
    <ContentLayout title=''>
      <div className='flex flex-wrap justify-between items-center'>
        <div>
          <div>
            <Badge>Student Works</Badge>
          </div>
          <div className='flex gap-2 flex-col'>
            <h2 className='text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular'>
              The Stories of Yours!
            </h2>
            <p className='text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground'>
              Create your stories, ideas and inspiration.
            </p>
          </div>
        </div>
        <Link href={'stories/create'}>
          <Button>
            <LibrarySquare width={18} /> Create story
          </Button>
        </Link>
      </div>
      <TabsStatus status={contentStatus} onUpdateStatus={setContentStatus} />
      {stories.length > 0 ? (
        <div className='w-full grid gap-2 grid-cols-2 md:grid-cols-5'>
          {stories.map((item: any) => {
            return (
              <div key={item.uuid} className='relative max-w-[250px]'>
                <ContentCard
                  href={`stories/${item.slug}`}
                  variant='default'
                  imageSrc={item.thumbnail}
                  title={item.title}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='absolute top-0 end-0 flex p-1 rounded-md transform translate-y-[-8px] translate-x-2 bg-white border dark:bg-neutral-900 dark:ring-neutral-900 items-center h-8 w-8'
                    >
                      <span className='sr-only'>Open menu</span>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Link href={`/stories/${item.slug}`}>
                      <DropdownMenuItem className='cursor-pointer'>
                        <Binoculars className='mr-2' width={16} /> View as
                        reader
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
                  pathApi={`/contents/stories/${item.uuid}`}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <Card className='max-w-2xl mx-auto rounded-sm'>
            <CardContent className='pt-6 flex flex-col justify-center items-center'>
              <div className='flex items-center text-center justify-center'>
                <SquareLibrary className='w-32 h-32 md:w-52 md:h-52 text-muted-foreground' />
              </div>
              <p className='text-center font-semibold text-xl text-muted-foreground'>{`Hi, You haven't written any stories yet.`}</p>
              <Link href={'stories/create'} className='mt-4'>
                <Button>
                  <Plus width={18} /> Create story
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      )}
    </ContentLayout>
  );
}

export default withRole(StoryStudent, ['Student'], '/auth/user/login');
