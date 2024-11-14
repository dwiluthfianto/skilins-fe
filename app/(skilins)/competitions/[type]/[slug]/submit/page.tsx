"use client";
import AudioSubmission from "@/components/skilins/features/competition/audio-submission";
import PrakerinSubmission from "@/components/skilins/features/competition/prakerin-submission";
import VideoSubmission from "@/components/skilins/features/competition/video-submission";
import { useParams } from "next/navigation";

export default function SubmitCompetitionPage() {
  const params = useParams<{ type: string; slug: string }>();

  const renderForm = () => {
    switch (params.type) {
      case "audio":
        return <AudioSubmission />;
      case "video":
        return <VideoSubmission />;
      case "prakerin":
        return <PrakerinSubmission />;
      default:
        return <div>Competition type not supported</div>;
    }
  };

  return <div>{renderForm()}</div>;
}
