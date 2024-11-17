/* eslint-disable @typescript-eslint/no-explicit-any */
import ContentCard from "@/components/content-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { FC } from "react";

interface SubmissionProps {
  onUpdateStatus: (status: string) => void;
  status: string;
  Submissions: [];
}

const SubmissionLayout: FC<SubmissionProps> = ({
  onUpdateStatus,
  Submissions,
  status,
}) => {
  return (
    <section className="w-full py-6">
      <div className="container mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge variant={"outline"}>
            <Send width={14} className="mr-2" />
            Submission
          </Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
              Showcasing Talent: Where Every Contestant Shines!
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              Highlighting the creativity and passion of participants.
            </p>
          </div>
        </div>
      </div>
      <div className="space-x-2 py-8">
        <Button
          variant={status === "APPROVED" ? "default" : "outline"}
          onClick={() => onUpdateStatus("APPROVED")}
        >
          Approved
        </Button>
        <Button
          variant={status === "PENDING" ? "default" : "outline"}
          onClick={() => onUpdateStatus("PENDING")}
        >
          Pending
        </Button>
        <Button
          variant={status === "REJECTED" ? "default" : "outline"}
          onClick={() => onUpdateStatus("REJECTED")}
        >
          Rejected
        </Button>
      </div>
      <div className="w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {Submissions.map((item: any) => {
          return item.content.type === "AUDIO" ? (
            <ContentCard
              key={item.content.slug}
              className="max-w-[250px]"
              href={`/staff/audios/${item.content.slug}`}
              aspectRatio="aspect-[1/1]"
              imageSrc={item.content.thumbnail}
              title={item.content.title}
            />
          ) : item.content.type === "VIDEO" ? (
            <ContentCard
              key={item.content.slug}
              className="max-w-[352px]"
              href={`/staff/videos/${item.content.slug}`}
              aspectRatio="aspect-[4/3]"
              imageSrc={item.content.thumbnail}
              title={item.content.title}
            />
          ) : (
            <ContentCard
              key={item.content.slug}
              className="max-w-[250px]"
              href={`/staff/prakerin/${item.content.slug}`}
              aspectRatio="aspect-[3/4]"
              imageSrc={item.content.thumbnail}
              title={item.content.title}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SubmissionLayout;
