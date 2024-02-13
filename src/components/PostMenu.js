import { Button } from "@mui/material";
import { DropdownMenu } from "@radix-ui/themes";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const PostMenu = () => {
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="cursor-pointer">
            <MoreHorizIcon />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-28">
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
          <DropdownMenu.Item>Share</DropdownMenu.Item>
          <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default PostMenu;
