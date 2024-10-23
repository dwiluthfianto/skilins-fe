"use client";
import { SheetMenu } from "@/components/user-panel/sheet-menu";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CalendarDays, LogOut, User } from "lucide-react";

import { useUser } from "@/hooks/use-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { format } from "date-fns";
import { logout } from "@/utils/auth-service";
import Link from "next/link";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const { user, isLoading, mutate } = useUser();

  const handleLogout = async () => {
    try {
      await logout();

      mutate(null, false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!user) {
    return (
      <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
          <div className="flex items-center space-x-4 lg:space-x-0">
            <SheetMenu />
            <h1 className="font-bold">{title}</h1>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost">
              <Link href={"/auth/user/register"}>Sign up</Link>
            </Button>
            <Button variant="default">
              <Link href={"/auth/user/login"}>Log in</Link>
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant={"outline"} className="hidden md:flex">
            <CalendarDays className="mr-2" width={18} />{" "}
            {format(new Date(), "dd MMM yy")}
          </Button>
          {isLoading ? (
            "loading..."
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className={cn("mr-3")}>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" side="bottom" align="end">
                <DropdownMenuLabel className="font-normal grid grid-cols-6 items-center justify-between">
                  <div className="flex flex-col space-y-1 col-span-5">
                    <p className="text-sm font-medium leading-none truncate">
                      {user?.data.full_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user?.data.email}
                    </p>
                  </div>
                  <ModeToggle />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="hover:cursor-pointer" asChild>
                    <Link href="/account" className="flex items-center">
                      <User className="w-4 h-4 mr-3 text-muted-foreground" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => {
                    handleLogout();
                    mutate(null);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
