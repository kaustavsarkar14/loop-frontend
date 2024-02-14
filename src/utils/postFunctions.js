import axios from "axios";
import { BASE_URL } from "./constants";

export const like = async ({ postId, token }) => {
  try {
    const response = await axios.post(
      BASE_URL + "/like/like",
      { postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const unLike = async ({ postId, token }) => {
  try {
    const response = await axios.post(
      BASE_URL + "/like/unlike",
      { postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const fetchLikes = async ({ postId, setLikeCount, setIsLiked, userId }) => {
  try {
    const response = await axios.post(BASE_URL + "/like/getlikes", { postId });
    setLikeCount(response.data.likeDocs.length)
    response.data.likeDocs.map(likedoc=>{
        if(likedoc.userId==userId) setIsLiked(true)
    })
  } catch (error) {}
};
