import { TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { handlePost } from "../utils/functions";
import Toast from "./utils/Toast";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton, Tooltip } from "@radix-ui/themes";
import { Sparkles } from "lucide-react";
import { rewriteWithAI } from "../utils/rewriteWithAI";

const CreatePost = () => {
  const auth = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const [isPosting, setIsPosting] = useState(false);
  const [AILoading, setAILoading] = useState(false);

  const handlePostButtonClick = () => {
    handlePost({
      title,
      file,
      token: auth.token,
      dispatch,
      user: auth.user,
      setIsPosting,
    });
  };
  const handleImageInput = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  return (
    <div>
      <Toast />
      <div className="flex items-start gap-3 p-3 border border-[--border-dark] dark:border-[--border-light] rounded-md ">
      <Avatar src={auth.user.picturePath} fallback={auth.user.name[0]} radius="full" size="2" />
        
        <div className="w-full">
          <TextareaAutosize
            value={AILoading?"Rewriting with AI...": title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="empty textarea"
            className="border-none outline-none bg-[--bg-light] dark:bg-[--bg-dark] resize-none w-full"
            placeholder="Create a post..."
          />
          <img src={image} alt="" className="rounded-md" />
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
        <button
          disabled={(title == "" && !image) || isPosting}
          onClick={handlePostButtonClick}
          className="disabled:opacity-45 bg-[--bg-dark] dark:bg-[--bg-light] dark:text-black text-white h-8 px-4 rounded-full font-semibold"
        >
          {isPosting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
