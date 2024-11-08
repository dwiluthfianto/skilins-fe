"use client";
import { useRouter } from "next/navigation";

import { Library } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterStudent from "./register-student";
import RegisterNonStudent from "./register-non-student";

export default function Register() {
  const router = useRouter();

  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect sesuai dengan role user hanya ketika data user sudah di-fetch
      if (user?.data?.role === "admin") {
        router.push("/admin/dashboard");
      } else if (user?.data?.role === "user") {
        router.push("/");
      }
    }
  }, [user, isLoading, router]);

  // Jangan render form login jika user sudah ada (sedang redirect)
  if (isLoading || user) return <p>Redirecting...</p>;

  return (
    <div>
      <section className="py-32">
        <div className="container">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex justify-center items-center pt-1">
              <div className=" flex justify-center items-center  p-[1px] rounded-md border-2 border-black mr-2">
                <Library width={24} height={24} />
              </div>
              <h1 className="font-bold text-xl md:text-2xl">skilins.</h1>
            </Link>
            <Tabs
              defaultValue="non-student"
              className="max-w-sm w-full mx-auto"
            >
              <TabsList className="flex justify-center items-center pt-1">
                <TabsTrigger value="non-student" className="w-full">
                  Non Student
                </TabsTrigger>
                <TabsTrigger value="student" className="w-full">
                  Student
                </TabsTrigger>
              </TabsList>
              <TabsContent value="non-student">
                <RegisterNonStudent />
              </TabsContent>
              <TabsContent value="student">
                <RegisterStudent />
              </TabsContent>
            </Tabs>

            <div className="mx-auto flex gap-1 text-sm">
              <p>{`Already have an account?`}</p>
              <a href="/auth/user/login" className="underline">
                Log in
              </a>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </div>
  );
}
