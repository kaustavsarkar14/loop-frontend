import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import ProfileCard from "./ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { addNewUsersList } from "../state/AppSlice";
import { SpinnerInfinity } from "spinners-react";

const LeftBar = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const newUserList = useSelector((state) => state.app.newUserList);

  useEffect(() => {
    fetchNewUsers();
  }, []);
  const fetchNewUsers = async () => {
    const res = await axios.post(BASE_URL + "/user/getnew");
    dispatch(addNewUsersList(res.data));
    setLoading(false);
  };
  return (
    <div className="md:block hidden border p-2 rounded-md h-fit border-[--border-dark] dark:border-[--border-light] w-[20rem] sticky top-12">
      <h1 className="text-sm my-1">New on LOOP</h1>
      <div className="flex flex-col gap-2 min-h-44">
        {loading ? (
          <SpinnerInfinity
            color="white"
            secondaryColor="#545454"
            className="m-auto my-10"
          />
        ) : (
          newUserList.map((user) => (
            <ProfileCard key={user._id} user={user} isSmallWidth={true} />
          ))
        )}
      </div>
    </div>
  );
};

export default LeftBar;
