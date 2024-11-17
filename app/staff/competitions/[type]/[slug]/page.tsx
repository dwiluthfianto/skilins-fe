"use client";
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
import { notFound } from "next/navigation";
import { useState } from "react";
import { useCompetitionDetail } from "@/hooks/use-competition";

export default function CompetitionPage({
  params,
}: {
  params: { slug: string; type: string };
}) {
  const [contentStatus, setContentStatus] = useState("APPROVED");
  const {
    competition: data,
    isLoading,
    isError,
  } = useCompetitionDetail(params.slug, params.type, contentStatus);

  const updateStatus = (status: string) => {
    setContentStatus(status);
  };

  if (isLoading) return <h1>loading..</h1>;
  if (isError) return notFound();
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
                  {new Date(data.end_date) > new Date() ? (
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
            <SubmissionLayout
              Submissions={data.Submissions}
              status={contentStatus}
              onUpdateStatus={updateStatus}
            />
          </TabsContent>
          <TabsContent value="guide">
            <GuideLayout guide={data.guide} />
          </TabsContent>
          <TabsContent value="winner">
            <WinnerLayout Winners={data.Winners} />
          </TabsContent>
          <TabsContent value="judge">
            <JudgeLayout Judges={data.Judges} />
          </TabsContent>
        </Tabs>
      </div>
    </ContentLayout>
  );
}
