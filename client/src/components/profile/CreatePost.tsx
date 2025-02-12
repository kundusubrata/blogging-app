import { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCreatePostMutation } from "@/redux/api/postApi";
import { toast } from "sonner";

type FormState = {
  title: string;
  content: string;
};
const CreatePost = () => {
  const [formData, setFormData] = useState<FormState>({
    title: "",
    content: "",
  });

  const [createPost, { isLoading, isError, error, isSuccess }] =
    useCreatePostMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isError && error && "data" in error) {
      toast.error(
        (error.data as { message?: string })?.message || "An error occurred"
      );
    } else if (isError) {
      toast.error("An unexpected error occurred");
    }
    if (isSuccess) {
      toast.success("Post created successfully");
      setFormData({
        title: "",
        content: "",
      });
    }
  }, [isError, error, isSuccess]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data:", formData);
    createPost(formData);
  };

  return (
    <>
      <MetaData title="Create Post" />
      <div className=" text-black">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-center ">Create Post</h1>
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
                onChange={handleChange}
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
                onChange={handleChange}
                className="w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter the description of your post"
              ></textarea>
            </div>
            <Button
              type="submit"
              disabled={isLoading || !formData.title || !formData.content}
              className="w-full mt-4"
            >
              {isLoading ? "Creating..." : "Create Post"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
