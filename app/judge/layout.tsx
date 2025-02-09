'use client';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import withRole from '@/utils/with-role';

function JudgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {children}
      <Toaster />
    </TooltipProvider>
  );
}

export default withRole(JudgeLayout, ['judge'], '/auth/user/login');
