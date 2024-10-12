"use client";
import { SheetMenu } from "@/components/user-panel/sheet-menu";
import { cn } from "@/libs/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LogOut, Settings, UserRound } from "lucide-react";

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

export function Navbar() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return (
      <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
          <div className="flex items-center space-x-4 lg:space-x-0">
            <SheetMenu />
            <div className="flex items-center"></div>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost">Sign up</Button>
            <Button variant="default">Log in</Button>
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
          <div className="flex items-center"></div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
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
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserRound width={16} className="mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings width={16} className="mr-2" /> Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut width={16} className="mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
