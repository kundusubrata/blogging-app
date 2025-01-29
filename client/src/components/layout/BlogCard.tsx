import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Blog } from "types";

interface BlogCardProps {
    blog: Blog
}


const BlogCard: React.FC<BlogCardProps> = ({blog}) => {
    const {id,title, author, date, views, content} = blog
  return (
    <div className="flex flex-wrap gap-4 p-4 w-full">
      <Link to={`/blog-details/${id}`}>
        <Card>
          <CardHeader>
            <CardTitle>
              <Link to={`/blog-details/${id}`}>{title}</Link>
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
              <p>
                {content.length > 200
                  ? content.substring(0, 200) + "..."
                  : content}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default BlogCard;
