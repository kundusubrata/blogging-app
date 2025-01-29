import { data } from "../../../data";
import React from "react";
import PostList from "./PostList";
import { Blog } from "types";

const AllPosts: React.FC = () => {
  const allposts: Blog[] = data;
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">All Posts</h1>
      {allposts.map((post) => (
        <PostList key={post.id} post={post} />
      ))}
    </div>
  );
};

export default AllPosts;
