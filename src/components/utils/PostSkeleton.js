import React from "react";

const PostSkeleton = () => {
  return (
    <div className="flex w-full border gap-2 p-2 pr-8 dark:border-[--border-light] rounded-md animate-pulse">
      <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      <div className=" w-full flex flex-col gap-2">
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-72 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
