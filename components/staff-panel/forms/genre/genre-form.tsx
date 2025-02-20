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

import axios from "@/utils/axios";
import { toast } from "@/hooks/use-toast";
import { mutate } from "swr";
import Compressor from "compressorjs";
import { handleAxiosError } from "@/utils/handle-axios-error";

const GenreSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required" }),
  avatar: z.instanceof(File).optional(),
});

function GenreForm() {
  const form = useForm<z.infer<typeof GenreSchema>>({
    resolver: zodResolver(GenreSchema),
    defaultValues: {
      name: "",
      description: "",
      avatar: undefined,
    },
  });

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      form.reset({
        name: "",
        description: "",
        avatar: undefined,
      });
    }
  }, [open, form]);

  const [avatar, setAvatar] = React.useState<File | null>(null);
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Compress image using Compressor.js
      new Compressor(file, {
        quality: 0.6, // Set the quality for compression (0.0 to 1.0)
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

  async function onSubmit(data: z.infer<typeof GenreSchema>) {
    const formData = new FormData();
    formData.append("name", data.name.toLowerCase());
    formData.append("description", data.description);
    if (avatar) formData.append("avatar", avatar);

    try {
      const { data: genreData } = await axios.post("/genres", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Genre Added Successfully!",
        description: genreData.message,
      });

      mutate("/genres");

      setOpen(false);
    } catch (error) {
      handleAxiosError(error, "An error occurred while add the genre.");

      setOpen(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Tag width={16} className='mr-2' /> Add genre
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Genre</DialogTitle>
          <DialogDescription>
            {"Add new data genre here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-4 py-4'
          >
            <FormField
              control={form.control}
              name='avatar'
              render={() => (
                <FormItem className='grid grid-cols-4 items-center gap-2'>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl className='col-span-3'>
                    <Input type='file' onChange={handleAvatarChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-2'>
                  <FormLabel>Name</FormLabel>
                  <FormControl className='col-span-3'>
                    <Input {...field} type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-2'>
                  <FormLabel>Description</FormLabel>
                  <FormControl className='col-span-3'>
                    <Input {...field} type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default GenreForm;
