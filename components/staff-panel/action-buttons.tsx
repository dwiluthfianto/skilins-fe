"use client";

import { useState } from "react";
import DeleteDialog from "@/components/staff-panel/delete-dialog";
import ApprovedDialog from "@/components/staff-panel/approve-dialog";
import RejectDialog from "@/components/staff-panel/reject-dialog";
import { Button } from "@/components/ui/button";
import { CircleOff, Signature, Trash2 } from "lucide-react";
type ActionButtonsProps = {
  contentUuid: string;
  contentType: "videos" | "audios" | "prakerin" | "stories";
};

export function ActionButtons({
  contentUuid,
  contentType,
}: ActionButtonsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  return (
    <div className='flex gap-2'>
      <Button variant='default' onClick={() => setApproveOpen(true)}>
        <Signature className='mr-2' width={16} />
        Approve
      </Button>

      <Button variant='destructive' onClick={() => setRejectOpen(true)}>
        <CircleOff className='mr-2' width={16} />
        Reject
      </Button>

      <Button variant='secondary' onClick={() => setIsDeleteDialogOpen(true)}>
        <Trash2 className='mr-2' width={16} />
        Delete
      </Button>

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        pathApi={`/contents/${contentType}/${contentUuid}`}
      />
      <ApprovedDialog
        open={approveOpen}
        onOpenChange={setApproveOpen}
        pathApi={`/contents/${contentUuid}`}
      />
      <RejectDialog
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        pathApi={`/contents/${contentUuid}`}
      />
    </div>
  );
}
