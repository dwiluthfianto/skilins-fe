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

import { PKLReport, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<PKLReport[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      reportFile: "test.pdf",
      title: "Perancangan Website SMKN 1 Gunungputri",
      description: "Lorem ipsum dolor met",
      author: "Jane Doe",
      major: "Rekayasa Perangkat Lunak",
      subjects: ["Website", "React", "Javascript"],
      published_at: "27 Des 2024",
    },
  ];
}

export default async function EbooksPage() {
  const data = await getData();
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
            <BreadcrumbLink asChild>
              <Link href="/student-works">Student Works</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Audio Podcasts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full py-8">
        <div className=" mx-auto">
          <div className="flex flex-col gap-10 ">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
