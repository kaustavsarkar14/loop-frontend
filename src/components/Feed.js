import React from "react";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";

const Feed = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="border border-gray-200 dark:border-gray-900 h-screen md:w-[40%] w-full rounded-md p-2">
      {user && <CreatePost />}
      Feed
    </div>
  );
};

export default Feed;
