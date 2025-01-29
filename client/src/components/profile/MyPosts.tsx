import { data } from "../../../data";
import React from "react";
import PostList from "./PostList";
import { Blog } from "types";

const MyPosts: React.FC = () => {
  const myposts: Blog[] = data;
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">My Posts</h1>
      {myposts.map((post) => (
        <PostList key={post.id} post={post} />
      ))}
    </div>
  );
};

export default MyPosts;
