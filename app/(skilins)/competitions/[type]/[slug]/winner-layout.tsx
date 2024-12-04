/* eslint-disable @typescript-eslint/no-explicit-any */
import { Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FC } from 'react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';

interface WinnerProps {
  Winners: [];
}

const WinnerLayout: FC<WinnerProps> = ({ Winners }) => {
  return (
    Winners && (
      <section className='w-full py-6'>
        <div className='container mx-auto'>
          <div className='flex text-center justify-center items-center gap-4 flex-col'>
            <Badge variant={'outline'}>
              <Crown width={14} className='mr-2' />
              Winner
            </Badge>
            <div className='flex gap-2 flex-col'>
              <h2 className='text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular'>
                The Winner of Competition
              </h2>
              <p className='text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center'>
                Celebrating every victory while inspiring growth and
                determination in our journey to success.
              </p>
            </div>
            <div className='grid pt-20 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8'>
              {Winners.map((item: any) => {
                return (
                  <Card className='w-full rounded-md ' key={item.uuid}>
                    <CardHeader>
                      <div className='flex items-end justify-center'>
                        <h1 className='text-center font-bold text-6xl'>
                          #{item.rank}
                        </h1>
                        <div className='font-semibold'>
                          <p>SKILINS</p>
                          <p>COMPETITION</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={item.submission.content.thumbnail}
                          fill
                          objectFit='cover'
                          objectPosition='center'
                          alt='winners'
                        ></Image>
                      </AspectRatio>
                      <h1 className='text-2xl font-bold text-center'>
                        {item.submission.content.title}
                      </h1>
                      <p className='text-center'>
                        {item.submission.student.name}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default WinnerLayout;
