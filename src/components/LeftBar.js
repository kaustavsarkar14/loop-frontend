import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import ProfileCard from "./ProfileCard";

const LeftBar = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchNewUsers();
  }, []);
  const fetchNewUsers = async () => {
    const res = await axios.post(BASE_URL + "/user/getnew");
    setUsers(res.data);
  };
  return (
    <div className="md:block hidden border p-2 rounded-md h-fit border-[--border-dark] dark:border-[--border-light] w-[20rem] sticky top-12">
      <h1 className="text-sm my-1">New on LOOP</h1>
      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <ProfileCard key={user._id} user={user} isSmallWidth={true} />
        ))}
      </div>
    </div>
  );
};

export default LeftBar;
