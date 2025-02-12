import { useTogglePostMutation } from "@/redux/api/postApi";
import { useAppSelector } from "@/redux/hooks";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const LikeButton = ({ postId }: { postId: string }) => {
  const [liked, setLiked] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [toggleLike, { isLoading }] = useTogglePostMutation();

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to like a post");
      return;
    }

    await toggleLike(postId);
    setLiked(!liked);
  };
  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-2"
      disabled={isLoading}
    >
      <HeartIcon
        className={`w-5 h-5 ${liked ? "text-red-500" : "text-gray-400"}`}
      />
      {liked ? "Unlike" : "Like"}
    </button>
  );
};

export default LikeButton;
