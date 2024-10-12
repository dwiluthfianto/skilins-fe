/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BookMarked, CalendarIcon, CheckIcon, CircleX } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

const EbookSchema = z.object({
  title: z
    .string()
    .min(5, { message: "title must be longer than or equal to 5 characters" }),
  thumbnail: z.instanceof(File).optional(),
  description: z.string().min(1, { message: "Category is required." }),
  subjects: z.array(z.string()).optional(),
  category: z.string().min(1, { message: "Category is required." }),
  pages: z
    .number()
    .min(1, { message: "Pages must be greater than 0." })
    .nonnegative(),
  publication: z.string().min(1, { message: "Author is required." }),
  file: z.instanceof(File),
  author: z.string().min(1, { message: "Author is required." }),
  isbn: z.string().min(1, { message: "ISBN is required." }),
  release_date: z.date().optional(),
  tags: z.array(z.object({ name: z.string().min(1) })),
});

function EbookForm() {
  const form = useForm<z.infer<typeof EbookSchema>>({
    resolver: zodResolver(EbookSchema),
    defaultValues: {
      title: "",
      thumbnail: undefined,
      description: "",
      subjects: [],
      category: "",
      pages: 0,
      file: undefined,
      author: "",
      publication: "",
      release_date: new Date(),
      isbn: "",
      tags: [],
    },
  });

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      form.reset({
        title: "",
        thumbnail: undefined,
        description: "",
        subjects: [],
        category: "",
        pages: 0,
        file: undefined,
        author: "",
        publication: "",
        release_date: new Date(),
        isbn: "",
        tags: [],
      });
    }
  }, [open, form]);
  const [inputTag, setInputTag] = React.useState<string>("");
  const [inputSubject, setInputSubject] = React.useState<string>("");

  const [image, setImage] = React.useState<File | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const { categories } = useCategory();

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

  async function onSubmit(data: z.infer<typeof EbookSchema>) {
    const formData = new FormData();
    if (image) formData.append("thumbnail", image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("subjects", JSON.stringify(data.subjects));
    formData.append("category_name", data.category);
    formData.append("pages", String(data.pages));
    if (file) formData.append("file_url", file);
    formData.append("author", data.author);
    formData.append("publication", data.publication);
    formData.append("isbn", data.isbn);
    formData.append("release_date", String(data.release_date));
    formData.append("tags", JSON.stringify(data.tags));

    try {
      const { data: ebookData } = await axios.post(
        "/contents/ebooks",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Ebook Added Successfully!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(ebookData.message, null, 2)}
            </code>
          </pre>
        ),
      });

      mutate("/contents/ebooks");

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <BookMarked className="mr-2" width={16} /> Add ebook
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add ebook</DialogTitle>
          <DialogDescription>
            {"Add new data ebook here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <div>
              <ScrollArea className="h-[500px] pr-4">
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>Thumbnail</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files) {
                                setImage(e.target.files[0]);
                                field.onChange(e.target.files[0]);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>File Novel</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => {
                              if (e.target.files) {
                                setFile(e.target.files[0]);
                                field.onChange(e.target.files[0]);
                              }
                            }}
                          />
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
                          <Textarea {...field} className="resize-none" />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pages"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>Pages</FormLabel>
                      <div className="col-span-3">
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>Author</FormLabel>
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
                                        form.setValue(
                                          "category",
                                          category.name
                                        );
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
                          {subjects.map((subject, index) => (
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
                <FormField
                  control={form.control}
                  name="publication"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>Publication</FormLabel>
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
                  name="isbn"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>ISBN</FormLabel>
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
                  name="release_date"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>Release Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild className="col-span-3">
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ScrollArea>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EbookForm;
