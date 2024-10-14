/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { AspectRatio } from "../../../ui/aspect-ratio";
import Image from "next/image";
import Compressor from "compressorjs";

const TagSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required" }),
  avatar: z.instanceof(File).optional(),
});

function TagEditForm({ isEditDialogOpen, setIsEditDialogOpen, values }: any) {
  const form = useForm<z.infer<typeof TagSchema>>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      avatar: undefined,
      name: values?.name || "",
      description: values?.description || "",
    },
  });

  React.useEffect(() => {
    if (!isEditDialogOpen) {
      form.reset({
        avatar: undefined,
        name: values?.name || "",
        description: values?.description || "",
      });
      setImageUrl(values?.avatar_url || null); // Reset avatar URL
    }
  }, [isEditDialogOpen, values, form]);

  const [avatar, setAvatar] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(
    values?.avatar_url || null
  );

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Kompresi file gambar
      new Compressor(file, {
        quality: 0.6, // Ubah kualitas kompresi
        maxWidth: 800, // Resolusi maksimal
        maxHeight: 800,
        success(compressedBlob) {
          const compressedFile = new File([compressedBlob], file.name, {
            type: compressedBlob.type,
            lastModified: Date.now(),
          });
          setAvatar(compressedFile);

          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              setImageUrl(event.target.result as string);
            }
          };
          reader.readAsDataURL(compressedFile);
        },
        error(err) {
          console.error("Compression failed:", err.message);
        },
      });
    }
  };

  async function onSubmit(data: z.infer<typeof TagSchema>) {
    const formData = new FormData();
    if (avatar) {
      formData.append("avatar_url", avatar);
    } else if (imageUrl) {
      formData.append("avatar_url", imageUrl);
    }
    formData.append("name", data.name);
    formData.append("description", data.description);

    try {
      const { data: tagData } = await axios.patch(
        `/tags/${values?.uuid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Tag Updated Successfully!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(tagData.message, null, 2)}
            </code>
          </pre>
        ),
      });

      mutate("/tags");

      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred while update the tag.",
        variant: "destructive",
      });
    }
  }
  return (
    <Dialog
      open={isEditDialogOpen}
      onOpenChange={isEditDialogOpen ? setIsEditDialogOpen : false}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update tag</DialogTitle>
          <DialogDescription>
            {"Add new data values here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            {imageUrl && (
              <div className="grid grid-cols-4 items-center gap-2">
                <div className="col-span-1">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={imageUrl}
                      alt="Current image avatar"
                      className="object-cover"
                      fill
                    />
                  </AspectRatio>
                </div>
              </div>
            )}
            <FormField
              control={form.control}
              name="avatar"
              render={() => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Avatar</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input type="file" onChange={handleAvatarChange} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Name</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2">
                  <FormLabel>Description</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </div>
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

export default TagEditForm;
