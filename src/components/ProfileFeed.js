import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import PostSkeleton from "./utils/PostSkeleton";

const ProfileFeed = () => {
  const { userPosts, feedLoading } = useSelector((state) => state.profile);
  if (userPosts.length == 0 && !feedLoading) return <h1>There is no post</h1>;
  return (
    <div>
      {feedLoading
        ? Array(5)
            .fill(0)
            .map((el, i) => <PostSkeleton key={i} />)
        : userPosts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default ProfileFeed;
