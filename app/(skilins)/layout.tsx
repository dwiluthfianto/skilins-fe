"use client";
import { Toaster } from "@/components/ui/toaster";
import UserPanelLayout from "@/components/user-panel/user-panel-layout";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserPanelLayout>{children}</UserPanelLayout>
      <Toaster />
    </>
  );
}
