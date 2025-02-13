import { Library } from 'lucide-react';

interface LoadingProps {
  text?: string;
  showIcon?: boolean;
}

export function Loading({ text = 'Preparing your workspace' }: LoadingProps) {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-4'>
      <div className='flex gap-1'>
        <div className='size-2 bg-primary rounded-full animate-[bounce_0.7s_infinite]' />
        <div className='size-2 bg-primary rounded-full animate-[bounce_0.7s_0.1s_infinite]' />
        <div className='size-2 bg-primary rounded-full animate-[bounce_0.7s_0.2s_infinite]' />
      </div>
      <div className='flex items-center gap-2'>
        <p className='text-sm text-muted-foreground'>{text}</p>
      </div>
    </div>
  );
}
