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
import { BadgeCheck, MessageCircle, Repeat2 } from "lucide-react";
import CommentContainer from "./comment/CommentContainer";
import { fetchCommentCount } from "../utils/commentFunctions";
import { Avatar } from "@radix-ui/themes";

const Post = ({ post, isPostPage }) => {
  const { user, token } = useSelector((state) => state.auth);
  const [likeCount, setLikeCount] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepost, setIsRepost] = useState(false);
  const [repostCount, setRepostCount] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [showLikeIcon, setShowLikeIcon] = useState(false);
  const [showCommentContainer, setShowCommentContainer] = useState(
    isPostPage || false
  );

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
    fetchCommentCount({ postId: post._id, setCommentCount });
  }, []);
  const handleLikeButtonClick = (e) => {
    e.preventDefault();
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
  const repostButtonClick = (e) => {
    e.preventDefault();

    if (!user) return toast.error("Please login first");
    if (!isRepost) {
      setRepostCount((repostCount) => repostCount + 1);
      handleRepost({ post, reposterId: user._id, token, user, dispatch });
      setIsRepost(true);
    } else {
      setRepostCount((repostCount) => repostCount - 1);
      handleUndoRepost({ post, token, dispatch, user });
      setIsRepost(false);
    }
  };
  const handleDoubleClickOnImage = (e) => {
    e.preventDefault();

    if (!user) return;
    setShowLikeIcon(true);
    if (!isLiked) {
      handleLikeButtonClick();
    }
  };
  const handleCommentButtonClick = (e) => {
    e.preventDefault();
    setShowCommentContainer(!showCommentContainer);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLikeIcon(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [showLikeIcon]);

  return (
    <div className="flex flex-col w-full">
      {post.isRepost && (
        <Link className="text-sm opacity-50 my-1 flex gap-2 items-center justify-start">
          <Repeat2 size={16} />
          <p>
            {user &&
            (post.reposterId?._id === user._id || post.reposterId === user._id)
              ? "You"
              : post.reposterId?.name}{" "}
            reposted
          </p>
        </Link>
      )}
      <Link to={`/post/${post._id}`} className="flex border gap-2 p-2 pr-8 dark:border-[--border-light] rounded-md relative ">
        <Link to={`/profile/${post?.userId?._id}`} className="h-fit">
          <Avatar
            src={post.userId?.picturePath}
            fallback={post.userId.name[0]}
            radius="full"
            size="2"
          />
        </Link>
        <div className="w-full">
          <Link to={`/profile/${post?.userId?._id}`}>
            <div className="flex gap-1 items-center">
              <h2 className="font-semibold">
                {post.userId?.name}
                {post.userId?.isVerified && (
                  <span>
                    <BadgeCheck className="inline ml-1" size="18" />
                  </span>
                )}
              </h2>
              <h3 className="opacity-55 text-sm">
                @{post.userId?.username} •{" "}
                {calculateTime(post.creationDateAndTime)}
              </h3>
            </div>
          </Link>
          <p>{post.title}</p>
          <div className="relative mt-2">
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
                onClick={(e) => e.preventDefault()}
                onDoubleClick={(e) => handleDoubleClickOnImage(e)}
                src={post.image}
                alt=""
              />
            )}

            <div className="w-[80%] flex justify-between p-1 py-2 px-2">
              <button
                className="flex gap-1 hover:opacity-60"
                onClick={(e) => handleCommentButtonClick(e)}
              >
                <MessageCircle size={20} />
                <p>{commentCount > 0 && commentCount}</p>
              </button>
              <button
                onClick={(e) => repostButtonClick(e)}
                className="flex gap-1 hover:opacity-60"
              >
                <Repeat2 style={{ color: isRepost ? "#5ced73" : "" }} />
                <p>{repostCount > 0 && repostCount}</p>
              </button>
              <button
                onClick={(e) => handleLikeButtonClick(e)}
                className="flex gap-1 hover:opacity-60"
              >
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderRoundedIcon />}
                <p>{likeCount > 0 && likeCount}</p>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-4" onClick={(e) => e.preventDefault()}>
          <PostMenu post={post} />
        </div>
      </Link>
      {showCommentContainer && <CommentContainer post={post} />}
    </div>
  );
};

export default Post;
