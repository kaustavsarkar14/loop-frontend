import React from "react";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";
import Post from "./Post";
import PostSkeleton from "./utils/PostSkeleton";
import useScollPagination from "../hooks/useScrollPagination";

const Feed = () => {
  const user = useSelector((state) => state.auth.user);
  const { allPosts, loading } = useSelector((state) => state.post);
  useScollPagination();
  return (
    <div className="border flex flex-col gap-2 border-[--border-dark] dark:border-[--border-light] min-h-screen md:w-[40%] w-full rounded-md p-2">
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
