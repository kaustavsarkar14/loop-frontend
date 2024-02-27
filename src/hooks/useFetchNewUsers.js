import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addNewUsersList } from "../state/AppSlice";
import { useDispatch } from "react-redux";

const useFetchNewUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchNewUsers();
  }, []);
  const fetchNewUsers = async () => {
    const res = await axios.post(BASE_URL + "/user/getnew");
    dispatch(addNewUsersList(res.data));
  };
};

export default useFetchNewUser;
