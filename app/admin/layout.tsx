"use client";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { Toaster } from "@/components/ui/toaster";
import withRole from "@/utils/with-role";

function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminPanelLayout>{children}</AdminPanelLayout>
      <Toaster />
    </div>
  );
}

export default withRole(DemoLayout, ["admin"], "/auth/admin/login");
