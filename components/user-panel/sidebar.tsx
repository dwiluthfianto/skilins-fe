import Link from "next/link";
import { Library } from "lucide-react";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Menu } from "@/components/user-panel/menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/components/user-panel/sidebar-toggle";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Link
          href="/"
          className={cn(
            "flex justify-center items-center pt-1 transition-transform ease-in-out duration-300",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
        >
          <div className=" flex justify-center items-center  p-[1px] rounded-md border-2 border-black dark:border-white mr-2">
            <Library width={24} height={24} />
          </div>
          <h1
            className={cn(
              "font-bold text-xl md:text-2xl whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
              sidebar?.isOpen === false
                ? "-translate-x-96 opacity-0 hidden"
                : "translate-x-0 opacity-100"
            )}
          >
            skilins.
          </h1>
        </Link>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
