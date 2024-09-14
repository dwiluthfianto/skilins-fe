import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <div className="flex items-center">
            <span className={cn("mr-3")}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </span>
            <div
              className={cn(
                "whitespace-nowrap hidden md:flex flex-col text-start opacity-100"
              )}
            >
              <p className="font-bold">Dwi Luthfianto</p>
              <p className="text-xs">Welcome back to Synergy 💪</p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant={"outline"} className="hidden md:flex">
            <CalendarDays className="mr-2" width={18} />{" "}
            {format(new Date(), "dd MMM yy")}
          </Button>
          <Button>
            <Plus className="mr-2" width={18} /> Create a Blog
          </Button>
        </div>
      </div>
    </header>
  );
}
