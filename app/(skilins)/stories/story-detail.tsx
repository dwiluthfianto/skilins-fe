import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { columns, Episode } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Episode[]> {
  // Fetch data from your API here.
  return [
    {
      uuid: "728ed52f",
      order: 1,
      title: "test 1",
      created_at: new Date(),
    },
    {
      uuid: "728ed52f",
      order: 1,
      title: "test 1",
      created_at: new Date(),
    },
    {
      uuid: "728ed52f",
      order: 1,
      title: "test 1",
      created_at: new Date(),
    },
    {
      uuid: "728ed52f",
      order: 1,
      title: "test 1",
      created_at: new Date(),
    },
    {
      uuid: "728ed52f",
      order: 1,
      title: "test 1asdsadsadsadasdsadasdsadasdasdasdasdasdasdadsad",
      created_at: new Date(),
    },

    // ...
  ];
}

export default async function StoryDetail() {
  const data = await getData();
  return (
    <section className="md:py-2">
      <div className="md:container">
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
                <Link href="/novels">Novels</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{"test"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="">
            <AspectRatio ratio={3 / 4}>
              <Image
                src="https://images.unsplash.com/photo-1730407787622-6da7d1f19acd?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className=" rounded-lg"
              />
            </AspectRatio>
          </div>
          <div className="lg:col-span-2 ">
            <Card className=" rounded-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className=" text-lg text-muted-foreground hover:underline cursor-pointer">
                      {"Dwi Luthfianto"}
                    </p>
                    <h2 className="text-balance text-3xl font-medium md:text-5xl">
                      {"Test"}
                    </h2>
                  </div>
                </div>
                <p className="mt-1 md:mt-6 text text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium">
                  Description
                </p>
                <p className="mt-1 text-muted-foreground line-clamp-3 text-justify">
                  {"description"}
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="flex w-full items-center">
                      See more
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle className="text-center justify-center items-center">
                        Description
                      </DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="max-h-[600px] pr-4">
                      <p className="text-justify text-muted-foreground	">
                        {"description"}
                      </p>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <div className="flex gap-4 py-4 lg:py-8 flex-col items-start">
                  <div className="flex gap-2 flex-col">
                    <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium">
                      Detail novel
                    </p>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-4">
                      <div className="flex flex-row gap-6 w-full items-start">
                        <div className="flex flex-col gap-1">
                          <p className="text-muted-foreground text-sm">
                            Category
                          </p>
                          <p>{"category"}</p>
                        </div>
                      </div>

                      <div className="flex flex-row gap-6 w-full items-start">
                        <div className="flex flex-col gap-1">
                          <p className="text-muted-foreground text-sm">Pages</p>
                          <p>{"page"}</p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-6 items-start">
                        <div className="flex flex-col gap-1">
                          <p className="text-muted-foreground text-sm">
                            Release Date
                          </p>
                          <p>{format(new Date(), "dd MMM yyyy")}</p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-6 items-start">
                        <div className="flex flex-col gap-1">
                          <p className="text-muted-foreground text-sm">
                            Subjects
                          </p>
                          <p>
                            {/* {novel.subjects.map(
                                (subject: any, index: number) => (
                                  <Badge key={index} className="mr-2">
                                    {subject}
                                  </Badge>
                                )
                              )} */}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row gap-6 items-start">
                        <div className="flex flex-col gap-1">
                          <p className="text-muted-foreground text-sm">Tags</p>
                          {/* <p>
                              {novel.tags.map((tag: any, index: number) => (
                                <Badge key={index} className="mr-2">
                                  {tag.name}
                                </Badge>
                              ))}
                            </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <DataTable columns={columns} data={data} />
          </div>
          <div className="aspect-square">
            <div className="space-y-4">
              <p>Hello world</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
