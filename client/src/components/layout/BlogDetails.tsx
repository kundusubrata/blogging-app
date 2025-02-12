import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MetaData from "./MetaData";
import { useGetSinglePostQuery } from "@/redux/api/postApi";
import Loader from "./Loader";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { toast } from "sonner";
import { FormatDate } from "@/utils/FormatDate";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

type Params = {
  id: string;
};

const BlogDetails = () => {
  const { id } = useParams<Params>();

  const { data, isLoading, isError, error } = useGetSinglePostQuery(id ?? skipToken);

  // console.log(id);
  // console.log(data);
  // console.log(data?.post?.updatedAt);


  // if(error) return <p>Error in Fetching</p>
  useEffect(() => {
    if(isError) {
      if ('data' in error) {
        toast.error((error.data as { message?: string })?.message || 'An error occurred');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  }, [isError, error])
  if(isLoading) return <Loader />

  return (
    <>
      <MetaData title={data?.post?.title || "Post Title"} />
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl">{data?.post?.title}</h1>
            </CardTitle>
            <CardDescription>
              <div className="flex flex-wrap gap-2">
                <p>{data?.post?.author?.firstname} {data?.post?.author?.lastname} | </p>
                <p>{FormatDate(data?.post?.updatedAt as string)} | </p>
                <p>{data?.post?._count?.likes} likes</p>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p>{data?.post?.content}</p>
              <LikeButton postId={data?.post?.id || ""} />
            </div>
          </CardContent>
        </Card>
        <CommentSection postId={data?.post?.id || ""} />
      </div>
    </>
  );
};

export default BlogDetails;
