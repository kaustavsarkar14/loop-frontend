import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { setAuthLoading, setUser } from "../state/AuthSlice";

export default function useUserFromToken() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(setAuthLoading(false));
      return;
    }
    axios
      .get(BASE_URL + "/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setUser({ user: response.data, token }));
        dispatch(setAuthLoading(false));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        dispatch(setAuthLoading(false));
      });
  }, [dispatch]);
}
