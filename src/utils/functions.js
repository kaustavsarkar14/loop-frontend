import axios from "axios";
import { BASE_URL } from "./constants";
import toast from "react-hot-toast";
import { createPost, deletePost } from "../state/PostSlice";

export async function handleImageUpload(e, setImagePath, setImageName) {
  if (!e.target.files[0]) return;
  try {
    const formData = new FormData();
    formData.append("picture", e.target.files[0]);
    const response = await axios.post(
      "http://localhost:8000/uploadfile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success("Image uploaded");
    setImageName(response.data.filename);
    setImagePath(BASE_URL + "/assets/" + response.data.filename);
  } catch (error) {
    console.log(error);
    toast.error("There was some problem uploading the image");
  }
}

export async function handlePost({
  title,
  imageName,
  token,
  dispatch,
  user,
  setIsPosting,
}) {
  setIsPosting(true);
  try {
    const response = await axios.post(
      BASE_URL + "/post/create",
      {
        title,
        image: imageName || "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Post sent");
    dispatch(createPost([{ ...response.data, userId: user }]));
  } catch (error) {
    console.log(error);
    toast.error("Failed to send post");
  }
  setIsPosting(false);
}

export async function handleDeletePost({ postId, token, dispatch }) {
  try {
    dispatch(deletePost({ postId }));
    const response = await axios.post(
      BASE_URL + "/post/delete",
      {
        postId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Post deleted");
  } catch (error) {
    toast.error("Post couldn't be deleted");
    console.log(error);
  }
}
