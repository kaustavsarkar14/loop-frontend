import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPosts, setLoading } from "../state/PostSlice";

export default function useAllPosts() {
  const page = useSelector((state) => state.post.page);
  const { token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  async function fetchPosts() {
    if (!token) {
      try {
        const response = await axios.get(
          BASE_URL + `/post/getall?page=${page}`
        );
        if (response.data.length > 0) dispatch(addPosts(response.data));
      } catch (error) {
        console.log(error);
      }
      dispatch(setLoading(false));
    } else {
      if (!token) return;
      try {
        const response = await axios.get(BASE_URL + `/post/get?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`/post/get?page=${page}`);
        if (response.data.length > 0) dispatch(addPosts(response.data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(setLoading(false));
  }

  useEffect(() => {
    if (loading) return;
    fetchPosts();
  }, [page, token, loading]);
}
