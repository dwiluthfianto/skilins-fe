// /auth/reset-password/page.tsx
"use client";

import VerifyEmail from "./verifyemail";
import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyEmail />
    </Suspense>
  );
}
