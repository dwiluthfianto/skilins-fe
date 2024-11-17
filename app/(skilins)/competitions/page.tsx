/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { useCompetition } from "@/hooks/use-competition";
import Image from "next/image";

export default function CompetitionPage() {
  const { competitions, isLoading } = useCompetition();

  if (isLoading) return <h1>loading...</h1>;
  return (
    <ContentLayout title="">
      {" "}
      <section className="py-2">
        <div className="flex flex-col gap-10 mb-8">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Contents</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Competitions
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                Rise to the Challenge: Unleash Your Potential!
              </p>
            </div>
          </div>
        </div>
        <div className="w-full grid gap-2 grid-cols-2  lg:grid-cols-4">
          {competitions?.map((item: any) => {
            return (
              <div className="pl-[20px] max-w-[352px]" key={item.uuid}>
                <a
                  href={`competitions/${item.type.toLowerCase()}/${item.slug}`}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex aspect-[16/9] text-clip">
                      <div className="flex-1">
                        <div className="relative size-full origin-bottom transition duration-300 group-hover:scale-105">
                          <Image
                            key={item.thumbnail}
                            src={item.thumbnail}
                            alt={"test"}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            className="rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" mb-2  pt-4  md:mb-3 md:pt-4 lg:pt-4 ">
                    {new Date(item.end_date) > new Date() ? (
                      <Badge variant={"default"}>Ongoing</Badge>
                    ) : (
                      <Badge variant={"destructive"}>Completed</Badge>
                    )}
                    <p className="line-clamp-2 break-words text-base lg:text-md font-semibold">
                      {item.title}
                    </p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </ContentLayout>
  );
}
