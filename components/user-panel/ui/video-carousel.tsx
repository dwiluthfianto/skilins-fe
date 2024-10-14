/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export function VideoCarousel({ data }: any) {
  const videos = data || [];
  return (
    <section className="py-2">
      <div>
        <div className="mb-2 flex flex-row justify-between  md:items-center ">
          <div>
            <h2 className="mb-2 text-xl font-bold md:mb-3 md:text-2xl">
              Video podcast
            </h2>
          </div>
          <a
            href="#"
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
            {videos.map((item: any) => (
              <CarouselItem key={item.uuid} className="pl-[20px] max-w-[352px]">
                <a href="#" className="group flex flex-col justify-between">
                  <div>
                    <div className="flex aspect-[3/2] text-clip">
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
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
