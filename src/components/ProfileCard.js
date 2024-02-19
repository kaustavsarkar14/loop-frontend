import { Avatar, Badge, Box, Card, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { follow, unFollow } from "../utils/profileFunctions";
import toast from "react-hot-toast";

const ProfileCard = ({ user, isSmallWidth }) => {
  const token = useSelector((state) => state.auth.token);
  const authUser = useSelector((state) => state.auth.user);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);

  useEffect(() => {
    if (token) fetchFollowDetails();
  }, [token]);
  const fetchFollowDetails = async () => {
    const followDetails = await axios.get(
      BASE_URL + "/user/followdetails/" + user._id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (followDetails.data.isFollowing) setIsFollowing(true);
    if (followDetails.data.isFollower) setIsFollower(true);
  };
  const handleFollow = (e) => {
    e.preventDefault();
    if (!authUser) return toast.error("Please login first");
    follow({ followingUserId: user._id, token });
    setIsFollower(true);
  };

  const handleUnFollow = (e) => {
    e.preventDefault();
    if (!authUser) return toast.error("Please login first");
    unFollow({ followingUserId: user._id, token });
    setIsFollower(false);
  };

  return (
    <Link to={`/profile/${user._id}`}>
      <Card>
        <Flex gap="3" align="center">
          <Avatar
            size="3"
            src={user.picturePath}
            radius="full"
            fallback={user.name[0]}
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              {isSmallWidth && user.name.length>15?user.name.slice(0, 15)+"...":user.name}
            </Text>
            <Text as="div" size="2" color="gray">
              @{user.username}{" "}
              {isFollowing && (
                <Badge color="blue" style={{ padding: "1px 4px" }}>
                  Follows you
                </Badge>
              )}
            </Text>
          </Box>
          {authUser?._id != user._id && (isFollower ? (
            <button
              className="py-1 px-3 border dark:text-white text-black rounded-full ml-auto text-sm"
              onClick={(e) => handleUnFollow(e)}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="py-1 px-3 bg-[--bg-dark] dark:bg-[--bg-light] text-white dark:text-black rounded-full ml-auto text-sm"
              onClick={(e) => handleFollow(e)}
            >
              Follow
            </button>
          ))}
        </Flex>
      </Card>
    </Link>
  );
};

export default ProfileCard;
