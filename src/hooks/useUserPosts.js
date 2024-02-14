import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserPosts,
  clearUserPosts,
  resetProfilePageNumber,
  setIsLastPage,
} from "../state/ProfileSlice";

export default function useUserPosts(id) {
  const page = useSelector((state) => state.profile.page);
  const userPosts = useSelector((state) => state.profile.userPosts);
  const isLastPage = useSelector((state) => state.profile.isLastPage);

  const dispatch = useDispatch();
  async function fetchPosts() {
    try {
      const posts = await axios.get(BASE_URL + `/post/get/${id}?page=${page}`);
      if (posts.data.length == 0) dispatch(setIsLastPage(true));
      dispatch(addUserPosts(posts.data));
    } catch (error) {}
  }
  useEffect(() => {
    // Clear user posts only when the user ID changes
    console.log("CLEARING ALL POSTS");
    dispatch(resetProfilePageNumber());
    dispatch(clearUserPosts());
    dispatch(setIsLastPage(false))
  }, [id]);

  useEffect(() => {
    // Fetch posts when the page changes
    if (isLastPage) return;
    console.log("FETCHING POSTS");
    fetchPosts();
  }, [id, page]);
}
