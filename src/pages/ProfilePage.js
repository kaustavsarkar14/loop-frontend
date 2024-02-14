import React from "react";
import { useParams } from "react-router-dom";
import ProfileDetails from "../components/ProfileDetails";
import ProfileFeed from "../components/ProfileFeed";

const ProfilePage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="min-h-screen bg-[--bg-light] dark:bg-[--bg-dark] flex justify-center">
      <div className="border flex flex-col gap-2 border-gray-200 dark:border-gray-900 min-h-screen md:w-[40%] w-full rounded-md p-2">
        <ProfileDetails />
        <ProfileFeed />
      </div>
    </div>
  );
};

export default ProfilePage;
