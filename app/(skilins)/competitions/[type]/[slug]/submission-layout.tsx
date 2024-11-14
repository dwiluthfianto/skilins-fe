/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";
import Image from "next/image";
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
      <div className="w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {Submissions.map((item: any) => {
          return (
            <div key={item.content.uuid} className="pl-[20px] max-w-[250px]">
              <a
                href={`/prakerin/${item.content.slug}`}
                className="group flex flex-col justify-between"
              >
                <div>
                  <div className="flex aspect-[3/4] text-clip">
                    <div className="flex-1">
                      <div className="relative size-full origin-bottom transition duration-300 group-hover:scale-105">
                        <Image
                          src={item.content.thumbnail}
                          alt={item.content.title}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-2 line-clamp-3 break-words pt-4 text-base font-semibold md:mb-3 md:pt-4 lg:pt-4 lg:text-md">
                  {item.content.title}
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SubmissionLayout;
