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

import { eBooks, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<eBooks[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      image:
        "https://www.gutenberg.org/cache/epub/74406/pg74406.cover.medium.jpg",
      author: "Very, Edward W. (Edward Wilson), 1847-1910",
      title:
        "Navies of the world : giving concise descriptions of the plans, armament and armor of the naval vessels of twenty of the principal nations.",
      category: "Text",
      pages: 452,
      publication: "New York: John Wiley & Sons, 1880.",
      release_date: "Sep 12, 2024",
      subjects: [
        "Naval battles",
        "Navies",
        "Torpedoes",
        "Naval architecture",
        "Ordnance, naval",
      ],
      ebookFile: "test.pdf",
      tags: ["War", "Battle", "Drama"],
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
              <Link href="/dashboard">Student Works</Link>
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
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
