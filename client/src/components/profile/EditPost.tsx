import { data } from "../../../data";
import { useParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

type FormState = {
  title: string | undefined;
  content: string | undefined;
};

const EditPost = () => {
  const { id } = useParams();
  const PostId = Number(id);

  const postData = data;

  const post = postData.find((post) => post.id === PostId);
  console.log(post);

  const [formData, setFormData] = useState<FormState>({
    title: post?.title,
    content: post?.content,
  });



  return (
    <div className=" text-black">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center ">Edit Post</h1>
        <div className="space-y-4">
          <label className="text-sm font-semibold">Title of your post: </label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e)=> (setFormData({...formData, title: e.target.value}))}
            placeholder="Enter the title of your post"
          />
        </div>
        <div className="space-y-4">
          <label className="text-sm font-semibold">
            Description of your post:{" "}
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={(e)=> (setFormData({...formData, content: e.target.value}))}
            className="w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter the description of your post"
          ></textarea>
        </div>
        <Button className="w-full mt-4">Update Post</Button>
      </div>
    </div>
  );
};

export default EditPost;
