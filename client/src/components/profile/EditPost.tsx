import {
  useEditPostMutation,
  useGetSinglePostQuery,
} from "@/redux/api/postApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

type FormState = {
  title: string;
  content: string;
};

const EditPost = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const { data, isLoading: isFetching } = useGetSinglePostQuery(
    id ?? skipToken
  );
  console.log(data);
  const [editPost, { isLoading: isUpdating, isSuccess, isError, error }] =
    useEditPostMutation();

  const [formData, setFormData] = useState<FormState>({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (data?.post) {
      setFormData({ title: data.post.title, content: data.post.content });
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      if ("data" in error) {
        toast.error(
          (error.data as { message?: string })?.message || "An error occurred"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    }
    if (isSuccess) {
      navigate("/my-posts");
      toast.success("Post updated successfully");
    }
  }, [isSuccess, navigate, isError, error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    editPost({ id, body: formData });
  };

  if (isFetching) return <Loader />;

  return (
    <div className=" text-black">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center ">Edit Post</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label htmlFor="title" className="text-sm font-semibold">
              Title of your post:{" "}
            </label>
            <Input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter the title of your post"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="content" className="text-sm font-semibold">
              Description of your post:{" "}
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter the description of your post"
            ></textarea>
          </div>
          <Button type="submit" disabled={isUpdating} className="w-full mt-4">
            {isUpdating ? "Updating..." : "Update Post"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
