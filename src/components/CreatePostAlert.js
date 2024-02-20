import { Dialog } from "@radix-ui/themes";
import React from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Toast from "./utils/Toast";
import CreatePost from "./CreatePost";

const CreatePostAlert = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <AddBoxOutlinedIcon />
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Toast />
        <CreatePost />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreatePostAlert;
