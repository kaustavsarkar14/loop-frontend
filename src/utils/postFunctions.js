import axios from "axios";
import { BASE_URL } from "./constants";
import toast from "react-hot-toast";
import { createPost } from "../state/PostSlice";

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

export const fetchLikes = async ({
  postId,
  setLikeCount,
  setIsLiked,
  userId,
}) => {
  try {
    const response = await axios.post(BASE_URL + "/like/getlikes", { postId });
    setLikeCount(response.data.likeDocs.length);
    response.data.likeDocs.map((likedoc) => {
      if (likedoc.userId == userId) setIsLiked(true);
    });
  } catch (error) {}
};
export const fetchReposts = async ({
  postId,
  setRepostCount,
  setIsRepost,
  userId,
}) => {
  try {
    const response = await axios.post(BASE_URL + "/post/reposts", { postId });
    console.log(response);
    setRepostCount(response.data.length)
    response.data.map(repostdoc=>{
        if(repostdoc.reposterId==userId) setIsRepost(true)
    })
  } catch (error) {}
};

export async function handleRepost({
  post,
  reposterId,
  token,
  user,
  dispatch,
}) {
  try {
    const response = await axios.post(
      BASE_URL + "/post/create",
      {
        ...post,
        isRepost: true,
        reposterId,
        originalPostId: post._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    toast.success("Reposted");
    dispatch(createPost([{ ...response.data, userId: user }]));
  } catch (error) {
    console.log(error);
    toast.error("Failed to send post");
  }
}
export async function handleUndoRepost({ post, token }) {
  try {
    const response = await axios.post(
      BASE_URL + "/post/undorepost",
      {
        postId: post._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    toast.success("Repost deleted");
    //   dispatch(deletePost({ originalPostId:post._id }));
  } catch (error) {
    console.log(error);
    toast.error("Failed to send post");
  }
}
