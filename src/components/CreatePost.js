import { TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { handlePost } from "../utils/functions";
import Toast from "./utils/Toast";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Tooltip } from "@radix-ui/themes";
import { Sparkles, XCircle } from "lucide-react";
import { rewriteWithAI } from "../utils/rewriteWithAI";
import { SpinnerInfinity } from "spinners-react";

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
      setTitle,
      setImage,
      setFile,
    });
  };
  const handleImageInput = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const handleRemoveImage = () => {
    setFile(null);
    setImage(null);
  };
  return (
    <div>
      <Toast />
      <div className="flex items-start gap-3 p-3 border border-[--border-dark] dark:border-[--border-light] rounded-md ">
        <Avatar
          src={auth.user.picturePath}
          fallback={auth.user.name[0]}
          radius="full"
          size="2"
        />

        <div className="w-full">
          <TextareaAutosize
            value={AILoading ? "Rewriting with AI..." : title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="empty textarea"
            className={
              "border-none outline-none bg-transparent resize-none w-full " +
              (AILoading ? "animate-pulse" : "")
            }
            placeholder="Create a post..."
          />
          {image && (
            <div className="relative">
              <button
                className="absolute -right-1 -top-1 p-1 bg-black bg-opacity-45 rounded-full"
                onClick={handleRemoveImage}
              >
                <XCircle />
              </button>
              <img src={image} alt="" className="rounded-md" />
            </div>
          )}
          <div className="flex justify-start items-center gap-2">
            <label>
              <Tooltip content="Upload image">
                <AddPhotoAlternateOutlinedIcon />
              </Tooltip>
              <input
                type="file"
                // id="image"
                className="hidden"
                onInput={handleImageInput}
              />
            </label>
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
          {isPosting ? (
            <SpinnerInfinity
              color="white"
              secondaryColor="#545454"
              className="m-auto my-2"
              speed={200}
              size={30}
            />
          ) : (
            "Post"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
