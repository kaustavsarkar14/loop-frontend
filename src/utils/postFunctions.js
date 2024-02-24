import axios from "axios";
import { BASE_URL } from "./constants";
import toast from "react-hot-toast";
import { createPost, deletePost, editPost } from "../state/PostSlice";

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
    setRepostCount(response.data.length);
    response.data.map((repostdoc) => {
      if (repostdoc.reposterId == userId) setIsRepost(true);
    });
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
        userId: post.userId._id,
        isRepost: true,
        reposterId,
        originalPostId: post._id,
        title: post.title,
        image: post.image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    toast.success("Reposted");
    dispatch(
      createPost([{ ...response.data, userId: post.userId, reposterId }])
    );
  } catch (error) {
    console.log(error);
    toast.error("Failed to send post");
  }
}
export async function handleUndoRepost({ post, token, dispatch, user }) {
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
    dispatch(deletePost({ postId: post._id, userId: user._id }));
  } catch (error) {
    console.log(error);
    toast.error("Failed to send post");
  }
}

export const handleEditPost = async ({
  postId,
  title,
  file,
  token,
  image,
  setIsSaving,
  dispatch,
}) => {
  try {
    setIsSaving(true);
    const data = new FormData();
    data.append("upload_preset", "loop-socialmedia");
    data.append("cloud_name", "dujoneujx");
    let cld;
    if (file) {
      data.append("file", file);
      cld = await axios.post(
        "https://api.cloudinary.com/v1_1/dujoneujx/upload",
        data
      );
    }
    const body = {};
    if (file && cld) body.image = cld?.data?.secure_url;
    if (title) body.title = title;
    if (!image) body.image = "";

    const response = await axios.post(
      BASE_URL + "/post/edit",
      { postId, data: body },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(editPost({ postId: response.data._id, post: response.data }));
    toast.success("Post edited");
    // console.log(response.data);
  } catch (error) {
    console.log(error);
    toast.error("Some error occured");
  }
  setIsSaving(false);
};
