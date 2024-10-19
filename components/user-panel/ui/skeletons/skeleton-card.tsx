import { Skeleton } from "@/components/ui/skeleton";

export function LoadingContent() {
  return (
    <section className="py-2">
      <div className="flex flex-col gap-10 mb-8">
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              <Skeleton className="h-4 w-[200px]" />
            </h2>
            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
              <Skeleton className="h-4 w-[300px]" />
            </p>
          </div>
        </div>
      </div>
      <div className="w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="pl-[20px] max-w-[250px]">
            <div>
              <div className="flex aspect-[3/4] text-clip">
                <div className="flex-1">
                  <Skeleton className="h-full w-full rounded-xl" />
                </div>
              </div>
            </div>
            <div className="mb-2 pt-4  md:mb-3 md:pt-4 lg:pt-4 lg:text-md space-y-2">
              <Skeleton className="h-5 max-w-[250px]" />
              <Skeleton className="h-5 max-w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export function LoadingContent2() {
  return (
    <section className="py-2">
      <div className="flex flex-col gap-10 mb-8">
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              <Skeleton className="h-4 w-[200px]" />
            </h2>
            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
              <Skeleton className="h-4 w-[300px]" />
            </p>
          </div>
        </div>
      </div>
      <div className="w-full grid gap-2 grid-cols-2 md:grid-cols-4 ">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="pl-[20px] max-w-[352px]">
            <div>
              <div className="flex aspect-[4/3] text-clip">
                <div className="flex-1">
                  <Skeleton className="h-full w-full rounded-xl" />
                </div>
              </div>
            </div>
            <div className="mb-2 pt-4  md:mb-3 md:pt-4 lg:pt-4 lg:text-md space-y-2">
              <Skeleton className="h-5 max-w-[250px]" />
              <Skeleton className="h-5 max-w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LoadingContent3() {
  return (
    <section className="py-2">
      <div className="flex flex-col gap-10 mb-8">
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              <Skeleton className="h-4 w-[200px]" />
            </h2>
            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
              <Skeleton className="h-4 w-[300px]" />
            </p>
          </div>
        </div>
      </div>
      <div className="w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="pl-[20px] max-w-[250px]">
            <div>
              <div className="flex aspect-[1/1] text-clip">
                <div className="flex-1">
                  <Skeleton className="h-full w-full rounded-xl" />
                </div>
              </div>
            </div>
            <div className="mb-2 pt-4  md:mb-3 md:pt-4 lg:pt-4 lg:text-md space-y-2">
              <Skeleton className="h-5 max-w-[250px]" />
              <Skeleton className="h-5 max-w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LoadingCarousel() {
  return (
    <section className="py-2">
      <div>
        <div className="mb-8 flex flex-col justify-between md:flex-row md:items-end ">
          <div>
            <Skeleton className="h-4 w-[250px]" />
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              <Skeleton className="h-4 w-[200px]" />
            </h2>
            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
              <Skeleton className="h-4 w-[80px]" />
            </p>
          </div>
        </div>
      </div>
      <div className="w-full grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="pl-[20px] max-w-[250px]">
            <div>
              <div className="flex aspect-[1/1] text-clip">
                <div className="flex-1">
                  <Skeleton className="h-full w-full rounded-xl" />
                </div>
              </div>
            </div>
            <div className="mb-2 pt-4  md:mb-3 md:pt-4 lg:pt-4 lg:text-md space-y-2">
              <Skeleton className="h-5 max-w-[250px]" />
              <Skeleton className="h-5 max-w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
