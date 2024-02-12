import React, { useState } from "react";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";
import useAllPosts from "../hooks/useAllPosts";
import Post from "./Post";
import PostSkeleton from "./utils/PostSkeleton";

const Feed = () => {
  const user = useSelector((state) => state.auth.user);
  const { allPosts, loading } = useSelector((state) => state.post);
  const [page, setPage] = useState(1);
  useAllPosts();
  return (
    <div className="border flex flex-col gap-2 border-gray-200 dark:border-gray-900 min-h-screen md:w-[40%] w-full rounded-md p-2">
      {user && <CreatePost />}
      {loading
        ? Array(5)
            .fill(0)
            .map((el, i) => <PostSkeleton key={i} />)
        : allPosts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default Feed;
