import { AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function Error({
  title = 'Oops! Something went wrong',
  message = 'We encountered an error while loading the data',
  onRetry,
}: ErrorProps) {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-6'>
      <div className='relative'>
        <div className='absolute inset-0 animate-ping rounded-full bg-destructive/20' />
        <div className='relative'>
          <AlertCircle className='size-12 text-destructive animate-[bounce_2s_ease-in-out_infinite]' />
        </div>
      </div>

      <div className='flex flex-col items-center gap-2 text-center'>
        <h2 className='text-2xl font-semibold'>{title}</h2>
        <p className='text-sm text-muted-foreground max-w-[300px]'>{message}</p>
      </div>

      {onRetry && (
        <Button variant='outline' onClick={onRetry} className='animate-bounce'>
          Try Again
        </Button>
      )}
    </div>
  );
}
