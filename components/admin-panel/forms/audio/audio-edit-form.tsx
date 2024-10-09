/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CheckIcon, CircleX } from "lucide-react";
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
import { useCategory } from "@/hooks/use-category";
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
import { useStudent } from "@/hooks/use-student";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/libs/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const AudioSchema = z.object({
  title: z
    .string()
    .min(5, { message: "title must be longer than or equal to 5 characters" }),
  thumbnail: z.instanceof(File).optional(),
  description: z.string().min(1, { message: "Category is required." }),
  subjects: z.array(z.string()).optional(),
  category: z.string().min(1, { message: "Category is required." }),
  duration: z
    .number()
    .min(1, { message: "Duration must be greater than 0." })
    .nonnegative(),
  file: z.instanceof(File, { message: "File is required." }),
  creator: z.string().min(1, { message: "Creator is required." }),
  tags: z.array(z.object({ name: z.string().min(1) })),
});

function AudioEditForm({ isEditDialogOpen, setIsEditDialogOpen, values }: any) {
  const form = useForm<z.infer<typeof AudioSchema>>({
    resolver: zodResolver(AudioSchema),
    defaultValues: {
      title: values?.title || "",
      thumbnail: undefined,
      description: values?.description || "",
      subjects: values?.subjects || [],
      category: values?.category || "",
      duration: values?.duration || 0,
      file: undefined,
      creator: values?.creator || "",
      tags: values?.tags || [],
    },
  });

  const { categories } = useCategory();
  const { student, isLoading, isError } = useStudent();

  React.useEffect(() => {
    const initialCreator = values?.creator;
    if (initialCreator) {
      const foundStudent = student?.data.find(
        (st: any) => st.name === initialCreator
      );
      if (foundStudent) {
        setCreatorUuid(foundStudent.uuid);
        form.setValue("creator", foundStudent.name);
      }
    }
  }, [values?.creator, student?.data]);

  React.useEffect(() => {
    if (!isEditDialogOpen) {
      form.reset({
        title: values?.title || "",
        thumbnail: undefined,
        description: values?.description || "",
        subjects: values?.subjects || [],
        category: values?.category || "",
        duration: values?.duration || 0,
        file: undefined,
        creator:
          values?.creator === student?.data.name ? student?.data?.uuid : "",
        tags: values?.tags || [],
      });
    }
  }, [isEditDialogOpen, values, form]);

  const [inputTag, setInputTag] = React.useState<string>("");
  const [inputSubject, setInputSubject] = React.useState<string>("");

  const [image, setImage] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(
    values?.thumbnail || null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [fileMedia, setFileMedia] = React.useState<File | null>(null);
  const [fileUrl, setFileUrl] = React.useState<string | null>(
    values?.file_url || null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileMedia(file);
      form.setValue("file", file);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFileUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const [creatorUuid, setCreatorUuid] = React.useState<string>("");

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>Error</h1>;

  const tags = form.watch("tags") || [];

  const addTag = () => {
    if (inputTag.trim() !== "") {
      form.setValue("tags", [...tags, { name: inputTag }]);
      setInputTag("");
    }
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    form.setValue("tags", updatedTags);
  };

  const subjects = form.watch("subjects") || [];

  const addSubject = () => {
    if (inputSubject.trim() !== "") {
      form.setValue("subjects", [...subjects, inputSubject]);
      setInputSubject("");
    }
  };

  const removeSubject = (index: number) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    form.setValue("subjects", updatedSubjects);
  };

  async function onSubmit(data: z.infer<typeof AudioSchema>) {
    const formData = new FormData();
    if (image) formData.append("thumbnail", image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("subjects", JSON.stringify(data.subjects));
    formData.append("category_name", data.category);
    formData.append("duration", String(data.duration));
    if (fileMedia) formData.append("file_url", fileMedia);
    formData.append("creator_uuid", creatorUuid);
    formData.append("tags", JSON.stringify(data.tags));

    try {
      const { data: studentData } = await axios.patch(
        `/contents/audios/${values?.uuid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Student Added Successfully!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(studentData.message, null, 2)}
            </code>
          </pre>
        ),
      });

      mutate("/contents/audios");

      setIsEditDialogOpen(false);
    } catch (error) {
      console.log(error);

      toast({
        title: "Error!",
        description: "An error occurred while update the audio.",
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
          <DialogTitle>Update audio podcast</DialogTitle>
          <DialogDescription>
            {"Update data audio podcast here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <ScrollArea className="h-[500px]">
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
                        alt="Current student image"
                        className="object-cover"
                        fill
                      />
                    </AspectRatio>
                  </div>
                </div>
              )}
              <FormField
                control={form.control}
                name="thumbnail"
                render={() => (
                  <FormItem className="grid grid-cols-4 items-center gap-2">
                    <FormLabel>Thumbnail</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input type="file" onChange={handleImageChange} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem className="grid grid-cols-4 items-center gap-2">
                    <FormLabel>File Audio</FormLabel>
                    <div className="col-span-3">
                      {fileUrl && (
                        <div className="my-2">
                          <audio controls>
                            <source src={fileUrl} type="audio/mpeg" />
                            Your browser does not support the audio tag.
                          </audio>
                        </div>
                      )}
                      <FormControl>
                        <Input type="file" onChange={handleFileChange} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-2">
                    <FormLabel>Title</FormLabel>
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
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-2">
                    <FormLabel>Duration</FormLabel>
                    <div className="col-span-2">
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min={0}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value ? Number(value) : 0);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                    <div className="col-span-1">
                      <p>Minutes</p>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="creator"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-2">
                    <FormLabel>Creator</FormLabel>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? student?.data.find(
                                    (st: any) => st.name === field.value
                                  )?.name
                                : "Select creator"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search students..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No student found.</CommandEmpty>
                              <CommandGroup>
                                {student?.data.map((st: any) => (
                                  <CommandItem
                                    value={st.name}
                                    key={st.uuid}
                                    onSelect={() => {
                                      form.setValue("creator", st.name);
                                      setCreatorUuid(st.uuid);
                                    }}
                                  >
                                    {st.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        st.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-2">
                    <FormLabel>Category</FormLabel>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? categories?.find(
                                    (category: any) =>
                                      category.name === field.value
                                  )?.name
                                : "Select category"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search categories..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No category found.</CommandEmpty>
                              <CommandGroup>
                                {categories?.map((category: any) => (
                                  <CommandItem
                                    value={category.name}
                                    key={category.uuid}
                                    onSelect={() => {
                                      form.setValue("category", category.name);
                                    }}
                                  >
                                    {category.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        category.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subjects"
                render={() => (
                  <FormItem className="grid grid-cols-4 items-center gap-2">
                    <FormLabel>Subjects</FormLabel>
                    <div className="col-span-3 relative">
                      <div className="flex flex-wrap items-center gap-2">
                        {form.getValues("subjects")?.map((subject, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-full"
                          >
                            <span>{subject}</span>
                            <button
                              type="button"
                              className="ml-2"
                              onClick={() => removeSubject(index)}
                            >
                              <CircleX size={16} />
                            </button>
                          </div>
                        ))}
                        <Input
                          value={inputSubject}
                          onChange={(e) => setInputSubject(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addSubject();
                            }
                          }}
                          placeholder="Add a subject and press Enter"
                          className="flex-grow"
                        />
                      </div>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem className="grid grid-cols-4 items-center gap-2">
                    <FormLabel>Tags</FormLabel>
                    <div className="col-span-3 relative">
                      <div className="flex flex-wrap items-center gap-2">
                        {tags.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-full"
                          >
                            <span>{tag.name}</span>
                            <button
                              type="button"
                              className="ml-2"
                              onClick={() => removeTag(index)}
                            >
                              <CircleX size={16} />
                            </button>
                          </div>
                        ))}
                        <Input
                          value={inputTag}
                          onChange={(e) => setInputTag(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag();
                            }
                          }}
                          placeholder="Add a tag and press Enter"
                          className="flex-grow"
                        />
                      </div>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Update</Button>
              </DialogFooter>
            </form>
          </ScrollArea>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AudioEditForm;
