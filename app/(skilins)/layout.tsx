"use client";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import UserPanelLayout from "@/components/user-panel/user-panel-layout";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <UserPanelLayout>{children}</UserPanelLayout>
      <Toaster />
    </TooltipProvider>
  );
}
