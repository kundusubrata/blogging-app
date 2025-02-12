import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormatDate } from "@/utils/FormatDate";
import { Link } from "react-router-dom";

type Author = {
  firstname: string;
  lastname: string;
  id: string;
};
type postPropTypes = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
};
const BlogCard = ({ post }: { post: postPropTypes }) => {
  return (
    <div className="p-4 w-full">
      <Link to={`/blog-details/${post?.id}`}>
        <Card>
          <CardHeader>
            <CardTitle>{post?.title}</CardTitle>
            <CardDescription>
              <div className="flex flex-wrap gap-2">
                <p>
                  {post?.author?.firstname} {post?.author?.lastname} |{" "}
                </p>
                <p>{FormatDate(post?.updatedAt)}</p>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p>
                {post?.content?.length > 200
                  ? post?.content.substring(0, 200) + "..."
                  : post?.content}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default BlogCard;
