"use client";
import { Button } from "@/components/ui/button";
import { ContentLayout } from "@/components/user-panel/content-layout";
import withRole from "@/utils/with-role";
import Image from "next/image";

function MyworkStories() {
  return (
    <ContentLayout title="">
      <section className="relative py-32 ">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-background rounded-md"></div>
        <div className="container relative">
          <h2 className="mb-8 max-w-screen-sm text-balance text-2xl font-semibold lg:text-4xl">
            Build your own stories with our UI blocks
          </h2>
          <div className="space-x-4">
            <Button>All</Button>
            <Button>Approved</Button>
            <Button>Pending</Button>
            <Button>Rejected</Button>
          </div>
          <div className="z-30 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="pl-[20px] max-w-[250px]">
              <a href={`#`} className="group flex flex-col justify-between">
                <div>
                  <div className="flex aspect-[3/4] text-clip">
                    <div className="flex-1">
                      <div className="relative size-full origin-bottom transition duration-300 group-hover:scale-105">
                        <Image
                          src={
                            "https://images.unsplash.com/photo-1730973915515-e79273d90b7c?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          }
                          alt={"title"}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          className="rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-2 line-clamp-3 break-words pt-4 text-base font-semibold md:mb-3 md:pt-4 lg:pt-4 lg:text-md">
                  This is title
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
}

export default withRole(MyworkStories, ["Staff"], "/auth/user/login");
