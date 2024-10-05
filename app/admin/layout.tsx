"use client";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { Toaster } from "@/components/ui/toaster";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && (!user || user.data?.role !== "admin")) {
      router.push("/auth/admin/login");
    }
  }, [isLoading, user, router]);

  return (
    <>
      <AdminPanelLayout>{children}</AdminPanelLayout>
      <Toaster />
    </>
  );
}
