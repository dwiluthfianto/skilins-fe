import { Github, Instagram, Library, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex flex-col items-center justify-between p-3 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <Link href="/" className="flex justify-center items-center pt-1">
          <div className=" flex justify-center items-center  p-[1px] rounded-md border-2 border-black dark:border-white mr-2">
            <Library width={18} height={18} />
          </div>
          <p className="font-bold text-xl">skilins.</p>
        </Link>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          Build by Dwi Luthfianto © Copyright 2024. All Rights Reserved.
        </p>

        <div className="flex -mx-2 space-x-4">
          <Link href={"https://www.instagram.com/dwi.luthfianto/"}>
            <Instagram width={18} />
          </Link>

          <Link href={"https://www.linkedin.com/in/dwi-luthfianto-a5b176240/"}>
            <Linkedin width={18} />
          </Link>

          <Link href={"https://github.com/dwiluthfianto"}>
            <Github width={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
