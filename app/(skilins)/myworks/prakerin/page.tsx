/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContentLayout } from '@/components/user-panel/content-layout';
import withRole from '@/utils/with-role';
import {
  MoreHorizontal,
  Pencil,
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
import { Card, CardContent } from '@/components/ui/card';
import { useUserReport } from '@/hooks/use-report';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

function PrakerinStudent() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { prakerin, isLoading, isError } = useUserReport(1, 1);

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
              The Prakerin Report!
            </h2>
          </div>
        </div>
      </div>

      {prakerin.length > 0 ? (
        prakerin.map((item: any) => {
          return (
            <Card
              className='max-w-2xl mx-auto rounded-sm my-12'
              key={item.uuid}
            >
              <CardContent className='pt-6 flex flex-col justify-center items-center'>
                <div className='w-80 h-fit relative'>
                  <div>
                    <Button
                      variant='default'
                      className='absolute top-0 start-0 flex p-1 rounded-md transform  z-10 translate-y-[-8px] translate-x-0 items-center'
                    >
                      {item.status}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          className='absolute top-0 end-0 flex p-1 rounded-md transform  z-50 translate-y-[-8px] translate-x-2 bg-white border dark:bg-neutral-900 dark:ring-neutral-900 items-center h-8 w-8'
                        >
                          <span className='sr-only'>Open menu</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link href={`prakerin/update?slug=${item.slug}`}>
                          <DropdownMenuItem className='cursor-pointer'>
                            <Pencil className='mr-2' width={16} /> Edit
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
                      pathApi={`/contents/prakerin/${item.uuid}`}
                    />
                  </div>
                  <AspectRatio ratio={3 / 4}>
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      layout='fill'
                      objectFit='cover'
                      objectPosition='center'
                      className='rounded-md'
                    />
                  </AspectRatio>
                  <h1 className='text-center font-bold text-xl capitalize'>
                    {item.title}
                  </h1>
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <>
          <Card className='max-w-2xl mx-auto rounded-sm my-5'>
            <CardContent className='pt-6 flex flex-col justify-center items-center'>
              <div className='flex items-center text-center justify-center'>
                <SquareLibrary className='w-32 h-32 md:w-52 md:h-52 text-muted-foreground' />
              </div>
              <p className='text-center font-semibold text-xl text-muted-foreground'>{`Hi, You haven't written any prakerin report yet.`}</p>
              <Link href={'prakerin/create'} className='mt-4'>
                <Button>
                  <Plus width={18} /> Add Prakerin Report
                </Button>
              </Link>
            </CardContent>
          </Card>
        </>
      )}
    </ContentLayout>
  );
}

export default withRole(PrakerinStudent, ['Student'], '/auth/user/login');
