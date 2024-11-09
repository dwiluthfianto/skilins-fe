import AudioSubmission from "@/components/skilins/features/competition/audio-submission";

export default async function SubmitCompetitionPage({
  params,
}: {
  params: { competitionType: string };
}) {
  const renderForm = () => {
    switch (params.competitionType.toLowerCase()) {
      case "audiopodcast":
        return <AudioSubmission />;
      // case 'video':
      //   return <VideoSubmissionForm />;
      // case 'prakerin':
      //   return <PrakerinSubmissionForm />;
      default:
        return <div>Competition type not supported</div>;
    }
  };

  return <div>{renderForm()}</div>;
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions`);
  const data = await res.json();
  const competitions = data?.data || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return competitions.map((competition: any) => ({
    competitionType: competition.type,
  }));
}
