'use client';

import ResetPassword from './resetpassword';
import { Suspense } from 'react';
import { Loading } from '@/components/loading';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPassword />
    </Suspense>
  );
}
