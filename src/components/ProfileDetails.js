import React from "react";
import useProfileData from "../hooks/useProfileData";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { follow, unFollow } from "../utils/profileFunctions";
import { followUser, unFollowUser } from "../state/ProfileSlice";
import ProfileDataSekeleton from "./utils/ProfileDataSekeleton";
import EditProfile from "./EditProfile";
import { PLACEHOLDER_BANNER } from "../utils/constants";
import { BadgeCheck, Briefcase, MapPin } from "lucide-react";
import { Avatar, Badge, Tooltip } from "@radix-ui/themes";

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
  if (userLoading) return <ProfileDataSekeleton />;
  return (
    <div className="relative rounded-md overflow-hidden min-h-[27rem]">
      <div className="h-44 overflow-hidden shadow-md ">
        <img
          src={user?.bannerPath || PLACEHOLDER_BANNER}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className="flex justify-between  -mt-12 w-full p-3">
        <div className="flex flex-col max-w-full">
          <div className="h-28 w-28 overflow-hidden rounded-full bg-black flex justify-center items-center">
            <Avatar
              src={user.picturePath}
              fallback={user.name[0]}
              radius="full"
              size="8"
            />
          </div>
          <div className="mt-2">
            <h1>
              {user.name}

              {user.isVerified && (
                <Tooltip content="Verified User">
                  <span>
                    <BadgeCheck className="inline ml-1" size="18" />
                  </span>
                </Tooltip>
              )}
            </h1>
            <span className="text-sm opacity-50">@{user.username}</span>{" "}
            {!isOwnProfile && followDetails?.isFollowing && (
              <Badge color="blue">Follows you</Badge>
            )}
          </div>
          <p>
            {followingCount} Followings {followerCount} Followers
          </p>

          <div className="flex gap-2">
            {user.location && (
              <div className="flex gap-1 opacity-50 items-center">
                <MapPin size={17} /> <p>{user.location}</p>
              </div>
            )}
            {user.occupation && (
              <div className="flex gap-1 opacity-50 items-center">
                <Briefcase size={17} /> <p>{user.occupation}</p>
              </div>
            )}
          </div>
          <p className="text-sm">{user.bio}</p>
        </div>
        <div className="absolute right-4">
          {isOwnProfile ? (
            <EditProfile />
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
    </div>
  );
};

export default ProfileDetails;
