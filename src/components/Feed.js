import React from "react";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";
import Post from "./Post";
import PostSkeleton from "./utils/PostSkeleton";
import useScollPagination from "../hooks/useScrollPagination";
import { SpinnerInfinity } from "spinners-react";

const Feed = () => {
  const user = useSelector((state) => state.auth.user);
  const { allPosts, loading, newPageLoading } = useSelector(
    (state) => state.post
  );
  useScollPagination();
  return (
    <div className="border flex flex-col gap-2 border-[--border-dark] dark:border-[--border-light] min-h-screen md:w-[40%] w-full rounded-md p-2 md:pb-2 pb-10">
      {user && <CreatePost />}
      {loading
        ? Array(5)
            .fill(0)
            .map((el, i) => <PostSkeleton key={i} />)
        : allPosts.map((post) => <Post key={post._id} post={post} />)}

      <div className="w-full md:h-10 h-20 flex justify-center items-center">
        {newPageLoading ? (
          <SpinnerInfinity
            color="white"
            secondaryColor="#545454"
            className="m-auto my-2"
            speed={100}
            size={40}
          />
        ) : (
          <h1></h1>
        )}
      </div>
    </div>
  );
};

export default Feed;
