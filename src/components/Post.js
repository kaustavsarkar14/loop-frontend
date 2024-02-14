import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import PostMenu from "./PostMenu";
import { calculateTime } from "../utils/utilFunctions";
import { Link } from "react-router-dom";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { useSelector } from "react-redux";
import { fetchLikes, like, unLike } from "../utils/postFunctions";

const Post = ({ post }) => {
  const [likeCount, setLikeCount] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  useEffect(() => {
    fetchLikes({
      postId: post._id,
      setLikeCount,
      setIsLiked,
      userId: user._id,
    });
  }, []);
  const handleLikeButtonClick = () => {
    if (!isLiked) {
      setLikeCount((likecount) => likecount + 1);
      like({ postId: post._id, token });
      setIsLiked(true);
    }
    else {
      setLikeCount((likecount) => likecount - 1);
      unLike({ postId: post._id, token });
      setIsLiked(false);
    }
  };
  return (
    <div className="flex border gap-2 p-2 pr-8 dark:border-[--border-light] rounded-md relative">
      <Link to={`/profile/${post?.userId?._id}`}>
        <div className="h-8 w-8 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={BASE_URL + "/assets/" + post.userId?.picturePath}
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
        <img
          className="rounded-md"
          src={BASE_URL + "/assets/" + post.image}
          alt=""
        />
        <div className="w-[15rem] flex justify-between p-1 py-2">
          <button>
            <ChatBubbleOutlineRoundedIcon />
          </button>
          <button>
            <SyncRoundedIcon />
          </button>
          <button onClick={handleLikeButtonClick} className="flex">
            <p>{likeCount > 0 && likeCount}</p>
            <FavoriteBorderRoundedIcon
              style={{ color: isLiked ? "crimson" : "" }}
            />
          </button>
        </div>
      </div>
      <div className="absolute right-4">
        <PostMenu post={post} />
      </div>
    </div>
  );
};

export default Post;
