import { TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { SpinnerInfinity } from "spinners-react";
import toast from "react-hot-toast";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      searchUsers();
    }, 800);

    return () => clearTimeout(delaySearch);
  }, [search]);
  const searchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(BASE_URL + `/user/search`, { search });
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error searching users");
    }
  };
  return (
    <div className="flex justify-center">
      <div className="border flex flex-col gap-2 border-gray-200 dark:border-gray-900 min-h-screen md:w-[40%] w-full rounded-md p-2">
        <TextField.Root>
          <TextField.Slot>
            <SearchRoundedIcon />
          </TextField.Slot>
          <TextField.Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
          />
        </TextField.Root>

        {isLoading ? (
          <SpinnerInfinity
            color="white"
            secondaryColor="#545454"
            className="m-auto my-2"
          />
        ) : users.length == 0 ? (
          <h1 className="m-auto my-2" >No user found</h1>
        ) : (
          users.map((user) => <ProfileCard key={user._id} user={user} />)
        )}
      </div>
    </div>
  );
};

export default Search;
