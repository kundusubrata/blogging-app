import React from "react";
import { Button } from "../ui/button";
import { Blog } from "types";
import { Link, useNavigate } from "react-router-dom";

interface BlogPropTypes {
  post: Blog;
}

const PostList: React.FC<BlogPropTypes> = ({ post }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit-post/${post?.id}`);
  };
  return (
    <div className="flex flex-wrap gap-2 justify-between items-center mt-8 border p-4 shadow-sm rounded-md">
      <Link to={`/blog-details/${post?.id}`}>
        <p className="text-md font-medium">{post?.title}</p>
      </Link>
      <div className="space-x-4">
        <Button onClick={handleEdit} className="bg-blue-500 text-white">
          Edit
        </Button>
        <Button className="bg-red-500 text-white">Delete</Button>
      </div>
    </div>
  );
};

export default PostList;
