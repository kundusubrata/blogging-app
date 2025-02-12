import { useEffect } from "react";
import { toast } from "sonner";
import { Post } from "types";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import PostList from "./PostList";
import { useAdminAllPostsQuery } from "@/redux/api/postApi";

const AllPosts = () => {
  const { data, isLoading, isError, error } = useAdminAllPostsQuery();

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
  }, [isError, error]);

  if (isLoading) return <Loader />;
  return (
    <>
      <MetaData title="All Posts" />
      <div>
        <h1 className="text-2xl font-semibold text-center">All Posts</h1>
        {data?.posts.length ? (
          data?.posts?.map((post: Post) => (
            <PostList key={post.id} post={post} />
          ))
        ) : (
          <p className="text-2xl text-center mt-8 text-red-500">
            No Blogs Available
          </p>
        )}
      </div>
    </>
  );
};

export default AllPosts;
