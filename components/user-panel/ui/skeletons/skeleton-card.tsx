import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard(total: any) {
  const skeletons = [];
  for (let index = 0; index < total; index++) {
    skeletons.push(
      <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {skeletons}
    </div>
  );
}
