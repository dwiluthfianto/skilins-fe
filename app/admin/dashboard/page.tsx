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
import { MoveDownLeft, MoveUpRight, User } from "lucide-react";

export default function DashboardPage() {
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
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full py-8">
        <div className=" mx-auto">
          <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 lg:gap-8">
            <div className="flex gap-0 flex-col justify-between p-6 border rounded-md bg-white dark:bg-black">
              <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
              <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                500.000
                <span className="text-muted-foreground text-sm tracking-normal">
                  +20.1%
                </span>
              </h2>
              <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                Monthly active users
              </p>
            </div>
            <div className="flex gap-0 flex-col justify-between p-6 border rounded-md bg-white dark:bg-black">
              <MoveDownLeft className="w-4 h-4 mb-10 text-destructive" />
              <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                20.105
                <span className="text-muted-foreground text-sm tracking-normal">
                  -2%
                </span>
              </h2>
              <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                Daily active users
              </p>
            </div>
            <div className="flex gap-0 flex-col justify-between p-6 border rounded-md bg-white dark:bg-black">
              <MoveUpRight className="w-4 h-4 mb-10 text-success" />
              <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                $523.520
                <span className="text-muted-foreground text-sm tracking-normal">
                  +8%
                </span>
              </h2>
              <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                Monthly recurring revenue
              </p>
            </div>
            <div className="flex gap-0 flex-col justify-between p-6 border rounded-md bg-white dark:bg-black">
              <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
              <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
                $1052
                <span className="text-muted-foreground text-sm tracking-normal">
                  +2%
                </span>
              </h2>
              <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                Cost per acquisition
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full ">
        <div className=" mx-auto">
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-black border rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
                <User className="w-8 h-8 stroke-1" />
                <div className="flex flex-col"></div>
              </div>
              <div className="bg-white dark:bg-black border rounded-md  aspect-square p-6 flex justify-between flex-col">
                <User className="w-8 h-8 stroke-1" />
                <div className="flex flex-col"></div>
              </div>

              <div className="bg-white dark:bg-black border rounded-md aspect-square p-6 flex justify-between flex-col">
                <User className="w-8 h-8 stroke-1" />
                <div className="flex flex-col"></div>
              </div>
              <div className="bg-white dark:bg-black border rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
                <User className="w-8 h-8 stroke-1" />
                <div className="flex flex-col"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
