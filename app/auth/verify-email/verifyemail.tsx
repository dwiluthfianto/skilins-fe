"use client";
import { Button } from "@/components/ui/button";
import axios from "@/utils/axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`auth/verify-email?token=${token}`);

        setVerificationStatus(response.data.message);
      } catch (error) {
        setVerificationStatus("Verification failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setVerificationStatus("No token provided.");
      setLoading(false);
    }
  }, [token]);

  if (token) {
    return (
      <section className='grid h-screen place-content-center bg-white px-4'>
        <div className='text-center space-y-4'>
          {loading ? (
            <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Verifying...
            </p>
          ) : (
            <>
              <h1 className='text-2xl md:text-9xl font-black text-gray-200'>
                Verification Email
              </h1>
              <p className='text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                {verificationStatus}
              </p>
            </>
          )}

          <Button>
            <Link href={"/"}>Go Back Home</Link>
          </Button>
        </div>
      </section>
    );
  } else {
    return (
      <section className='grid h-screen  place-content-center bg-white px-4'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl md:text-9xl font-black text-gray-200'>
            Verification Email
          </h1>
          <p className='text-md md:text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Check your email to verify it.
          </p>

          <Button>
            <Link href={"/"}>Go Back Home</Link>
          </Button>
        </div>
      </section>
    );
  }
}
