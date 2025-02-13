/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Link from 'next/link';

import { ContentLayout } from '@/components/staff-panel/content-layout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { Button } from '@/components/ui/button';
import React from 'react';
import DeleteDialog from '@/components/staff-panel/delete-dialog';
import Image from 'next/image';
import { useCategory } from '@/hooks/use-category';
import CategoryForm from '@/components/staff-panel/forms/category/category-form';
import CategoryEditForm from '@/components/staff-panel/forms/category/category-edit-form';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';
export default function CategoriesPage() {
  const [editCategoryUuid, setEditCategoryUuid] = React.useState<string | null>(
    null
  );
  const [deleteCategoryUuid, setDeleteCategoryUuid] = React.useState<
    string | null
  >(null);

  const { categories, isLoading, isError } = useCategory();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <ContentLayout title='categories'>
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
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className='py-12 space-y-8'>
        <div className='flex flex-col items-start md:items-center md:flex-row justify-between gap-4'>
          <div>
            <p className='font-bold text-4xl'>Categories</p>
            <p className='text-sm'>
              Categorizing Knowledge, Finding Your Passion.
            </p>
          </div>
          <CategoryForm />
        </div>
        <div className='z-30 grid gap-6 md:grid-cols-3 lg:grid-cols-4'>
          {categories?.map((category: any) => (
            <div
              key={category.uuid}
              className='flex flex-col gap-10 rounded-lg border bg-background p-8'
            >
              <div>
                <div className='h-10 w-10 relative'>
                  {category?.avatar ? (
                    <Image
                      src={category.avatar}
                      alt='avatar categories'
                      layout='fill'
                      objectFit='cover'
                      priority={false}
                    />
                  ) : (
                    ''
                  )}
                </div>
                <h3 className='mb-1 mt-2 font-medium'>{category.name}</h3>
                <p className='text-sm text-muted-foreground line-clamp-3'>
                  {category.description}
                </p>
              </div>
              <div className='w-full grow flex items-end'>
                <Button onClick={() => setEditCategoryUuid(category.uuid)}>
                  Edit
                </Button>
                <Button
                  variant='link'
                  onClick={() => setDeleteCategoryUuid(category.uuid)}
                >
                  Delete
                </Button>
              </div>
              <CategoryEditForm
                isEditDialogOpen={editCategoryUuid === category.uuid}
                setIsEditDialogOpen={() => setEditCategoryUuid(null)}
                values={category}
              />
              <DeleteDialog
                open={deleteCategoryUuid === category.uuid}
                onOpenChange={() => setDeleteCategoryUuid(null)}
                pathApi={`/categories/${category.uuid}`}
              />
            </div>
          ))}
        </div>
      </section>
    </ContentLayout>
  );
}
