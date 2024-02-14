import React from "react";
import { useParams } from "react-router-dom";
import ProfileDetails from "../components/ProfileDetails";
import ProfileFeed from "../components/ProfileFeed";
import Navbar from "../components/Navbar";
import useUserPosts from "../hooks/useUserPosts";

const ProfilePage = () => {
  const { id } = useParams();
  useUserPosts(id, 1)
  return (
    <div className="flex flex-col">
      <Navbar/>
      <div className="flex justify-center" >
      <div className="border flex flex-col gap-2 border-gray-200 dark:border-gray-900 min-h-screen md:w-[40%] w-full rounded-md p-2">
        <ProfileDetails id={id} />
        <ProfileFeed />
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
