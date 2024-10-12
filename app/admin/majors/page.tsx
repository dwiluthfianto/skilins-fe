"use client";
import { Code, FilePenLine, MoreHorizontal, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import Link from "next/link";
import { useMajor } from "@/hooks/use-major";
import Image from "next/image";
import React, { Key } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import MajorForm from "@/components/admin-panel/forms/major/major-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/admin-panel/delete-dialog";

function Majors() {
  const { major, isLoading, isError } = useMajor();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  if (isLoading) <h1>Loading...</h1>;
  if (isError) <h1>Major page error</h1>;
  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Majors</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>
        <div className="flex flex-col py-6 items-start md:items-center md:flex-row justify-between gap-4">
          <div>
            <p className="font-bold text-4xl">Majors</p>
            <p className="text-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <MajorForm />
        </div>
        <div>
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="mt-2 grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {major?.data.map(
                (m: {
                  uuid: Key | null;
                  name: string | null;
                  image_url: string | StaticImport;
                  description: string | null;
                }) => (
                  <Card key={m.uuid} className="w-full relative">
                    <CardHeader className="pb-1 flex flex-row items-center justify-between">
                      <Code className="size-4" strokeWidth={1} />
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

                            <DropdownMenuItem
                              onClick={() => setIsEditDialogOpen(true)}
                            >
                              <FilePenLine className="mr-2" width={16} /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setIsDeleteDialogOpen(true)}
                            >
                              <Trash2 className="mr-2" width={16} /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <DeleteDialog
                          isDeleteDialogOpen={isDeleteDialogOpen}
                          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                          pathApi={`/majors/${m.uuid}`}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="text-left">
                      <h2 className="mb-1 text-lg font-semibold">{m.name}</h2>
                      <p className="leading-snug text-muted-foreground truncate">
                        {m.description}
                      </p>
                    </CardContent>
                    <CardFooter className="justify-end pb-0 pr-0">
                      <div className="h-40 w-full relative">
                        {m.image_url ? (
                          <Image
                            className="rounded-tl-md"
                            src={m.image_url}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            alt="Major image"
                          />
                        ) : null}
                      </div>
                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
}

export default Majors;
