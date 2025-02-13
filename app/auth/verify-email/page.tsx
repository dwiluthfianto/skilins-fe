// /auth/reset-password/page.tsx
'use client';

import VerifyEmail from './verifyemail';
import { Suspense } from 'react';
import { Loading } from '@/components/loading';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyEmail />
    </Suspense>
  );
}
