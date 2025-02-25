/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ContentCard from "@/components/content-card";
import { ContentLayout } from "@/components/judge-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJudgeSubmission, useJudgeUser } from "@/hooks/use-judge";
import { format } from "date-fns";
import {
  AlertTriangle,
  Badge,
  BadgeCheck,
  BadgePercent,
  CalendarClock,
  CheckCircle,
  List,
} from "lucide-react";
import { useState } from "react";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
import { SummaryStats } from "@/components/summary-stats";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
export default function JudgeDashboard() {
  const [scored, setScored] = useState(true);
  const {
    judge,
    isLoading: isJudgeLoading,
    isError: isJudgeError,
  } = useJudgeUser();

  const router = useRouter();

  if (!judge && !judge?.judge?.competition?.uuid) {
    toast({
      title: "Unauthorized",
      description:
        "You are not registered to any competition. please contact skilins staff.",
      variant: "destructive",
    });
    router.push("/");
  }

  const { data, summary, isLoading, isError } = useJudgeSubmission(
    scored,
    judge && judge.judge.competition.uuid
  );

  const summaryItems = [
    {
      label: "Scored",
      value: summary?.scored || 0,
      variant: "success" as const,
      icon: CheckCircle,
    },
    {
      label: "Unscored",
      value: summary?.unscored || 0,
      variant: "danger" as const,
      icon: AlertTriangle,
    },
    {
      label: "Total",
      value: summary?.total || 0,
      variant: "success" as const,
      icon: List,
    },
    {
      label: "Deadline",
      value: summary?.deadline.end_date || "No deadline",
      variant: "info" as const,
      icon: CalendarClock,
    },
  ];

  if (isLoading || isJudgeLoading) return <Loading />;
  if (isError || isJudgeError) return <Error />;
  return (
    <ContentLayout>
      <div className='md:container'>
        <SummaryStats items={summaryItems} />
        <div className='flex flex-wrap gap-2 py-8'>
          <Button
            variant={scored ? "default" : "outline"}
            onClick={() => setScored(true)}
          >
            Scored
          </Button>
          <Button
            variant={!scored ? "default" : "outline"}
            onClick={() => setScored(false)}
          >
            Unscored
          </Button>
        </div>
        <div className='w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
          {data.map((item: any) => {
            return item.competition.type === "audio" ? (
              <ContentCard
                key={item.content.slug}
                href={`/judge/audio-podcasts/${item.content.slug}`}
                variant='audio'
                imageSrc={item.content.thumbnail}
                title={item.content.title}
              />
            ) : item.competition.type === "video" ? (
              <ContentCard
                key={item.content.slug}
                href={`/judge/video-podcasts/${item.content.slug}`}
                variant='video'
                imageSrc={item.content.thumbnail}
                title={item.content.title}
              />
            ) : (
              <ContentCard
                key={item.content.slug}
                href={`/judge/prakerin/${item.content.slug}`}
                variant='default'
                imageSrc={item.content.thumbnail}
                title={item.content.title}
              />
            );
          })}
        </div>
      </div>
    </ContentLayout>
  );
}
