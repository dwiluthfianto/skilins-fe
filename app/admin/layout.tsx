"use client";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading, isError } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user</div>;

  if (!user || user.data?.role !== "admin") {
    router.push("/auth/admin/login");
  }

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
