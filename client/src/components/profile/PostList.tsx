import { Post } from "types";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDeletePostMutation } from "@/redux/api/postApi";


const PostList = ({ post }:{post: Post}) => {
  const navigate = useNavigate();

  const [deletePost,{isLoading:isDeleteLoading, }] = useDeletePostMutation();


  const handleEdit = () => {
    navigate(`/edit-post/${post?.id}`);
  };
  const handleDelete = (id: string) => {
    deletePost(id);
  }
  return (
    <div className="flex flex-wrap gap-2 justify-between items-center mt-8 border p-4 shadow-sm rounded-md">
      <Link to={`/blog-details/${post?.id}`}>
        <p className="text-md font-medium">{post?.title}</p>
      </Link>
      <div className="space-x-4">
        <Button onClick={handleEdit} className="bg-blue-500 text-white">
          Edit
        </Button>
        <Button onClick={()=>handleDelete(post?.id)} disabled={isDeleteLoading} className="bg-red-500 text-white">Delete</Button>
      </div>
    </div>
  );
};

export default PostList;
