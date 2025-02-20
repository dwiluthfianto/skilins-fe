/* eslint-disable @typescript-eslint/no-explicit-any */
import ContentCard from "@/components/content-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CircleOff,
  MoreHorizontal,
  Send,
  Signature,
  Trash2,
} from "lucide-react";
import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteDialog from "@/components/staff-panel/delete-dialog";
import ApproveDialog from "@/components/staff-panel/approve-dialog";
import RejectDialog from "@/components/staff-panel/reject-dialog";

interface SubmissionProps {
  onUpdateStatus: (status: string) => void;
  status: string;
  submissions: any[];
}

const SubmissionLayout: FC<SubmissionProps> = ({
  onUpdateStatus,
  submissions,
  status,
}) => {
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <section className='w-full py-6'>
      <div className='container mx-auto'>
        <div className='flex text-center justify-center items-center gap-4 flex-col'>
          <Badge variant={"outline"}>
            <Send width={14} className='mr-2' />
            Submission
          </Badge>
          <div className='flex gap-2 flex-col'>
            <h2 className='text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular'>
              Showcasing Talent: Where Every Contestant Shines!
            </h2>
            <p className='text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center'>
              Highlighting the creativity and passion of participants.
            </p>
          </div>
        </div>
      </div>
      <div className='space-x-2 py-8'>
        <Button
          variant={status === "approved" ? "default" : "outline"}
          onClick={() => onUpdateStatus("approved")}
        >
          approved
        </Button>
        <Button
          variant={status === "pending" ? "default" : "outline"}
          onClick={() => onUpdateStatus("pending")}
        >
          pending
        </Button>
        <Button
          variant={status === "rejected" ? "default" : "outline"}
          onClick={() => onUpdateStatus("rejected")}
        >
          Rejected
        </Button>
      </div>
      <div className='w-full grid gap-2 grid-cols-2 md:grid-cols-5'>
        {submissions.map((item: any) => {
          return (
            <div className='relative' key={item.content.slug}>
              {" "}
              {item.content.type === "audio" ? (
                <ContentCard
                  href={`/staff/student-works/audio-podcasts/${item.content.slug}`}
                  variant='audio'
                  imageSrc={item.content.thumbnail}
                  title={item.content.title}
                />
              ) : item.content.type === "video" ? (
                <ContentCard
                  href={`/staff/student-works/video-podcasts/${item.content.slug}`}
                  variant='video'
                  imageSrc={item.content.thumbnail}
                  title={item.content.title}
                />
              ) : (
                <ContentCard
                  className='max-w-[250px]'
                  href={`/staff/student-works/prakerin/${item.content.slug}`}
                  variant='default'
                  imageSrc={item.content.thumbnail}
                  title={item.content.title}
                />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='absolute top-0 end-0 flex p-1 rounded-md transform translate-y-[-8px] translate-x-2 bg-white border dark:bg-neutral-900 dark:ring-neutral-900 items-center h-8 w-8'
                  >
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  {item.content.status === "pending" && (
                    <>
                      <DropdownMenuLabel>Status</DropdownMenuLabel>
                      <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() => setApproveOpen(true)}
                      >
                        <Signature className='mr-2' width={16} /> Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() => setRejectOpen(true)}
                      >
                        <CircleOff className='mr-2' width={16} /> Reject
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => setDeleteOpen(true)}
                  >
                    <Trash2 className='mr-2' width={16} /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ApproveDialog
                open={approveOpen}
                onOpenChange={setApproveOpen}
                pathApi={`/competitions/submissions/${item.uuid}`}
              />
              <RejectDialog
                open={rejectOpen}
                onOpenChange={setRejectOpen}
                pathApi={`/competitions/submissions/${item.uuid}`}
              />
              <DeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                pathApi={`/contents/audios/${item.uuid}`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SubmissionLayout;
