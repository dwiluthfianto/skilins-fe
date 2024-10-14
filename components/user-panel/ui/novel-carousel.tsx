/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export function NovelCarousel({ data }: any) {
  const novels = data || [];
  return (
    <section className="py-2">
      <div>
        <div className="mb-2 flex flex-col justify-between  md:flex-row md:items-center ">
          <div>
            <h2 className="mb-2 text-xl font-bold md:mb-3 md:text-2xl">
              Novels
            </h2>
          </div>
          <a
            href="novels"
            className="group flex items-center text-xs font-medium md:text-base"
          >
            Show all{" "}
          </a>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent>
            {novels.map((item: any) => {
              return (
                <CarouselItem
                  key={item.uuid}
                  className="pl-[20px] max-w-[250px]"
                >
                  <a
                    href={`novels/${item.uuid}`}
                    className="group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex aspect-[3/4] text-clip">
                        <div className="flex-1">
                          <div className="relative size-full origin-bottom transition duration-300 group-hover:scale-105">
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              layout="fill"
                              objectFit="cover"
                              objectPosition="center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-2 line-clamp-3 break-words pt-4 text-base font-semibold md:mb-3 md:pt-4 lg:pt-4 lg:text-md">
                      {item.title}
                    </div>
                  </a>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
