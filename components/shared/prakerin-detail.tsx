/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import MinimalTiptapPreview from "@/components/minimal-tiptap/minimal-tiptap-preview";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookText } from "lucide-react";
import Link from "next/link";
interface PrakerinDetailProps {
  prakerin: any;
}

export function PrakerinDetail({ prakerin }: PrakerinDetailProps) {
  return (
    <section className='md:py-2'>
      <div className='md:container'>
        <div className='grid grid-cols-1 min-[1340px]:grid-cols-4 mt-8 gap-y-6 min-[1340px]:gap-8'>
          <div>
            <AspectRatio ratio={3 / 4}>
              <Image
                src={prakerin.thumbnail}
                alt={prakerin.title}
                fill
                className='rounded-lg object-cover'
              />
            </AspectRatio>
          </div>

          <div className='col-span-3'>
            <Card className='rounded-lg'>
              <CardContent className='p-6'>
                <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                  <p className='text-lg text-muted-foreground'>
                    {prakerin.prakerin?.creator?.name || prakerin.creator}
                  </p>
                  <h2 className='text-3xl font-medium text-balance md:text-5xl'>
                    {prakerin.title}
                  </h2>
                  <Button variant={"default"}>
                    <BookText width={16} className='mr-2' />
                    <Link href={prakerin.prakerin.file_attachment.file}>
                      Read book
                    </Link>
                  </Button>
                </div>
                <DescriptionSection description={prakerin.description} />
                <PrakerinDetailsSection prakerin={prakerin} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function DescriptionSection({ description }: { description: string }) {
  return (
    <>
      <p className='mt-1 md:mt-6 text text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium'>
        Description
      </p>
      <MinimalTiptapPreview value={description} editable={false} />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='link' className='flex w-full items-center'>
            See more
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px] md:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle className='text-center justify-center items-center'>
              Description
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className='max-h-[600px] pr-4'>
            <MinimalTiptapPreview value={description} editable={false} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PrakerinDetailsSection({ prakerin }: { prakerin: any }) {
  return (
    <div className='flex gap-4 py-4 lg:py-8 flex-col items-start'>
      <div className='flex gap-2 flex-col'>
        <p className='text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium'>
          Detail Prakerin
        </p>
      </div>
      <div className='flex flex-col w-full'>
        <div className='grid grid-cols-2 items-start lg:grid-cols-3 gap-4'>
          <DetailItem
            label='Major'
            value={prakerin.prakerin.creator.major.name || prakerin.category}
          />
          <DetailItem label='Pages' value={prakerin.prakerin.pages} />
          <DetailItem
            label='Published at'
            value={format(prakerin.prakerin.published_at, "dd MMM yyyy")}
          />
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className='flex flex-row gap-6 items-start'>
      <div className='flex flex-col gap-1'>
        <p className='text-muted-foreground text-sm'>{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
}
