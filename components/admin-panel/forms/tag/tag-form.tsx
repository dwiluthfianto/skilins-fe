"use client";

import { Tag } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";

import axios from "../../../../utils/axios";
import { toast } from "@/hooks/use-toast";
import { mutate } from "swr";

const TagSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required" }),
  avatar: z.instanceof(File).optional(),
});

function TagForm() {
  const form = useForm<z.infer<typeof TagSchema>>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      name: "",
      description: "",
      avatar: undefined,
    },
  });

  const [open, setOpen] = React.useState(false);

  const [avatar, setAvatar] = React.useState<File | null>(null);

  async function onSubmit(data: z.infer<typeof TagSchema>) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (avatar) formData.append("avatar_url", avatar);

    try {
      const { data: majorData } = await axios.post("/tags", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Major Added Successfully!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(majorData.message, null, 2)}
            </code>
          </pre>
        ),
      });

      mutate("/tags");

      setOpen(false);
    } catch (error) {
      toast({
        title: "Error!",
        description:
          JSON.stringify(error?.message) ||
          "An error occurred while add the tag.",
        variant: "destructive",
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Tag width={16} className="mr-2" /> Add tag
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Tag</DialogTitle>
          <DialogDescription>
            {"Add new data tag here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Avatar</FormLabel>
                  <FormControl className="col-span-3">
                    <Input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files) {
                          setAvatar(e.target.files[0]);
                          field.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl className="col-span-3">
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl className="col-span-3">
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default TagForm;
