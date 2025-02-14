import BlogCard from "./BlogCard";
import { Input } from "../ui/input";
import Paginator from "./Paginator";
import MetaData from "./MetaData";
import { useGetPostsQuery } from "@/redux/api/postApi";
import { Post } from "types";
import Loader from "./Loader";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import debounce from "@/utils/debounce";
import { toast } from "sonner";


const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(searchParamsValue);
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!, 10)
    : 1;

  const { data, isLoading, error, isError } = useGetPostsQuery({
    search: searchParamsValue,
    page,
    limit: 5,
  });


  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchParams({ search: value, page: "1" });
    }, 500),
    []
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };
  const handlePageChange = (pageNumber: number) => {
    setSearchParams({ search: searchTerm, page: pageNumber.toString() });
  };

  useEffect(() => {
    if(isError) {
      if ('data' in error) {
        toast.error((error.data as { message?: string })?.message || 'An error occurred');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  }, [isError, error])

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title="Explore Posts" />
      <div>
        <h1 className="text-4xl text-center font-bold pb-16">
          Your Thoughts, Our Platform – Share Your Stories Today!
        </h1>
        <div className="flex gap-2 items-center justify-center">
          <Input
            placeholder="Search"
            className="xl:w-80 lg md:w-60 sm:w-40 w-24 h-8 md:h-10 md:text-base text-sm"
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4">
          {data?.posts.length ? (
            data?.posts?.map((post: Post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-2xl text-center mt-8 text-red-500">
              No Blogs Available
            </p>
          )}
        </div>
        <div>
          <Paginator
            page={page}
            setPage={handlePageChange}
            totalPages={data?.totalPages || 1}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
