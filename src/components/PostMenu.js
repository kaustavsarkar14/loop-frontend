import { DropdownMenu } from "@radix-ui/themes";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import DeletePostAlert from "./DeletePostAlert";
import ShareCard from "./ShareCard";
import EditPost from "./EditPost";

const PostMenu = ({ post }) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div  >
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="cursor-pointer" >
            <MoreHorizIcon />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-28">
          {user && user._id == post.userId?._id && (
            <DropdownMenu.Item >
              <EditPost post={post}  />
            </DropdownMenu.Item>
          )}
          <DropdownMenu.Item onClick={(e) => e.preventDefault()}>
            <ShareCard postId={post._id} />
          </DropdownMenu.Item>
          {user && user._id == post.userId?._id && (
            <DropdownMenu.Item color="red" onClick={(e) => e.preventDefault()}>
              <DeletePostAlert postId={post._id} />
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default PostMenu;
