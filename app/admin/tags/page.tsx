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

import {
  Blocks,
  Infinity,
  Laptop,
  ListEnd,
  Tag,
  Zap,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TagsPage() {
  const features = [
    {
      title: "#react",
      description:
        "Official tag for Facebook's React JavaScript library for building user interfaces",
      icon: <ZoomIn className="size-6" />,
      link: "#",
    },
    {
      title: "#python",
      description: "import antigravity",
      icon: <Blocks className="size-6" />,
      link: "#",
    },
    {
      title: "#programming",
      description: "The magic behind computers. 💻",
      icon: <Laptop className="size-6" />,
      link: "#",
    },
    {
      title: "#javascript",
      description:
        "Once relegated to the browser as one of the 3 core technologies of the web, JavaScript can now be found almost anywhere you find code. JavaScript developers move fast and push software development forward; they can be as opinionated as the frameworks they use, so let's keep it clean here and make it a place to learn from each other!",
      icon: <ListEnd className="size-6" />,
      link: "#",
    },
    {
      title: "#node",
      description:
        "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
      icon: <Zap className="size-6" />,
      link: "#",
    },
    {
      title: "#typescript",
      description: "Optional static type-checking for JavaScript.",
      icon: <Infinity className="size-6" />,
      link: "#",
    },
  ];
  return (
    <ContentLayout title="Tags">
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
            <BreadcrumbPage>Tags</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="py-12 space-y-8">
        <div className="flex flex-col items-start md:items-center md:flex-row justify-between gap-4">
          <div>
            <p className="font-bold text-4xl">Tags</p>
            <p className="text-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <Button>
            {" "}
            <Tag width={18} className="mr-2" /> Add tag
          </Button>
        </div>
        <div className="z-30 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col gap-10 rounded-lg border bg-background p-8"
            >
              <div>
                {feature.icon}
                <h3 className="mb-2 mt-6 font-medium">{feature.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {feature.description}
                </p>
              </div>
              <div className="w-full grow flex items-end">
                <Button>Edit</Button>
                <Button variant="link">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </ContentLayout>
  );
}
