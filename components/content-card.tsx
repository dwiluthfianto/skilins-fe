import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";

interface ContentProps {
  className?: string;
  href: string;
  aspectRatio: string;
  imageSrc: string;
  title: string;
}

const ContentCard: FC<ContentProps> = ({
  className,
  href,
  aspectRatio,
  imageSrc,
  title,
}) => {
  return (
    <div className={cn("pl-[20px]", className)}>
      <a href={href} className="group flex flex-col justify-between">
        <div>
          <div className={cn("flex text-clip", aspectRatio)}>
            <div className="flex-1">
              <div className="relative size-full origin-bottom transition duration-300 group-hover:scale-105">
                <Image
                  src={imageSrc}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2 line-clamp-3 break-words pt-4 text-base font-semibold md:mb-3 md:pt-4 lg:pt-4 lg:text-md">
          {title}
        </div>
      </a>
    </div>
  );
};

export default ContentCard;
