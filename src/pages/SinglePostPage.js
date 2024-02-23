import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import PostSkeleton from "../components/utils/PostSkeleton";
import Post from "../components/Post";

const SinglePostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPost();
  }, []);
  const fetchPost = async () => {
    try {
      const response = await axios.get(BASE_URL + `/post/getpost/${id}`);
      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col relative">
      <Navbar />
      <div className="min-h-screen bg-[--bg-light] dark:bg-[--bg-dark] flex justify-center gap-6">
        <div className="border flex justify-center gap-2 border-[--border-dark] dark:border-[--border-light] min-h-screen md:w-[40%] w-full rounded-md p-2 ">
          {
            loading?
            <PostSkeleton/>
            :
            <Post post={post} isPostPage={true} />
          }
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
