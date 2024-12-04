"use client";
import { SheetMenu } from "@/components/user-panel/sheet-menu";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CalendarDays, Library, LogOut, User } from "lucide-react";

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
import { useRouter } from "next/navigation";
import { GetFirstLetterStr } from "@/utils/get-first-letter-str";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import React from "react";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const { user, isLoading, mutate } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();

      router.push("/");
      mutate(null, false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!user) {
    return (
      <header className="sticky top-0 z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
          <div className="flex items-center space-x-4 lg:space-x-0">
            <SheetMenu />
            <h1 className="font-bold line-clamp-1">{title}</h1>
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
    <header className="sticky top-0 z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold line-clamp-1">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant={"outline"} className="hidden md:flex">
            <CalendarDays className="mr-2" width={18} />{" "}
            {format(new Date(), "dd MMM yy")}
          </Button>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                {isLoading ? (
                  "Loading.."
                ) : user?.data.role === "Student" ? (
                  <>
                    <NavigationMenuTrigger>Write</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/myworks/stories"
                            >
                              <div className="flex justify-center items-center pt-1">
                                <div className=" flex  p-[1px] rounded-md border-2 border-black dark:border-white mr-2">
                                  <Library width={18} height={18} />
                                </div>
                                <p className="font-bold text-xl">skilins.</p>
                              </div>
                              <div className="mb-2 mt-4 text-lg font-medium">
                                Stories
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                {`Share the captivating stories you’ve created,
                                filled with inspiration and imagination.`}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <ListItem href="/myworks/audio-podcasts" title="Audio">
                          {`Share the audio works you’ve crafted, from music to
                          engaging podcasts.`}
                        </ListItem>
                        <ListItem href="/myworks/video-podcasts" title="Video">
                          {`Share the creative videos you’ve produced, showcasing your
                          ideas and stories.`}
                        </ListItem>
                        <ListItem href="/myworks/prakerin" title="Prakerin">
                          {`Explore your internship experiences and the projects
                          you’ve worked on during that time.`}
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : user?.data.role === "Staff" ? (
                  <Link href={"/staff/dashboard"}>
                    <Button variant={"ghost"}>Staff Dashboard</Button>
                  </Link>
                ) : user?.data.role === "Judge" ? (
                  <Link href={"/judge/dashboard"}>
                    <Button variant={"ghost"}>Judge Dashboard</Button>
                  </Link>
                ) : (
                  ""
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {isLoading ? (
            "loading..."
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className={cn("mr-3 hover:cursor-pointer")}>
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
