import React from "react";
import useProfileData from "../hooks/useProfileData";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { follow, unFollow } from "../utils/profileFunctions";
import { followUser, unFollowUser } from "../state/ProfileSlice";
import ProfileDataSekeleton from "./utils/ProfileDataSekeleton";

const ProfileDetails = ({ id }) => {
  const {
    user,
    userLoading,
    isOwnProfile,
    followDetails,
    followerCount,
    followingCount,
  } = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useProfileData(id);
  const handleFollow = () => {
    dispatch(followUser());
    follow({ followingUserId: id, token });
  };

  const handleUnFollow = () => {
    dispatch(unFollowUser());
    unFollow({ followingUserId: id, token });
  };
  if (userLoading) return <ProfileDataSekeleton/>;
  return (
    <div className="relative rounded-md overflow-hidden min-h-96" >
      <div className="h-44 overflow-hidden shadow-md ">
        <img src={user.bannerPath || "https://www.kudratikahumbo.com/wp-content/uploads/2019/12/Hero-Banner-Placeholder-Light-1024x480-1.png"} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="flex justify-between absolute -mt-12 w-full p-3">
        <div className="flex flex-col">
          <div className="h-28 w-28 overflow-hidden rounded-full">
            <img
              src={user.picturePath}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="mt-2" >
            {user.name}{" "} 
            <span className="text-sm opacity-50">@{user.username}</span>{" "}
            {!isOwnProfile && followDetails?.isFollowing && <span className="text-xs bg-gray-600 rounded-sm p-1 text-white" >Follows you</span>}
          </h1>
          <p>
            {followingCount} Followings {followerCount} Followers
          </p>
        </div>
        {isOwnProfile ? (
          <button className="p-1 px-3 border rounded-full h-fit mt-12">
            Edit profile
          </button>
        ) : followDetails ? (
          followDetails.isFollower ? (
            <button
              onClick={handleUnFollow}
              className="p-1 px-3 border dark:text-white text-black rounded-full h-fit mt-12"
            >
              Unfollow
            </button>
          ) : (
            <button
              className="p-1 px-3 bg-[--bg-dark] dark:bg-[--bg-light] text-white dark:text-black rounded-full h-fit mt-12"
              onClick={handleFollow}
            >
              Follow
            </button>
          )
        ) : (
          <button
            onClick={() => toast.error("Please login first")}
            className="p-1 px-3 bg-[--bg-dark] dark:bg-[--bg-light] text-white dark:text-black rounded-full h-fit mt-12"
          >
            Follow
          </button>
        )}

      </div>
    </div>
  );
};

export default ProfileDetails;
