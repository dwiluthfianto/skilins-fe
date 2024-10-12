"use client";
import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEbook } from "@/hooks/use-ebook";

export default function EbooksPage() {
  const { ebooks, isLoading, isError } = useEbook(1);

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error</h1>;
  return (
    <ContentLayout title="Users">
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
            <BreadcrumbPage>e-Books</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full py-8">
        <div className=" mx-auto">
          <div className="flex flex-col gap-4 ">
            <DataTable columns={columns} data={ebooks} />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
