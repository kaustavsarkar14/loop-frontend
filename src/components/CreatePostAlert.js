import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { TextareaAutosize } from "@mui/material";
import {  handlePost } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import toast from "react-hot-toast";
import Toast from "./utils/Toast";

const CreatePostAlert = () => {
  const auth = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [file , setFile] = useState(null)
  const [image , setImage] = useState(null)
  const [isPosting, setIsPosting] = useState(false);
  const dispatch = useDispatch();
  const handleImageInput = (e)=>{
    setImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }
  const handlePostButtonClick = () => {
    if(!auth.user) return toast.error("Please login to create a post");
    handlePost({
      title,
      file,
      token: auth.token,
      dispatch,
      user: auth.user,
      setIsPosting,
    });
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <AddBoxOutlinedIcon />
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
      <Toast/>
        <Dialog.Title>Create post profile</Dialog.Title>
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-full">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={
                 auth.user?.picturePath ||
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              }
              alt=""
            />
          </div>
          <div>
            <TextareaAutosize
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="empty textarea"
              className="border-none outline-none bg-transparent resize-none w-full"
              placeholder="Create a post..."
            />
            <img src={image} alt="" className="rounded-md mt-2" />
            <label htmlFor="picture">
              <AddPhotoAlternateOutlinedIcon />
            </label>
            <input
              id="picture"
              className="hidden"
              type="file"
              onChange={handleImageInput}
            />
          </div>
        </div>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            disabled={(title == "" && !image) || isPosting}
            onClick={handlePostButtonClick}
          >
            {isPosting ? "Posting..." : "Post"}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreatePostAlert;
