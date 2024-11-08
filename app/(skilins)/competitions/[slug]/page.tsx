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
import { Button } from "@/components/ui/button";

export default function CompetitionPage() {
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
                  <Badge variant="default">
                    <CircleCheckBig width={18} className="mr-2" /> Ongoing
                  </Badge>
                </div>
                <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
                  The title of competitions
                </h1>
                <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                  doloremque mollitia fugiat omnis! Porro facilis quo animi
                  consequatur. Explicabo.
                </p>
                <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button className="w-full sm:w-auto">Submit</Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Contact
                  </Button>
                </div>
              </div>
              <AspectRatio ratio={16 / 10}>
                <Image
                  src="https://www.shadcnblocks.com/images/block/placeholder-1.svg"
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
            <SubmissionLayout />
          </TabsContent>
          <TabsContent value="guide">
            <GuideLayout />
          </TabsContent>
          <TabsContent value="winner">
            <WinnerLayout />
          </TabsContent>
          <TabsContent value="judge">
            <JudgeLayout />
          </TabsContent>
        </Tabs>
      </div>
    </ContentLayout>
  );
}
