import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
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
import { AudioPlayer } from "@/components/user-panel/ui/audio-player";
interface AudioDetailProps {
  audio: any;
}

export function AudioDetail({ audio }: AudioDetailProps) {
  const track = {
    src: audio.audio_podcast.file_attachment.file,
    title: audio.title,
    category: audio.category.name,
    image: audio.thumbnail,
    creator: audio.audio_podcast.creator.name,
  };
  return (
    <section className='md:py-2'>
      <div className='md:container'>
        <div className='grid grid-cols-1 min-[1340px]:grid-cols-4 mt-8 gap-y-6 min-[1340px]:gap-8'>
          <div className='relative'>
            <AspectRatio ratio={1 / 1}>
              <Image
                src={audio.thumbnail}
                alt={audio.title}
                fill
                className='rounded-lg object-cover'
              />
            </AspectRatio>
            <AudioPlayer data={track} />
          </div>

          <div className='col-span-3'>
            <Card className='rounded-lg'>
              <CardContent className='p-6'>
                <p className='text-lg text-muted-foreground'>
                  {audio.audio_podcast?.creator?.name || audio.creator}
                </p>
                <h2 className='text-3xl font-medium text-balance md:text-5xl'>
                  {audio.title}
                </h2>
                <DescriptionSection description={audio.description} />
                <AudioDetailsSection audio={audio} />
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

function AudioDetailsSection({ audio }: { audio: any }) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className='flex gap-4 py-4 lg:py-8 flex-col items-start'>
      <div className='flex gap-2 flex-col'>
        <p className='text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium'>
          Detail Audio
        </p>
      </div>
      <div className='flex flex-col w-full'>
        <div className='grid grid-cols-2 items-start lg:grid-cols-3 gap-4'>
          <DetailItem
            label='Category'
            value={audio.category?.name || audio.category}
          />
          <DetailItem
            label='Duration'
            value={formatTime(audio.audio_podcast?.duration || audio.duration)}
          />
          <DetailItem
            label='Release Date'
            value={format(audio.created_at, "dd MMM yyyy")}
          />
          <DetailItem
            label='Genres'
            value={(audio.genre || audio.genres)?.map(
              (genre: any, index: number) => (
                <Badge key={index} className='mr-2'>
                  {genre.text}
                </Badge>
              )
            )}
          />
          <DetailItem
            label='Tags'
            value={(audio.tag || audio.tags)?.map((tag: any, index: number) => (
              <Badge key={index} className='mr-2 items-center'>
                #{tag.text}
              </Badge>
            ))}
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
