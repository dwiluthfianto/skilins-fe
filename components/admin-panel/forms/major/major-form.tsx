"use client";

import { SquareUser } from "lucide-react";

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

import axios from "@/utils/axios";
import { toast } from "@/hooks/use-toast";
import { mutate } from "swr";
import Compressor from "compressorjs";
import { AxiosError } from "axios";

const MajorSchema = z.object({
  image: z.instanceof(File).optional(),
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required" }),
  avatar: z.instanceof(File).optional(),
});

function MajorForm() {
  const form = useForm<z.infer<typeof MajorSchema>>({
    resolver: zodResolver(MajorSchema),
    defaultValues: {
      image: undefined,
      name: "",
      description: "",
      avatar: undefined,
    },
  });

  const [open, setOpen] = React.useState(false);

  const [image, setImage] = React.useState<File | null>(null);
  const [avatar, setAvatar] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (!open) {
      form.reset({
        image: undefined,
        avatar: undefined,
        name: "",
        description: "",
      });
    }
  }, [open, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Compress image using Compressor.js
      new Compressor(file, {
        quality: 0.6, // Set the quality for compression (0.0 to 1.0)
        maxWidth: 1200,
        maxHeight: 1000,
        success(compressedBlob) {
          // Convert the Blob back to a File
          const compressedFile = new File([compressedBlob], file.name, {
            type: compressedBlob.type,
            lastModified: Date.now(),
          });
          setImage(compressedFile);
        },
        error(err) {
          console.error("Compression failed:", err.message);
        },
      });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Compress image using Compressor.js
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 800,
        maxHeight: 800,
        success(compressedBlob) {
          // Convert the Blob back to a File
          const compressedFile = new File([compressedBlob], file.name, {
            type: compressedBlob.type,
            lastModified: Date.now(),
          });
          setAvatar(compressedFile);
        },
        error(err) {
          console.error("Compression failed:", err.message);
        },
      });
    }
  };

  async function onSubmit(data: z.infer<typeof MajorSchema>) {
    const formData = new FormData();
    if (image) formData.append("image_url", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (avatar) formData.append("avatar_url", avatar);

    try {
      const { data: majorData } = await axios.post("/majors", formData, {
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

      mutate("/majors");

      setOpen(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast({
          title: "Error!",
          description:
            JSON.stringify(error?.message) ||
            "An error occurred while add the major.",
          variant: "destructive",
        });
      }
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <SquareUser className="mr-2" width={16} /> Add Major
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Major</DialogTitle>
          <DialogDescription>
            {"Add new data major here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Image</FormLabel>
                  <FormControl className="col-span-3">
                    <Input type="file" onChange={handleImageChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={() => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Avatar</FormLabel>
                  <FormControl className="col-span-3">
                    <Input type="file" onChange={handleAvatarChange} />
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

export default MajorForm;
