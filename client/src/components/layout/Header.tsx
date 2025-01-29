import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus, Search } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

const Header: React.FC = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/signin");
  };
  return (
    <>
      <div className="flex flex-wrap gap-2 items-center justify-between px-16 py-4 shadow-md bg-white text-black top-0 w-full fixed z-10">
        <div className="lg:text-2xl sm:text-xl text-sm font-bold">
          <Link to={"/"}>Blogging App</Link>
        </div>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search"
            className="xl:w-80 lg md:w-60 sm:w-40 w-24 h-8 md:h-10 md:text-base text-sm"
            type="text"
            name="search"
          />
          <Search className="h-8 md:h-10 md:text-base text-sm hidden sm:block" />
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
          <Button onClick={handleButton} className="md:text-sm text-xs hover:bg-slate-700">
            Sign In
          </Button>

          {/* Dropdown  */}
          <ProfileDropdown />
        </div>
      </div>
    </>
  );
};

export default Header;





