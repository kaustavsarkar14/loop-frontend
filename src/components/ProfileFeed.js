import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import PostSkeleton from "./utils/PostSkeleton";

const ProfileFeed = () => {
  const { userPosts, feedLoading } = useSelector((state) => state.profile);
  if (userPosts.length == 0 && !feedLoading)
    return (
      <h1 className="text-center py-4 border-t border-[--border-dark] dark:border-[--border-light]">
        No post yet
      </h1>
    );
  return (
    <div className="border-t border-[--border-dark] dark:border-[--border-light] flex flex-col gap-2">
      {feedLoading
        ? Array(5)
            .fill(0)
            .map((el, i) => <PostSkeleton key={i} />)
        : userPosts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default ProfileFeed;
