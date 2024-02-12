import React from "react";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";
import useAllPosts from "../hooks/useAllPosts";
import Post from "./Post";

const Feed = () => {
  const user = useSelector((state) => state.auth.user);
  const {allPosts, loading} = useSelector(state=>state.post)
  useAllPosts();
  return (
    <div className="border flex-col gap-4 border-gray-200 dark:border-gray-900 min-h-screen md:w-[40%] w-full rounded-md p-2">
      {user && <CreatePost />}
      {
        loading?
        <h1>Loading...</h1>
        :
        (
            allPosts.map(post=><Post key={post._id} post={post} />)
        )
      }
    </div>
  );
};

export default Feed;
