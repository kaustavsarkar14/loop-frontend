import axios from "axios";
import { BASE_URL } from "./constants";
import toast from "react-hot-toast";

export const follow = async ({ followingUserId, token }) => {
  try {
    const response = await axios.post(
      BASE_URL + "/follow/follow-user",
      { followingUserId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {}
};
export const unFollow = async ({ followingUserId, token }) => {
  try {
    const response = await axios.post(
      BASE_URL + "/follow/unfollow-user",
      { followingUserId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {}
};

export const editProfile = async ({
  token,
  newName,
  newEmail,
  newUsername,
  newBio,
  occupation,
  location,
  newProfileImageFile,
  newBannerFile,
  setIsLoading
}) => {
  setIsLoading(true)
  try {
    const data = new FormData();
    data.append("upload_preset", "bannerImages");
    data.append("cloud_name", "dujoneujx");
    let bannerImage;
    if (newBannerFile) {
      data.append("file", newBannerFile);
      bannerImage  = await axios.post(
        "https://api.cloudinary.com/v1_1/dujoneujx/upload",
        data
      );
    }
    const data2 = new FormData();
    data2.append("upload_preset", "loop-profile-images");
    data2.append("cloud_name", "dujoneujx");
    let profileImage;
    if (newProfileImageFile) {
      data2.append("file", newProfileImageFile);
      profileImage = await axios.post(
        "https://api.cloudinary.com/v1_1/dujoneujx/upload",
        data2
      );
    }
  
    const response = await axios.post(
      BASE_URL + "/user/editprofile",
      {
        newName,
        newEmail,
        newUsername,
        newBio,
        newOccupation:occupation,
        newLocation:location,
        newPicturepath: profileImage?.data?.secure_url,
        newBannerpath: bannerImage?.data?.secure_url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("res",response.data);
    toast.success("Profile updated")
  } catch (error) {
    toast.error(error.response.data.error);
  }
  setIsLoading(false)
};
