import { Badge } from "@/components/ui/badge";
import { ContentLayout } from "@/components/user-panel/content-layout";
import Image from "next/image";

export default function CompetitionPage() {
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
                Competition
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                Rise to the Challenge: Unleash Your Potential!
              </p>
            </div>
          </div>
        </div>
        <div className="w-full grid gap-2 grid-cols-2  lg:grid-cols-4">
          <div className="pl-[20px] max-w-[352px]">
            <a href={`#`} className="group flex flex-col justify-between">
              <div>
                <div className="flex aspect-[16/9] text-clip">
                  <div className="flex-1">
                    <div className="relative size-full origin-bottom transition duration-300 group-hover:scale-105">
                      <Image
                        src={
                          "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
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
                <Badge variant={"default"}>Ongoing</Badge>
                <p className="line-clamp-2 break-words text-base lg:text-md font-semibold">
                  {
                    "dasdas asdasd asdas da dsada dadad adadada sdad ada asdasd asd asda dsad asd ada asdad a dasd a dsa da sadasd a"
                  }
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
}
