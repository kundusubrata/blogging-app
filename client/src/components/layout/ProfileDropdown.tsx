import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useLazySignoutQuery } from "@/redux/api/userApi";
import { User } from "types";
// import { useAppDispatch } from "@/redux/hooks";
// import { logout } from "@/redux/features/userSlice";

const ProfileDropdown = ({ user }: { user: User }) => {
  const admin = user?.role === "ADMIN";
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const [signout] = useLazySignoutQuery();

  const handleSignout = () => {
    signout();
    // dispatch(logout());
    navigate(0);
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {user?.firstname.charAt(0).toUpperCase() +
                user?.lastname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-5">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to={"my-profile"}>My Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to={"create-post"}>Create Post</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to={"my-posts"}>My Posts</Link>
          </DropdownMenuItem>
          {admin && (
            <>
              <DropdownMenuItem>
                <Link to={"all-posts"}>All Posts</Link>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem>
            <Button onClick={handleSignout}>Log Out</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
