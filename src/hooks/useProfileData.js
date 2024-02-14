import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import {
  setFollowCount,
  setFollowDetails,
  setIsOwnProfile,
  setUser,
  setUserLoading,
} from "../state/ProfileSlice";

export default function useProfileData(id) {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  async function fetchProfileData() {
    dispatch(setUserLoading(true));
    try {
      const profileData = await axios.get(BASE_URL + "/user/" + id);
      const stats = await axios.get(BASE_URL + "/user/stats/" + id);
      dispatch(
        setFollowCount({
          followingCount: stats.data.followings,
          followerCount: stats.data.followers,
        })
      );
      if (!token) dispatch(setUser(profileData.data));
      else {
        if (id == user._id) {
          console.log("user id>>>>", id, user._id);
          dispatch(setUser(profileData.data));
          return dispatch(setIsOwnProfile(true));
        }
        dispatch(setIsOwnProfile(false));
        const followDetails = await axios.get(
          BASE_URL + "/user/followdetails/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setFollowDetails(followDetails.data));
        dispatch(setUser(profileData.data));
      }
    } catch (error) {}
    dispatch(setUserLoading(false));
  }
  useEffect(() => {
    fetchProfileData();
  }, [token, id]);
}
