import React from "react";
import NavbarMenu from "./NavbarMenu";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <div className="w-full sticky top-0 z-10 flex justify-between dark:bg-[--bg-black] bg-opacity-95 backdrop-blur-[16rem]  text-[--text-dark] dark:text-[--text-light] md:px-[10%] h-12 items-center px-8">
        <div className="w-24">
          <h1>LOGO</h1>
        </div>
        <div className="md:flex hidden w-[40%] justify-between">
          <HomeOutlinedIcon />
          <SearchRoundedIcon />
          <AddBoxOutlinedIcon />
          <Person2OutlinedIcon />
        </div>
        <div className="w-24 text-right">
          <Link to={'/login'}>
          {!user ? <button className="p-1 text-md px-3 hover:bg-gray-900 rounded-md" >Login</button> : <NavbarMenu />}
          </Link>
        </div>
      </div>
      <div className="md:w-[25rem] md:hidden fixed z-20  left-1/2 translate-x-[-50%] flex justify-between bottom-0 right-0 w-full bg-white dark:bg-black p-3 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-3xl">
        <HomeOutlinedIcon />
        <SearchRoundedIcon />
        <AddBoxOutlinedIcon />
        <Person2OutlinedIcon />
      </div>
    </>
  );
};

export default Navbar;
