"use client";

import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { useState } from "react";
import { Content } from "@tiptap/react";
import { ContentLayout } from "@/components/user-panel/content-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateStories() {
  const [value, setValue] = useState<Content>("");

  return (
    <ContentLayout title="">
      <div className="md:container">
        <Card>
          <CardHeader>
            <CardTitle>Content of story</CardTitle>
          </CardHeader>
          <CardContent>
            <MinimalTiptapEditor
              value={value}
              onChange={setValue}
              className="w-full"
              editorContentClassName="p-5"
              output="html"
              placeholder="Type your description here..."
              autofocus={true}
              editable={true}
              editorClassName="focus:outline-none"
            />
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
