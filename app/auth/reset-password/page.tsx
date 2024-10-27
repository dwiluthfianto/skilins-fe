"use client";

import ResetPassword from "./resetpassword";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPassword />
    </Suspense>
  );
}
