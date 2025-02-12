import { useState } from "react";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/hooks";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from "@/redux/api/postApi";
import { toast } from "sonner";


const CommentSection = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState("");
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data, refetch } = useGetCommentsQuery(postId);
  const [addComment] = useAddCommentMutation();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("You must be logged in to comment");
      return;
    }

    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    await addComment({ postId, content: comment });
    setComment("");
    refetch();
  };
  return (
    <div className="mt-4">
      <h3 className="text-md font-semibold">Comments</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="border p-2 flex-1 rounded"
        />
        <Button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Comment
        </Button>
      </form>

      <div className="mt-4">
        {data?.comments?.map((c) => (
          <div key={c.id} className="border-b py-2">
            <p>
              <strong>
                {c.author.firstname} {c.author.lastname}
              </strong>
              : {c.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
