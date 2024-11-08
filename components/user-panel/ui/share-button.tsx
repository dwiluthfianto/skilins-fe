"use client";

import { Button } from "@/components/ui/button";
import { FacebookShareButton, WhatsappShareButton } from "react-share";

export default function ShareButton({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  return (
    <WhatsappShareButton url={url}>
      <Button variant={"link"}>wa</Button>
    </WhatsappShareButton>
  );
}
