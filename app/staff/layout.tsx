'use client';
import AdminPanelLayout from '@/components/staff-panel/admin-panel-layout';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import withRole from '@/utils/with-role';

function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <AdminPanelLayout>{children}</AdminPanelLayout>
      <Toaster />
    </TooltipProvider>
  );
}

export default withRole(DemoLayout, ['staff'], '/auth/staff/login');
