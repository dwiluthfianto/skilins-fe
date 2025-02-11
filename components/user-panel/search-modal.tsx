'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function SearchModal({
  isOpen,
  onClose,
  initialQuery = '',
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSearch} className='relative'>
          <Input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search content...'
            className='w-full pr-8'
            autoFocus
          />
          <button
            type='submit'
            className='absolute right-2 top-1/2 -translate-y-1/2'
          >
            <Search className='w-4 h-4 text-muted-foreground' />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
