import { FC } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface TabProps {
  className?: string;
  status: string;
  onUpdateStatus: (status: string) => void;
}

const TabsStatus: FC<TabProps> = ({ status, onUpdateStatus, className }) => {
  return (
    <div className={cn('flex flex-wrap gap-2 py-8', className)}>
      <Button
        variant={status === 'approved' ? 'default' : 'outline'}
        onClick={() => onUpdateStatus('approved')}
      >
        approved
      </Button>
      <Button
        variant={status === 'pending' ? 'default' : 'outline'}
        onClick={() => onUpdateStatus('pending')}
      >
        pending
      </Button>
      <Button
        variant={status === 'REJECTED' ? 'default' : 'outline'}
        onClick={() => onUpdateStatus('REJECTED')}
      >
        Rejected
      </Button>
    </div>
  );
};

export default TabsStatus;
