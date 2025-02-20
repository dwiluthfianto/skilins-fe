import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import MinimalTiptapPreview from "@/components/minimal-tiptap/minimal-tiptap-preview";

interface VideoDetailProps {
  video: any;
  embedUrl: string | null;
  statusBadge?: React.ReactNode;
}

export function VideoDetail({
  video,
  embedUrl,
  statusBadge,
}: VideoDetailProps) {
  return (
    <section className='md:py-2'>
      <div className='md:container'>
        {statusBadge}
        <div className='mt-4'>
          <AspectRatio ratio={16 / 9}>
            <iframe
              className='w-full h-full'
              src={embedUrl || undefined}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; clipboard-write; encrypted-media; gyroscope; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </AspectRatio>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 mt-8'>
          <div className='col-span-4'>
            <Card className='rounded-lg'>
              <CardContent className='p-6'>
                <p className='text-lg text-muted-foreground'>
                  {video.video_podcast?.creator?.name || video.creator}
                </p>
                <h2 className='text-balance text-3xl font-medium md:text-5xl'>
                  {video.title}
                </h2>
                {/* Description section */}
                <DescriptionSection description={video.description} />
                {/* Details section */}
                <VideoDetailsSection video={video} />
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

function VideoDetailsSection({ video }: { video: any }) {
  return (
    <div className='flex gap-4 py-4 lg:py-8 flex-col items-start'>
      <div className='flex gap-2 flex-col'>
        <p className='text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight font-medium'>
          Detail Video
        </p>
      </div>
      <div className='flex flex-col w-full'>
        <div className='grid grid-cols-2 items-start lg:grid-cols-3 gap-4'>
          {/* Category */}
          <DetailItem
            label='Category'
            value={video.category?.name || video.category}
          />
          {/* Release Date */}
          <DetailItem
            label='Release Date'
            value={format(video.created_at, "dd MMM yyyy")}
          />
          {/* Genres/Subjects */}
          <DetailItem
            label='Subjects'
            value={(video.genre || video.genres)?.map(
              (genre: any, index: number) => (
                <Badge key={index} className='mr-2'>
                  {genre.text}
                </Badge>
              )
            )}
          />
          {/* Tags */}
          <DetailItem
            label='Tags'
            value={(video.tag || video.tags)?.map((tag: any, index: number) => (
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
