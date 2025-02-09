/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { FilePenLine, MoreHorizontal, Trash2 } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { ContentLayout } from '@/components/staff-panel/content-layout';
import Link from 'next/link';
import { useMajor } from '@/hooks/use-major';
import Image from 'next/image';
import React from 'react';
import MajorForm from '@/components/staff-panel/forms/major/major-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import DeleteDialog from '@/components/staff-panel/delete-dialog';
import MajorEditForm from '@/components/staff-panel/forms/major/major-edit-form';

function Majors() {
  const [editUuid, setEditUuid] = React.useState<string | null>(null);
  const [deleteUuid, setDeleteUuid] = React.useState<string | null>(null);

  const { major, isLoading, isError } = useMajor();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Major page error</h1>;
  return (
    <ContentLayout title='Dashboard'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/dashboard'>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Majors</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>
        <div className='flex flex-col py-6 items-start md:items-center md:flex-row justify-between gap-4'>
          <div>
            <p className='font-bold text-4xl'>Majors</p>
            <p className='text-sm'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <MajorForm />
        </div>
        <div>
          <div className='flex flex-col items-center gap-6 text-center'>
            <div className='mt-2 grid w-full grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {major?.map((m: any) => (
                <Card key={m.uuid} className='w-full relative'>
                  <CardHeader className='pb-1 flex flex-row items-center justify-between'>
                    <div className='h-10 w-10 relative'>
                      <Image
                        src={`${m.avatar}?t=${new Date().getTime()}`}
                        alt='avatar tags'
                        layout='fill'
                        objectFit='cover'
                        priority={false}
                      />
                    </div>
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

                          <DropdownMenuItem onClick={() => setEditUuid(m.uuid)}>
                            <FilePenLine className='mr-2' width={16} /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteUuid(m.uuid)}
                          >
                            <Trash2 className='mr-2' width={16} /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <MajorEditForm
                        isEditDialogOpen={editUuid === m.uuid}
                        setIsEditDialogOpen={() => setEditUuid(null)}
                        values={m}
                      />
                      <DeleteDialog
                        open={deleteUuid === m.uuid}
                        onOpenChange={() => setDeleteUuid(null)}
                        pathApi={`/majors/${m.uuid}`}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className='text-left'>
                    <h2 className='mb-1 text-lg font-semibold'>{m.name}</h2>
                    <p className='leading-snug text-muted-foreground truncate'>
                      {m.description}
                    </p>
                  </CardContent>
                  <CardFooter className='justify-end pb-0 pr-0'>
                    <div className='h-40 w-full relative'>
                      {m.image_url ? (
                        <Image
                          className='rounded-tl-md'
                          src={`${m.image_url}?t=${new Date().getTime()}`}
                          layout='fill'
                          objectFit='cover'
                          objectPosition='center'
                          alt='Major image'
                        />
                      ) : null}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
}

export default Majors;
