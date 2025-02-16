/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { GetFirstLetterStr } from '@/utils/get-first-letter-str';
import { Instagram, Linkedin, Users } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface JudgeProps {
  judges: any[];
}

const JudgeLayout: FC<JudgeProps> = ({ judges }) => {
  return (
    <section className='py-6'>
      <div className='container flex flex-col items-center text-center gap-4'>
        <Badge variant='outline'>
          <Users width={14} className='mr-2' />
          Judge
        </Badge>

        <div className='flex gap-2 flex-col'>
          <h2 className='text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular'>
            The mentors guiding your creative journey
          </h2>
          <p className='text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center'>
            {`Offering thoughtful insights and guidance to enhance every student's
            creative expression.`}
          </p>
        </div>
      </div>
      <div className='container mt-16 grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4'>
        {judges.map((judge: any) => (
          <div className='flex flex-col items-start' key={judge.uuid}>
            <Avatar className='size-20 lg:size-24'>
              <AvatarImage src={judge.user.profile} />
              <AvatarFallback>
                {GetFirstLetterStr(judge.user.full_name)}
              </AvatarFallback>
            </Avatar>
            <p className='font-medium'>{judge.user.full_name}</p>
            <p className='text-zinc-600'>{judge.role}</p>
            <div className='mt-2 flex gap-2'>
              {judge.linkedin ? (
                <Link href={judge.linkedin || '#'}>
                  <Linkedin widths={16} />
                </Link>
              ) : (
                ''
              )}
              {judge.instagram ? (
                <Link href={judge.instagram || '#'}>
                  <Instagram widths={16} />
                </Link>
              ) : (
                ''
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JudgeLayout;
