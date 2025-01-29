import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const ProfileDropdown: React.FC = () => {
  const admin = true;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
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
            <Button>Log Out</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
