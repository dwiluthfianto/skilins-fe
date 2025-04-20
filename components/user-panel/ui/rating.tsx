/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { useUser } from "@/hooks/use-user";
import { CommentRatings } from "@/components/ratings";
import Link from "next/link";
import { handleAxiosError } from "@/utils/handle-axios-error";

export default function RatingComponent(props: { contentUuid: any }) {
  const { contentUuid } = props;
  const [userRating, setUserRating] = useState<number | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchUserRating = async () => {
      if (!user?.data?.uuid) return;

      try {
        const response = await axios.get(`/ratings/${contentUuid}/check`);

        setUserRating(response.data.data?.rating_value ?? 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserRating();
  }, [user, contentUuid]);

  // Fungsi untuk mengirim nilai rating ke server
  const handleRate = async (ratingValue: number) => {
    if (!user?.data?.uuid) return alert("You need to log in to rate!");

    try {
      await axios.post(
        `/ratings/${contentUuid}`,
        { rating_value: ratingValue },
        { headers: { "Content-Type": "application/json" } }
      );
      setUserRating(ratingValue);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className='flex gap-4 '>
      <div className='flex flex-col gap-4'>
        <p>Your Rating:</p>
        {userRating !== null ? (
          <>
            <CommentRatings
              rating={userRating}
              totalStars={5}
              size={32}
              variant='yellow'
              onRatingChange={handleRate}
              className='hover:cursor-pointer'
            />
          </>
        ) : (
          <>
            <Link href={"/auth/user/login"}>
              <CommentRatings
                rating={0}
                totalStars={5}
                size={32}
                variant='yellow'
                disabled
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
