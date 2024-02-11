import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../state/AppSlice";

export default function NavbarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTheme=()=>{
    dispatch(toggleTheme())
    setAnchorEl(false)
  }
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
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className="flex flex-col w-fit px-2">
          <button className="py-1">Profile</button>
          <hr className="opacity-20" />
          <button className="py-1" onClick={handleTheme}>Light Theme</button>
          <hr className="opacity-20" />
          <button className="py-1">Log out</button>
        </div>
      </Menu>
    </div>
  );
}
