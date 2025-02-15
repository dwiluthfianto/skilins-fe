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
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { handleAxiosError } from '@/utils/handle-axios-error';
interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  pathApi: string;
}

const DeleteDialog: FC<DeleteDialogProps> = ({
  open,
  onOpenChange,
  className,
  pathApi,
}) => {
  const [loading, setLoading] = useState(false);
  const deleteHandle = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(pathApi);

      const path = pathApi.split('/').slice(1, -1).join('/');

      toast({
        title: 'Delete Successful!',
        description: data.message,
      });

      await mutate(
        `${process.env.NEXT_PUBLIC_API_URL}/${path}`,
        async (currentData: any) => {
          if (currentData) {
            return currentData.filter((item: any) => item.uuid !== data.uuid);
          }
          return currentData;
        },
        { revalidate: true }
      );

      onOpenChange(false);
    } catch (error) {
      handleAxiosError(error, 'An error occurred while delete the content.');
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        <DialogHeader>
          <DialogTitle>Are you sure? </DialogTitle>
          <DialogDescription>
            Do you really want to delete these records? This process cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => deleteHandle()}
            type='submit'
            disabled={loading}
            variant={'destructive'}
          >
            {loading ? (
              <>
                <Loader2 className='animate-spin' />
                Deleting
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
