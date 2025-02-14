import { useTogglePostMutation } from "@/redux/api/postApi";
import { useAppSelector } from "@/redux/hooks";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Like } from "types";

const LikeButton = ({ postId, likes }: { postId: string; likes: Like[] }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [toggleLike, { isLoading }] = useTogglePostMutation();

  useEffect(() => {
    if (user) {
      const isLiked = likes.some((like) => like.userId === user.id);
      setLiked(isLiked);
    }
  }, [likes, user]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to like a post");
      return;
    }

    await toggleLike(postId);
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };
  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-2"
      disabled={isLoading}
    >
      {likeCount}
      <HeartIcon
        className={`w-5 h-5 ${liked ? "text-red-500" : "text-gray-400"}`}
      />
      {liked ? "Unlike" : "Like"}
    </button>
  );
};

export default LikeButton;
