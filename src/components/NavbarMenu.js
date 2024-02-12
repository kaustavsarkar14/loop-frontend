import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../state/AppSlice";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function NavbarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation(); // Stop the event from propagating further
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTheme = () => {
    dispatch(toggleTheme());
    setAnchorEl(false);
  };
  return (
    <div>
      <div
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="cursor-pointer"
      >
        <MenuRoundedIcon />
      </div>
      <Menu
      className="absolute bottom-0"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className="flex flex-col w-fit px-2">
          <button className="py-1 flex justify-start items-center gap-2">
            <Person2OutlinedIcon fontSize="small" />
            <span>Profile</span>
          </button>
          <hr className="opacity-20" />
          <button
            className="py-1 flex justify-start items-center gap-2"
            onClick={handleTheme}
          >
            {theme == "dark" ? (
              <WbSunnyRoundedIcon />
            ) : (
              <DarkModeOutlinedIcon fontSize="small" />
            )}
            <span>{theme == "dark" ? "Light Theme" : "Dark Theme"}</span>
          </button>
          <hr className="opacity-20" />
          <button className="py-1 flex justify-start items-center gap-2">
            <LogoutOutlinedIcon fontSize="small" />
            <span>Log out</span>
          </button>
        </div>
      </Menu>
    </div>
  );
}
