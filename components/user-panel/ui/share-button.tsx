"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

interface ShareButtonProps {
  title: string;
  url: string;
  hashtag?: string;
  hashtags?: [];
  className?: string;
}

const ShareButton: FC<ShareButtonProps> = ({
  title,
  url,
  hashtag,
  hashtags,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <div className="grid grid-cols-4 md:grid-cols-1 md:grid-rows-4 w-fit h-fit gap-2 ">
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon className="rounded-md md:rounded-xl w-8 h-8 md:w-12 md:h-12" />
        </WhatsappShareButton>
        <FacebookShareButton url={url} title={title} hashtag={hashtag}>
          <FacebookIcon className="rounded-md md:rounded-xl w-8 h-8 md:w-12 md:h-12" />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title} hashtags={hashtags}>
          <XIcon className="rounded-md md:rounded-xl w-8 h-8 md:w-12 md:h-12" />
        </TwitterShareButton>
        <TelegramShareButton url={url} title={title}>
          <TelegramIcon className="rounded-md md:rounded-xl w-8 h-8 md:w-12 md:h-12" />
        </TelegramShareButton>
      </div>
    </div>
  );
};

export default ShareButton;
