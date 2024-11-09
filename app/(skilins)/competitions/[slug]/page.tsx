import { ContentLayout } from "@/components/user-panel/content-layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/user-panel/ui/tabs";
import {
  CircleCheckBig,
  Crown,
  FileSpreadsheet,
  Flame,
  Medal,
  Send,
  Users,
} from "lucide-react";
import JudgeLayout from "./judge-layout";
import WinnerLayout from "./winner-layout";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import GuideLayout from "./guide-layout";
import SubmissionLayout from "./submission-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "@/utils/axios";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export default async function CompetitionPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = (await axios.get(`/competitions/${params.slug}`)).data;

  const data = res.data;
  console.log(data.Submissions);

  return (
    <ContentLayout title="">
      <div className="md:container space-y-6 md:space-y-8">
        <section>
          <div className="w-full">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="flex space-x-4">
                  <Badge variant="outline">
                    <Medal width={18} className="mr-2" /> Competitions
                  </Badge>
                  {new Date(data.submission_deadline) > new Date() ? (
                    <Badge variant="default">
                      <CircleCheckBig width={18} className="mr-2" /> Ongoing
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <Flame width={18} className="mr-2" /> Completed
                    </Badge>
                  )}
                </div>
                <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
                  {data.title}
                </h1>
                <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                  {data.description}
                </p>
                <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={`${
                            params.slug
                          }/submit/${data.type.toLowerCase()}`}
                        >
                          <Button
                            className="w-full sm:w-auto"
                            disabled={
                              new Date(data.submission_deadline) > new Date()
                                ? false
                                : true
                            }
                          >
                            Join the competition
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Deadline:{" "}
                          {format(data.submission_deadline, "dd MMM yyyy")}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button variant="outline" className="w-full sm:w-auto">
                    {format(data.start_date, "dd MMM")} -{" "}
                    {format(data.end_date, "dd MMM yyyy")}
                  </Button>
                </div>
              </div>
              <AspectRatio ratio={16 / 10}>
                <Image
                  key={data.thumbnail}
                  src={data.thumbnail}
                  alt="placeholder hero"
                  layout="fill"
                  objectFit="cover"
                  className="max-h-96 rounded-md"
                />
              </AspectRatio>
            </div>
          </div>
        </section>

        <Tabs defaultValue="submission">
          <TabsList>
            <TabsTrigger value="submission">
              <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                <Send width={18} />
              </span>
              <p className="text-sm text-muted-foreground">Submission</p>
            </TabsTrigger>
            <TabsTrigger value="guide">
              <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                <FileSpreadsheet width={18} />
              </span>
              <p className="text-sm text-muted-foreground">Guide</p>
            </TabsTrigger>
            <TabsTrigger value="winner">
              {" "}
              <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                <Crown width={18} />
              </span>
              <p className="text-sm text-muted-foreground">Winner</p>
            </TabsTrigger>
            <TabsTrigger value="judge">
              {" "}
              <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                <Users width={18} />
              </span>
              <p className="text-sm text-muted-foreground">Judge</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="submission">
            <SubmissionLayout Submissions={data.Submissions} />
          </TabsContent>
          <TabsContent value="guide">
            <GuideLayout guide={data.guide} />
          </TabsContent>
          <TabsContent value="winner">
            <WinnerLayout Winners={data.Winners} />
          </TabsContent>
          <TabsContent value="judge">
            <JudgeLayout />
          </TabsContent>
        </Tabs>
      </div>
    </ContentLayout>
  );
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions`);
  const data = await res.json();
  const competitions = data?.data || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return competitions.map((competition: any) => ({
    slug: competition.slug,
  }));
}
