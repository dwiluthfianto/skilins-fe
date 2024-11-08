/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { mutate } from "swr";
import axios from "../../utils/axios";
import { AxiosError } from "axios";

function DeleteDialog({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  pathApi,
}: any) {
  const deleteHandle = async () => {
    try {
      const { data } = await axios.delete(pathApi);

      const path = pathApi.replace(
        /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
        ""
      );
      toast({
        title: "Delete Successful!",
        description: data.message,
      });

      mutate(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast({
          title: "Error!",
          description:
            error?.response.data.statusCode === 400
              ? "cannot be deleted because content is used"
              : "An error occurred while delete the content.",
          variant: "destructive",
        });
      }
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Dialog
      open={isDeleteDialogOpen}
      onOpenChange={isDeleteDialogOpen ? setIsDeleteDialogOpen : false}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure? </DialogTitle>
          <DialogDescription>
            Do you really want to delete these records? This process cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => deleteHandle()}
            type="submit"
            className="bg-red-500 hover:bg-red-300"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
