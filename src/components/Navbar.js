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
    <div className="w-full flex justify-between bg-[--bg-light] dark:bg-[--bg-dark] text-[--text-dark] dark:text-[--text-light] md:px-[10%] py-3 px-8">
      <div className="w-24">
        <h1>LOGO</h1>
      </div>
      <div className="md:w-[20rem] flex justify-between md:static absolute bottom-0 left-0 w-full bg-[--bg-light] dark:bg-[--bg-dark] md:p-0 p-3">
        <HomeOutlinedIcon fontSize="medium" />
        <SearchRoundedIcon />
        <AddBoxOutlinedIcon />
        <Person2OutlinedIcon />
      </div>
      <div className="w-24 text-right">
        <NavbarMenu />
      </div>
    </div>
  );
};

export default Navbar;
