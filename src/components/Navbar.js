import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NavbarMenu from "./NavbarMenu";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../state/AppSlice";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const Navbar = () => {
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-full sticky top-0 z-10 flex justify-between bg-white bg-opacity-60 dark:bg-[--bg-black] dark:bg-opacity-60 text-[--text-dark] dark:text-[--text-light] md:px-[10%] h-12 items-center backdrop-blur-3xl px-8">
        <div className="w-24">
          <h1>LOGO</h1>
        </div>
        <div className="w-24 text-right">
          <NavbarMenu />
        </div>
      </div>
      <div className="md:w-[25rem] fixed z-20 md:h-12 md:flex md:items-center left-1/2 translate-x-[-50%] flex justify-between md:top-0 md:bottom-auto bottom-0 right-0 w-full bg-white dark:bg-black md:bg-transparent md:dark:bg-transparent md:p-0 p-3 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-3xl md:backdrop-blur-0">
        <HomeOutlinedIcon />
        <SearchRoundedIcon />
        <AddBoxOutlinedIcon />
        <Person2OutlinedIcon />
      </div>
    </>
  );
};

export default Navbar;
