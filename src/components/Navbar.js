import React from "react";
import NavbarMenu from "./NavbarMenu";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreatePostAlert from "./CreatePostAlert";
import { SpinnerInfinity } from "spinners-react";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <div className="w-full sticky top-0 z-10 flex justify-between dark:bg-[--bg-black] bg-opacity-95 backdrop-blur-[16rem]  text-[--text-dark] dark:text-[--text-light] md:px-[10%] h-12 items-center px-8">
        <Link to={'/'} className="w-24 flex gap-2 items-center">
        <SpinnerInfinity
            color="white"
            secondaryColor="#545454"
            className="m-auto my-2"
            speed={10}
            size={40}
          />
          <h1 className="font-semibold tracking-wider" >LOOP</h1>
        </Link>
        <div className="md:flex hidden w-[40%] justify-between">
          <Link
            to={"/"}
            className="p-1 px-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-900"
          >
            <HomeOutlinedIcon />
          </Link>
          <Link to={"/search"} className="cursor-pointer  p-1 px-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-900">
            <SearchRoundedIcon />
          </Link>
          <div className="cursor-pointer p-1 px-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-900">
            <CreatePostAlert />
          </div>
          <Link
            to={user ? `/profile/${user._id}` : "/login"}
            className="p-1 px-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-900"
          >
            <Person2OutlinedIcon />
          </Link>
        </div>
        <div className="w-24 text-right">
          <Link to={"/login"}>
            {!user ? (
              <button className="p-1 text-md px-3 hover:bg-gray-900 rounded-md">
                Login
              </button>
            ) : (
              <NavbarMenu />
            )}
          </Link>
        </div>
      </div>
      <div className="md:w-64 md:hidden fixed z-50 flex justify-between items-center bottom-0 left-0 right-0 w-full bg-gradient-to-t from-white dark:from-black to-transparent  backdrop-blur-lg p-3">
      <Link
            to={"/"}
            className="p-1 px-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-900"
          >
            <HomeOutlinedIcon />
          </Link>
          <Link to={"/search"} className="cursor-pointer  p-1 px-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-900">
            <SearchRoundedIcon />
          </Link>
          <div className="cursor-pointer p-1 px-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-900">
            <CreatePostAlert />
          </div>
          <Link
            to={user ? `/profile/${user._id}` : "/login"}
            className="p-1 px-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-900"
          >
            <Person2OutlinedIcon />
          </Link>
      </div>
    </>
  );
};

export default Navbar;
