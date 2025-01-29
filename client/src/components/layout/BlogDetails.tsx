import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { data } from "../../../data";

type Params = {
  id: string;
};

const BlogDetails: React.FC = () => {
  const params = useParams<Params>();
  const blogId = Number(params?.id);

  const blogDetails = data;
  const blog = blogDetails.find((blog) => blog.id === blogId);
  const { title, author, date, views, content } = blog || {
    title: "",
    author: "",
    date: "",
    views: 0,
    content: "",
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl">{title}</h1>
          </CardTitle>
          <CardDescription>
            <div className="flex flex-wrap gap-2">
              <p>{author} | </p>
              <p>{date} | </p>
              <p>{views} Views</p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p>{content}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
