import { Dialog } from "@radix-ui/themes";
import React from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Toast from "./utils/Toast";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CreatePostAlert = () => {
  const {user} = useSelector((state) => state.auth);
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <AddBoxOutlinedIcon />
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Toast />
        {user?<CreatePost />:<Navigate to={"/login"} />}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreatePostAlert;
