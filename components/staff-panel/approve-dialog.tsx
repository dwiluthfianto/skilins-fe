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
import { AxiosError } from 'axios';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApprovedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  pathApi: string;
}

const ApprovedDialog: FC<ApprovedDialogProps> = ({
  open,
  onOpenChange,
  className,
  pathApi,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const approveHandle = async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch(`${pathApi}/approve`);

      const path = pathApi.replace(
        /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
        ''
      );
      toast({
        title: 'Content approved Succesfully',
        description: data.message,
      });

      mutate(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast({
          title: 'Error!',
          description:
            error?.response.data.message ||
            error?.response.data.error ||
            'An error occurred while approve the content.',
          variant: 'destructive',
        });
      }
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
          <DialogTitle>Confirm Approval</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this content? Once approved, it
            will be published and visible to others.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => approveHandle()}
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
              'Approve'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApprovedDialog;
