/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { mutate } from 'swr';
import axios from '../../utils/axios';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { handleAxiosError } from '@/utils/handle-axios-error';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  pathApi: string;
}

const RejectDialog: FC<DialogProps> = ({
  open,
  onOpenChange,
  className,
  pathApi,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const rejectHandle = async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch(`${pathApi}/reject`);

      const path = pathApi.replace(
        /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
        ''
      );
      toast({
        title: 'Content Rejected Successfully!',
        description: data.message,
      });

      mutate(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);
    } catch (error) {
      handleAxiosError(error, 'An error occurred while reject the content.');

      onOpenChange(false);
    } finally {
      router.refresh();
      onOpenChange(false);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        <DialogHeader>
          <DialogTitle>Confirm Rejection</DialogTitle>
          <DialogDescription>
            Are you sure you want to reject this content? Once rejected, the
            author will be notified, and it will not be published.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => rejectHandle()}
            type='submit'
            disabled={loading}
            variant={'default'}
          >
            {loading ? (
              <>
                <Loader2 className='animate-spin' />
                Loading
              </>
            ) : (
              'Reject'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectDialog;
