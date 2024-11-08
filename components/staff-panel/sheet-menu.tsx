import Link from "next/link";
import { Library, MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/staff-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Link href="/" className="flex justify-center items-center pt-1">
            <div className=" flex justify-center items-center  p-[1px] rounded-md border-2 border-black dark:border-white mr-2">
              <Library width={24} height={24} />
            </div>
            <SheetTitle className="font-bold text-xl md:text-2xl">
              skilins.
            </SheetTitle>
          </Link>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
