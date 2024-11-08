import { ContentLayout } from "@/components/user-panel/content-layout";
// import { Novels } from "@/components/user-panel/ui/novels";
import StoryDetail from "./story-detail";

export default function NovelPage() {
  return (
    <ContentLayout title="">
      {/* <Novels /> */}
      <StoryDetail></StoryDetail>
    </ContentLayout>
  );
}
