import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CreatePost: React.FC = () => {
  return (
    <div className=" text-black">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center ">Create Post</h1>
        <div className="space-y-4">
          <label className="text-sm font-semibold">Title of your post: </label>
          <Input placeholder="Enter the title of your post" />
        </div>
        <div className="space-y-4">
          <label className="text-sm font-semibold">
            Description of your post:{" "}
          </label>
          <textarea className="w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm" placeholder="Enter the description of your post"></textarea>
        </div>
        <Button className="w-full mt-4">Create Post</Button>
      </div>
    </div>
  );
};

export default CreatePost;
