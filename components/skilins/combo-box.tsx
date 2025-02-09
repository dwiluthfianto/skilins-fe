import * as React from 'react';
import { ChevronsUpDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface ComboboxProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  placeholder?: string;
  onSelect?: (value: string) => void;
}

const Combobox: React.FC<ComboboxProps> = ({
  items,
  placeholder = 'Select an option...',
  onSelect,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const selectedItem = items.find((item) => item.name === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between capitalize'
        >
          {selectedItem ? selectedItem.name : placeholder}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder={`Search...`} className='h-9' />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.name}
                  value={item.name}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? '' : currentValue;
                    setValue(newValue);
                    setOpen(false);
                    if (onSelect) onSelect(newValue);
                  }}
                  className='capitalize'
                >
                  {item.name}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === item.name ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
