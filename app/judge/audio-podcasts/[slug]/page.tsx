/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAudioBySlug } from "@/hooks/use-audio";
import { ContentLayout } from "@/components/judge-panel/content-layout";
import { Loading } from "@/components/loading";
import { AudioDetail } from "@/components/shared/audio-detail";
import FeedbackJudge from "@/components/judge-panel/feedback";

export default function AudioDetailPage({ params }: any) {
  const { slug } = params;
  const { audio, isLoading } = useAudioBySlug(slug);

  if (isLoading) return <Loading />;

  return (
    <ContentLayout>
      <AudioDetail audio={audio} />
      <FeedbackJudge
        submissionUuid={audio.submission.uuid}
        competitionUuid={audio.submission.competition.uuid}
      />
    </ContentLayout>
  );
}
