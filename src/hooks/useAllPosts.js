import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPosts, setLoading } from "../state/PostSlice";

export default function useAllPosts(page) {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  async function fetchPosts() {
    if (!token) return;
    try {
      const response = await axios.get(BASE_URL + "/post/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addPosts(response.data));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  }

  useEffect(() => {
    fetchPosts();
  }, [page, token]);
}
