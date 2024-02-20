import axios from "axios";
import { BASE_URL } from "./constants";
import toast from "react-hot-toast";
import { createPost, deletePost } from "../state/PostSlice";
import { deletePostFromProfileFeed } from "../state/ProfileSlice";

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
  file,
  token,
  dispatch,
  user,
  setIsPosting, setTitle, setImage, setFile
}) {
  setIsPosting(true);
  try {
    const data = new FormData();
    data.append("upload_preset", "loop-socialmedia");
    data.append("cloud_name", "dujoneujx");
    let cld
    if (file) {
      data.append("file", file);
       cld = await axios.post(
        "https://api.cloudinary.com/v1_1/dujoneujx/upload",
        data
      );
    }

    const response = await axios.post(
      BASE_URL + "/post/create",
      {
        title,
        image: cld?.data?.secure_url || "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setFile(null);
    setImage(null);
    setTitle("");
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
    dispatch(deletePostFromProfileFeed({ postId }));
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
