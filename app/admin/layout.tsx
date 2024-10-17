"use client";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { Toaster } from "@/components/ui/toaster";
import withRole from "@/utils/with-role";

function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminPanelLayout>{children}</AdminPanelLayout>
      <Toaster />
    </>
  );
}

export default withRole(DemoLayout, ["admin"], "/auth/admin/login");
