/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function AudioCarousel({ data }: any) {
  const audios = data || [];
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <section className="py-2">
      <div>
        <div className="mb-8 flex flex-col justify-between md:flex-row md:items-end ">
          <div>
            <Badge className="mb-2 text-xs font-medium  tracking-wider">
              Voices that Inspire, Stories that Connect.
            </Badge>
            <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              Audio Podcasts
            </h2>
            <a
              href="/audios"
            className="group flex items-center text-xs font-medium md:text-base lg:text-lg"
            >
              See all{" "}
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent>
            {audios.map((item: any) => (
              <CarouselItem key={item.uuid} className="pl-[20px] max-w-[250px]">
                <a
                  href={`audio-podcasts/${item.slug}`}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex aspect-[1/1] text-clip">
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
