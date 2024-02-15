import { TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { handlePost } from "../utils/functions";
import Toast from "./utils/Toast";
import { useDispatch, useSelector } from "react-redux";

const CreatePost = () => {
  const auth = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [file , setFile] = useState(null)
  const [image , setImage] = useState(null)
  const dispatch = useDispatch();
  const [isPosting, setIsPosting] = useState(false)
  const handlePostButtonClick = () => {
    handlePost({
      title,
      file,
      token: auth.token,
      dispatch,
      user: auth.user,
      setIsPosting
    });
  };
  const handleImageInput = (e)=>{
    setImage(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }
  return (
    <div>
      <Toast />
      <div className="flex items-start gap-3 p-3 border border-[--border-dark] dark:border-[--border-light] rounded-md ">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={
             auth.user.picturePath ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }
          alt=""
        />
        <div className="w-full">
          <TextareaAutosize
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="empty textarea"
            className="border-none outline-none bg-[--bg-light] dark:bg-[--bg-dark] resize-none w-full"
            placeholder="Create a post..."
          />
          <img src={image} alt="" className="rounded-md" />
          <label htmlFor="image">
            <AddPhotoAlternateOutlinedIcon />
          </label>
          <input
            type="file"
            id="image"
            className="hidden"
            onInput={handleImageInput}
          />
        </div>
        <button
          disabled={(title == "" && !image) || isPosting}
          onClick={handlePostButtonClick}
          className="disabled:opacity-45 bg-[--bg-dark] dark:bg-[--bg-light] dark:text-black text-white h-8 px-4 rounded-full font-semibold"
        >
          {isPosting?"Posting...":"Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
