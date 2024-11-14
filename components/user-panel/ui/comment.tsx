/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/use-user";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/utils/axios";
import { format } from "date-fns";
import {
  MessageSquareWarning,
  MoreHorizontal,
  PencilRuler,
  Trash2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GetFirstLetterStr } from "@/utils/get-first-letter-str";
import { FC } from "react";
import { cn } from "@/lib/utils";

const CommentSchema = z.object({
  content: z
    .string()
    .min(10, {
      message: "Comment must be at least 10 characters.",
    })
    .max(160, {
      message: "Comment must not be longer than 30 characters.",
    }),
});

interface CommentProps {
  comments: [];
  contentId: string;
  className?: string;
}

const CommentComponent: FC<CommentProps> = ({
  comments,
  contentId,
  className,
}) => {
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: "",
    },
  });

  const { user } = useUser();

  async function onSubmit(data: z.infer<typeof CommentSchema>) {
    const formData = new FormData();
    formData.append("commented_by", user?.data.uuid);
    formData.append("comment_content", data.content);

    try {
      await axios.post(`/comments/${contentId}/create`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    } catch (error) {}
  }

  async function handleDeleteComment(userUuid: string, commentUuid: string) {
    try {
      await axios.post(`/comments/${contentId}/remove`, {
        commentBy: userUuid,
        commentUuid: commentUuid,
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <CardContent>
          <CardHeader className="px-0 pt-6 pb-2">
            <CardTitle className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Comments {`(${comments.length})`}
            </CardTitle>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel htmlFor="comment" className="sr-only">
                      Your comment
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="comment"
                        rows={6}
                        {...field}
                        className=" w-full text-sm text-gray-900  focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 border"
                        placeholder="Write a comment..."
                        required
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!user ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger disabled>
                      <Button disabled>Post comment</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You need to log in to post a comment.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Button type="submit">Post comment</Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {comments
          ? comments?.map((comment: any, index: number) => {
              return (
                <Card key={index} className="text-base rounded-lg ">
                  <CardContent className="p-6">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage
                            key={comment?.profile}
                            src={`${comment?.profile}`}
                            className="object-cover object-center"
                          />
                          <AvatarFallback>
                            {GetFirstLetterStr(comment?.commented_by)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-gray-900 dark:text-white font-semibold">
                          {comment.commented_by}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {format(comment.created_at, "MMM. dd, yyyy")}
                        </p>
                      </div>
                      {user?.data.uuid === comment.commented_by_uuid ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                              <PencilRuler className="mr-2" width={16} /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                handleDeleteComment(
                                  user?.data.uuid,
                                  comment.uuid
                                )
                              }
                            >
                              <Trash2 className="mr-2" width={16} /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                              <MessageSquareWarning
                                className="mr-2"
                                width={16}
                              />{" "}
                              Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">
                      {comment.subject}
                    </p>
                  </CardContent>
                </Card>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default CommentComponent;
