import React from "react";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux";
import { SpinnerInfinity } from "spinners-react";

const LeftBar = () => {
  const { newUserList, newUserListLoading } = useSelector((state) => state.app);

  return (
    <div className="md:block hidden border p-2 rounded-md h-fit border-[--border-dark] dark:border-[--border-light] w-[20rem] sticky top-12">
      <h1 className="text-sm my-1">New on LOOP</h1>
      <div className="flex flex-col gap-2 min-h-44">
        {newUserListLoading ? (
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
