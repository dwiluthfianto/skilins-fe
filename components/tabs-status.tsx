import { FC } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface TabProps {
  className?: string;
  status: string;
  onUpdateStatus: (status: string) => void;
}

const TabsStatus: FC<TabProps> = ({ status, onUpdateStatus, className }) => {
  return (
    <div className={cn("flex flex-wrap gap-2 py-8", className)}>
      <Button
        variant={status === "APPROVED" ? "default" : "outline"}
        onClick={() => onUpdateStatus("APPROVED")}
      >
        Approved
      </Button>
      <Button
        variant={status === "PENDING" ? "default" : "outline"}
        onClick={() => onUpdateStatus("PENDING")}
      >
        Pending
      </Button>
      <Button
        variant={status === "REJECTED" ? "default" : "outline"}
        onClick={() => onUpdateStatus("REJECTED")}
      >
        Rejected
      </Button>
    </div>
  );
};

export default TabsStatus;
