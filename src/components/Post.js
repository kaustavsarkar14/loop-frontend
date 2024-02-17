import React, { useEffect, useState } from "react";
import PostMenu from "./PostMenu";
import { calculateTime } from "../utils/utilFunctions";
import { Link } from "react-router-dom";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  fetchLikes,
  fetchReposts,
  handleRepost,
  handleUndoRepost,
  like,
  unLike,
} from "../utils/postFunctions";
import toast from "react-hot-toast";
import { PLACEHOLDER_PFP } from "../utils/constants";

const Post = ({ post }) => {
  const [likeCount, setLikeCount] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepost, setIsRepost] = useState(false);
  const [repostCount, setRepostCount] = useState(null);
  const [showLikeIcon, setShowLikeIcon] = useState(false);
  const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchLikes({
      postId: post._id,
      setLikeCount,
      setIsLiked,
      userId: user?._id,
    });
    fetchReposts({
      postId: post._id,
      setRepostCount,
      setIsRepost,
      userId: user?._id,
    });
  }, []);
  const handleLikeButtonClick = () => {
    if (!user) return toast.error("Please login first");
    if (!isLiked) {
      setLikeCount((likecount) => likecount + 1);
      like({ postId: post._id, token });
      setIsLiked(true);
    } else {
      setLikeCount((likecount) => likecount - 1);
      unLike({ postId: post._id, token });
      setIsLiked(false);
    }
  };
  const repostButtonClick = () => {
    if (!user) toast.error("Please login first");
    if (!isRepost) {
      setRepostCount((repostCount) => repostCount + 1);
      handleRepost({ post, reposterId: user._id, token, user, dispatch });
      setIsRepost(true);
    } else {
      handleUndoRepost({ post, token });
      setIsRepost(false);
    }
  };
  const handleDoubleClickOnImage = () => {
    if (!user) return;
    setShowLikeIcon(true);
    if (!isLiked) {
      handleLikeButtonClick();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLikeIcon(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [showLikeIcon]);
  return (
    <div className="flex flex-col">
      {post.isRepost && (
        <p className="text-sm opacity-50 my-1">
          <SyncRoundedIcon fontSize="small" />{" "}
          {user && post.reposterId === user._id ? "You" : post.reposterId?.name}{" "}
          reposted
        </p>
      )}
      <div className="flex border gap-2 p-2 pr-8 dark:border-[--border-light] rounded-md relative ">
        <Link to={`/profile/${post?.userId?._id}`}>
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={post.userId?.picturePath}
              alt=""
            />
          </div>
        </Link>
        <div>
          <Link to={`/profile/${post?.userId?._id}`}>
            <div className="flex gap-1 items-center">
              <h2 className="font-semibold">{post.userId?.name}</h2>
              <h3 className="opacity-55 text-sm">
                @{post.userId?.username} •{" "}
                {calculateTime(post.creationDateAndTime)}
              </h3>
            </div>
          </Link>
          {post.title}
          <div className="relative">
            {showLikeIcon && (
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/264px-Love_Heart_symbol.svg.png"
                  className="w-[5rem] opacity-70"
                  alt=""
                />
              </div>
            )}
            {post.image != "" && (
              <img
                className="rounded-md max-h-[30rem] border border-[--border-dark] dark:border-[--border-light]"
                onDoubleClick={handleDoubleClickOnImage}
                src={post.image}
                alt=""
              />
            )}

            <div className="w-full flex justify-between p-1 py-2 px-2">
              <button>
                <ChatBubbleOutlineRoundedIcon />
              </button>
              <button onClick={repostButtonClick} className="flex">
                <p>{repostCount > 0 && repostCount}</p>
                <SyncRoundedIcon style={{ color: isRepost ? "#5ced73" : "" }} />
              </button>
              <button onClick={handleLikeButtonClick} className="flex">
                <p>{likeCount > 0 && likeCount}</p>
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderRoundedIcon />}
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-4">
          <PostMenu post={post} />
        </div>
      </div>
    </div>
  );
};

export default Post;
