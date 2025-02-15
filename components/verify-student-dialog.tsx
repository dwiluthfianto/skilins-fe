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
import axios from '@/utils/axios';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { handleAxiosError } from '@/utils/handle-axios-error';
interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  pathApi: string;
}

const VerifyStudentDialog: FC<DeleteDialogProps> = ({
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
      const { data } = await axios.patch(`${pathApi}/verify-student`);

      const path = pathApi.replace(
        /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
        ''
      );
      toast({
        title: 'Student Verified Succesfully',
        description: data.message,
      });

      mutate(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);
    } catch (error) {
      handleAxiosError(error, 'An error occurred while verify student.');
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
          <DialogTitle>Verify Student</DialogTitle>
          <DialogDescription>
            Are you sure you want to verify this student? Once approved, the
            student can post any contents.
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
                Verifying
              </>
            ) : (
              'Verify'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyStudentDialog;
