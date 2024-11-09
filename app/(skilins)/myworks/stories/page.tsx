"use client";
import { ContentLayout } from "@/components/user-panel/content-layout";
import withRole from "@/utils/with-role";

function MyworkStories() {
  return (
    <ContentLayout title="">
      <div>
        <p>test</p>
      </div>
    </ContentLayout>
  );
}

export default withRole(MyworkStories, ["Staff"], "/auth/user/login");
