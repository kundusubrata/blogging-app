import { useGetMyPostsQuery } from "@/redux/api/postApi";
import MetaData from "../layout/MetaData";
import PostList from "./PostList";
import { toast } from "sonner";
import { useEffect } from "react";
import Loader from "../layout/Loader";
import { Post } from "types";

const MyPosts = () => {
  const { data, isLoading, isError, error } = useGetMyPostsQuery();

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
      <MetaData title="My Posts" />
      <div>
        <h1 className="text-2xl font-semibold text-center">My Posts</h1>
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

export default MyPosts;
