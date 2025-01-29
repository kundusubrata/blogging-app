import React from "react";
import BlogCard from "./BlogCard";
import { Blog } from "types";
import { data } from "../../../data";
import Paginator from "./Paginator";

const Home: React.FC = () => {
  const blog: Blog[] = data;
  return (
    <div>
      <h1 className="text-4xl text-center font-bold pb-16">
        Your Thoughts, Our Platform – Share Your Stories Today!
      </h1>
      <div>
        {blog?.length > 0 ? (
          blog.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="text-2xl text-center mt-8 text-red-500">No Blogs Available</p>
        )}
      </div>
      <div>
        <Paginator />
      </div>
    </div>
  );
};

export default Home;
