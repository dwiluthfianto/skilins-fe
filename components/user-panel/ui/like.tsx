/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useUser } from "@/hooks/use-user";

export default function LikeComponent(props: { likes: any; contentUuid: any }) {
  const { likes, contentUuid } = props;
  const [liked, setLiked] = useState(false); // Initially not liked
  const [loading, setLoading] = useState(false); // Add loading state
  const [totalLikes, setTotalLikes] = useState(likes.length || 0); // Total likes count

  const { user } = useUser();

  // Fetch whether the user has already liked the content when the component mounts
  useEffect(() => {
    const checkIfLiked = async () => {
      if (!user?.data?.uuid) return; // Make sure the user is logged in

      try {
        const response = await axios.get(
          `/likes/${contentUuid}/check/${user?.data.uuid}`
        );
        setLiked(response?.data?.data.liked); // Set the initial liked state based on the API response
      } catch (error) {}
    };

    checkIfLiked();
  }, [user, contentUuid]);

  const handleLikeToggle = async () => {
    if (!user?.data?.uuid) return; // User must be logged in to like/unlike
    setLoading(true); // Set loading state to true when starting the request
    try {
      if (!liked) {
        // Send request to like the post
        await axios.post(`/likes/${contentUuid}/like`, {
          liked_by: user?.data.uuid,
        });
        setTotalLikes(totalLikes + 1); // Increment like count
      } else {
        // Send request to unlike the post
        await axios.post(`/likes/${contentUuid}/unlike`, {
          liked_by: user?.data.uuid,
        });
        setTotalLikes(totalLikes - 1); // Decrement like count
      }
      // Toggle the liked state
      setLiked(!liked);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Reset loading state after the request
    }
  };
  return (
    <div className="max-w-2xl mx-auto px-4 flex justify-between items-center">
      <Button
        variant={!liked ? "outline" : "destructive"}
        onClick={handleLikeToggle}
        disabled={loading}
      >
        {!liked ? "Like" : "Liked"}
        {!liked ? (
          <Heart width={16} className="ml-2" />
        ) : (
          <Heart width={16} className="ml-2" fill="white" />
        )}
      </Button>
      <div className="flex w-fit flex-col items-center gap-2 sm:flex-row">
        <span className="inline-flex items-center -space-x-4">
          {likes.length > 0
            ? likes?.slice(0, 5).map((like: any, index: number) => (
                <Avatar key={index} className=" border">
                  <AvatarImage src={like.profile_url} alt="placeholder" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))
            : ""}
        </span>
        <div>
          <p className="text-left font-medium text-muted-foreground">
            {totalLikes > 100 ? totalLikes + "+" : totalLikes} Likes
          </p>
        </div>
      </div>
    </div>
  );
}
