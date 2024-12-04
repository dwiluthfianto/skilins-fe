import CommentComponent from "@/components/user-panel/ui/comment";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import ShareButton from "@/components/user-panel/ui/share-button";
import { Star } from "lucide-react";
import { FC } from "react";
import { cn } from "@/lib/utils";

interface FeedbackProps {
  contentUuid: string;
  shareUrl: string;
  titleContent: string;
  creator: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments: [];
  avgRating: number;
  className?: string;
}

const FeedbackComponent: FC<FeedbackProps> = ({
  contentUuid,
  shareUrl,
  titleContent,
  comments,
  avgRating,
  creator,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 min-[1340px]:grid-cols-8 gap-8">
          <ShareButton
            url={shareUrl}
            title={`${titleContent} - ${creator}`}
            className="flex text-end min-[1340px]:justify-end"
          />
          <div className=" min-[1340px]:col-span-5">
            <CommentComponent comments={comments} contentId={contentUuid} />
          </div>
          <Card className="text-center  min-[1340px]:col-span-2 h-fit  max-[1340px]:order-first">
            <CardHeader>
              <div className="flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-yellow-500 text-white text-center flex items-center justify-center">
                  <Star width={32} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="max-w-sm mx-auto">
              <h6 className="text-4xl font-bold text-deep-purple-accent-400">
                {avgRating.toFixed(1)}
              </h6>
              <p className="mb-2 font-bold text-md">Average Rating</p>
              <p className="text-gray-700">
                {`It's an idea that deserves a stellar rating from the wisest
                throughout history.`}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeedbackComponent;
