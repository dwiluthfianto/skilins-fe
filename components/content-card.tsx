import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";

const cardVariants = {
  default: {
    ratio: "aspect-[3/4]",
    width: "max-w-[250px]",
  },
  video: {
    ratio: "aspect-[4/3]",
    width: "max-w-[352px]",
  },
  audio: {
    ratio: "aspect-[1/1]",
    width: "max-w-[250px]",
  },
};

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  href: string;
  imageSrc: string;
  title: string;
  variant?: keyof typeof cardVariants;
}

const ContentCard: FC<ContentProps> = ({
  href,
  imageSrc,
  title,
  variant = "default",
  ...props
}) => {
  return (
    <div className={cn("pl-[20px]", cardVariants[variant].width)} {...props}>
      <a href={href} className="group flex flex-col justify-between">
        <div>
          <div className={cn("flex text-clip", cardVariants[variant].ratio)}>
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
