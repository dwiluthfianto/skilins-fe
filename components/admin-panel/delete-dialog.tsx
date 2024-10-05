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

function DeleteDialog({ isDeleteDialogOpen, setIsDeleteDialogOpen }) {
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
          <Button type="submit" className="bg-red-500 hover:bg-red-300">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
