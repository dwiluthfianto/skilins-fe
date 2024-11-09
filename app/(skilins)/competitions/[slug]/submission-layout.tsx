import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";
import { FC } from "react";

interface SubmissionProps {
  Submissions: [];
}

const SubmissionLayout: FC<SubmissionProps> = ({ Submissions }) => {
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
    </section>
  );
};

export default SubmissionLayout;
