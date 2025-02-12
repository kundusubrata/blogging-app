import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import { useAppSelector } from "@/redux/hooks";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const Header = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  useGetMyProfileQuery();

  return (
    <div className="flex flex-wrap gap-2 items-center justify-between px-16 py-4 shadow-md bg-white text-black top-0 w-full fixed z-10">
      <div className="lg:text-2xl sm:text-xl text-sm font-bold">
        <Link to={"/"}>Blogging App</Link>
      </div>
      <div className="flex items-center md:gap-5 gap-2 md:text-base text-sm">
        <div>
          <Link to={"/create-post"} className="sm:hidden block">
            <Plus />
          </Link>
          <Link to={"/create-post"} className="sm:block hidden">
            Create Post
          </Link>
        </div>
        {isAuthenticated && user ? (
          <ProfileDropdown user={user} />
        ) : (
          <div className="space-x-2">
            <Button
              onClick={() => navigate("/signin")}
              className="md:text-sm text-xs hover:bg-slate-700"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="md:text-sm text-xs hover:bg-slate-700"
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
