"use client";
import { SheetMenu } from "@/components/staff-panel/sheet-menu";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { GetFirstLetterStr } from "@/utils/get-first-letter-str";

export function Navbar() {
  const { user, isLoading } = useUser();

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          {isLoading ? (
            "loading..."
          ) : (
            <div className="flex items-center">
              <span className={cn("mr-3")}>
                <Avatar>
                  <AvatarImage
                    key={user?.data?.profile}
                    src={
                      user?.data?.profile ? `${user.data.profile}` : undefined
                    }
                    className="object-cover object-center"
                  />
                  <AvatarFallback>
                    {GetFirstLetterStr(user?.data?.full_name)}
                  </AvatarFallback>
                </Avatar>
              </span>
              <div
                className={cn(
                  "whitespace-nowrap hidden md:flex flex-col text-start opacity-100"
                )}
              >
                <p className="font-bold">{user?.data?.full_name}</p>
                <p className="text-xs">Welcome back to Synergy 💪</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant={"outline"} className="hidden md:flex">
            <CalendarDays className="mr-2" width={18} />{" "}
            {format(new Date(), "dd MMM yy")}
          </Button>
          <Button>
            <Link
              href="/staff/blogs/create"
              className="flex items-center gap-1"
            >
              <Plus width={18} /> Create blog
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
