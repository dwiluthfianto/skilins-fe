"use client";

import { Button } from "@/components/ui/button";
import withRole from "@/utils/with-role";
import Link from "next/link";

function ForbiddenPage() {
  return (
    <section className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">403</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">
          {"You don't have permission to access this area"}
        </p>

        <Button>
          <Link href={"/"}>Go Back Home</Link>
        </Button>
      </div>
    </section>
  );
}

export default withRole(ForbiddenPage, ["user"], "/");
