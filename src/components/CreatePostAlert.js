import { Avatar, Button, Dialog, Flex, Text, TextField, Tooltip } from "@radix-ui/themes";
import React, { useState } from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { TextareaAutosize } from "@mui/material";
import {  handlePost } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import toast from "react-hot-toast";
import Toast from "./utils/Toast";
import { Sparkles } from "lucide-react";
import { rewriteWithAI } from "../utils/rewriteWithAI";

const CreatePostAlert = () => {
  const auth = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [file , setFile] = useState(null)
  const [image , setImage] = useState(null)
  const [isPosting, setIsPosting] = useState(false);
  const [AILoading, setAILoading] = useState(false);
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
        <Dialog.Title>Create post</Dialog.Title>
        <div className="flex gap-2">
        <Avatar src={auth?.user?.picturePath} fallback={auth?.user?.name[0]} radius="full" size="2" />
          <div>
            <TextareaAutosize
              value={AILoading?"Rewriting with AI...": title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="empty textarea"
              className="border-none outline-none bg-transparent resize-none w-full"
              placeholder="Create a post..."
            />
            <img src={image} alt="" className="rounded-md mt-2" />
            <div className="flex justify-start items-center gap-2">
            <label htmlFor="image">
              <Tooltip content="Upload image">
                <AddPhotoAlternateOutlinedIcon />
              </Tooltip>
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              onInput={handleImageInput}
            />
            <Tooltip content="Rewrite with AI">
              <button
                className="disabled:opacity-45"
                disabled={title.length < 20 || AILoading}
                onClick={() => rewriteWithAI({ title, setTitle, setAILoading })}
              >
                <Sparkles />
              </button>
            </Tooltip>
          </div>
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
