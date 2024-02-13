import React from "react";
import { BASE_URL } from "../utils/constants";
import PostMenu from "./PostMenu";

const Post = ({ post }) => {
  return (
    <div className="flex border gap-2 p-2 pr-8 dark:border-[--border-light] rounded-md relative">
      <img
        className="h-8 w-8 rounded-full object-cover"
        src={BASE_URL + "/assets/" + post.userId?.picturePath}
        alt=""
      />
      <div>
        <div className="flex gap-1 items-center">
          <h2 className="font-semibold">{post.userId?.name}</h2>
          <h3 className="opacity-55 text-sm">@{post.userId?.username}</h3>
        </div>
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
