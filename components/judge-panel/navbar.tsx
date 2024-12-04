'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { CalendarDays, Library, LogOut, User } from 'lucide-react';

import { useUser } from '@/hooks/use-user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { ModeToggle } from '../mode-toggle';
import { format } from 'date-fns';
import { logout } from '@/utils/auth-service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GetFirstLetterStr } from '@/utils/get-first-letter-str';
import React from 'react';

export function Navbar() {
  const { user, isLoading, mutate } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();

      router.push('/');
      mutate(null, false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <header className='sticky top-0 z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary'>
      <div className='mx-4 sm:mx-8 flex h-14 items-center'>
        <Link href='/' className='flex justify-center items-center pt-1'>
          <div className=' flex justify-center items-center  p-[1px] rounded-md border-2 dark:border-white border-black mr-2'>
            <Library width={24} height={24} />
          </div>
          <h1 className='font-bold text-xl md:text-2xl'>skilins.</h1>
        </Link>
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <Button variant={'outline'} className='hidden md:flex'>
            <CalendarDays className='mr-2' width={18} />{' '}
            {format(new Date(), 'dd MMM yy')}
          </Button>
          {isLoading ? (
            'loading...'
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className={cn('mr-3 hover:cursor-pointer')}>
                  <Avatar>
                    <AvatarImage
                      key={user?.data?.profile}
                      src={
                        user?.data?.profile ? `${user.data.profile}` : undefined
                      }
                      className='object-cover object-center'
                    />
                    <AvatarFallback>
                      {GetFirstLetterStr(user?.data?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' side='bottom' align='end'>
                <DropdownMenuLabel className='font-normal grid grid-cols-6 items-center justify-between'>
                  <div className='flex flex-col space-y-1 col-span-5'>
                    <p className='text-sm font-medium leading-none truncate'>
                      {user?.data.full_name}
                    </p>
                    <p className='text-xs leading-none text-muted-foreground truncate'>
                      {user?.data.email}
                    </p>
                  </div>
                  <ModeToggle />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className='hover:cursor-pointer' asChild>
                    <Link href='/account' className='flex items-center'>
                      <User className='w-4 h-4 mr-3 text-muted-foreground' />
                      Account
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='hover:cursor-pointer'
                  onClick={() => {
                    handleLogout();
                    mutate(null);
                  }}
                >
                  <LogOut className='w-4 h-4 mr-3 text-muted-foreground' />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
