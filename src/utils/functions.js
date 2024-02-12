import axios from "axios";
import { BASE_URL } from "./constants";
import toast from "react-hot-toast";
import {  createPost } from "../state/PostSlice";
import { setLoading } from "../state/AuthSlice";

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

export async function handlePost({ title, imageName, token, dispatch, user }) {
  dispatch(setLoading(true))
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
  dispatch(setLoading(false))
}
