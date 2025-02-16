import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from '@/utils/axios';
import { handleAxiosError } from '@/utils/handle-axios-error';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CustomCalendar } from '@/components/ui/custom-calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMajor } from '@/hooks/use-major';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const allowedDomains = ['@gmail.com', '@skilins.com'];

const StudentSchema = z.object({
  nis: z.coerce.number().min(1, {
    message: 'This field has to be filled.',
  }),
  name: z.string().min(4, {
    message: 'Full name must be at least 4 characters.',
  }),
  major: z.string().min(1, {
    message: 'Major has to be filled.',
  }),
  birthplace: z.string().min(1, {
    message: 'Birthplace has to be filled.',
  }),
  birthdate: z.coerce.date(),
  sex: z.enum(['male', 'female'], {
    required_error: 'You need to select a sex.',
  }),
});

export default function StudentEditForm({
  isEditDialogOpen,
  setIsEditDialogOpen,
  values,
}: any) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { major } = useMajor();
  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      nis: values?.nis || 0,
      name: values?.name || '',
      major: values?.major?.name || '',
      birthplace: values?.birthplace || '',
      birthdate: values?.birthdate || new Date(),
      sex: values?.sex || 'male',
    },
  });

  useEffect(() => {
    if (values) {
      form.reset({
        nis: values.nis,
        name: values.name,
        major: values.major.name,
        birthplace: values.birthplace,
        birthdate: values.birthdate,
        sex: values.sex,
      });
    }
  }, [values, form]);

  async function onSubmit(data: z.infer<typeof StudentSchema>) {
    setLoading(true);

    const payload = {
      name: data.name,
      nis: data.nis.toString(),
      major: data.major,
      birthplace: data.birthplace,
      birthdate: data.birthdate,
      sex: data.sex,
    };
    try {
      const { data: studentData } = await axios.patch(
        `/students/${values?.uuid}`,
        payload
      );

      toast({
        title: 'Success!',
        description: studentData.message,
      });
    } catch (error) {
      handleAxiosError(error, 'An error occurred while update the student.');
    } finally {
      setLoading(false);
      setIsEditDialogOpen(false);
    }
  }
  return (
    <Sheet open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update Student</SheetTitle>
          <SheetDescription>
            Update student, fill the information below. Click update student to
            save.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-4 mt-8'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>
                    Full name <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. John Doe' {...field} type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='nis'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>
                    NIS <span className='text-red-500'>*</span>{' '}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g. 1234567890'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='major'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Major</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='col-span-3'>
                        <SelectValue placeholder='Select a major' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {major.map((m: { name: string; uuid: string }) => (
                        <div key={m.uuid}>
                          <SelectItem value={m.name}>{m.name}</SelectItem>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sex'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Sex</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-row items-center space-x-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='male' />
                        </FormControl>
                        <FormLabel className='font-normal'>Male</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='female' />
                        </FormControl>
                        <FormLabel className='font-normal'>Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='birthplace'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Birthplace (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. Surabaya' {...field} type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='birthdate'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='end'>
                      <CustomCalendar
                        initialFocus
                        mode='single'
                        captionLayout='dropdown-buttons' //Also: dropdown | buttons
                        fromYear={1990}
                        toYear={new Date().getFullYear() - 1}
                        selected={field.value}
                        onSelect={field.onChange}
                        // numberOfMonths={2} //Add this line, if you want, can be 2 or more
                        className='rounded-md border'
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button className='mt-6' disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className='animate-spin' /> {`Updating...`}
                  </>
                ) : (
                  'Update student'
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
