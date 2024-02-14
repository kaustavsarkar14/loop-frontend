import React from "react";
import { BASE_URL } from "../utils/constants";
import PostMenu from "./PostMenu";
import { calculateTime } from "../utils/utilFunctions";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
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
      </div>
      <div className="absolute right-4">
        <PostMenu post={post} />
      </div>
    </div>
  );
};

export default Post;
