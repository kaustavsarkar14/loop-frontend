import { DropdownMenu } from "@radix-ui/themes";
import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useDispatch, useSelector } from "react-redux";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { toggleTheme } from "../state/AppSlice";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutAlert from "./LogoutAlert";

const NavbarMenu = () => {
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch()
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="cursor-pointer">
            <MenuRoundedIcon />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item className="flex gap-3">
            <p>Profile</p>
            <AccountCircleOutlinedIcon fontSize="small" />
          </DropdownMenu.Item>
          <DropdownMenu.Item className="flex gap-3" onClick={()=>dispatch(toggleTheme())}>
            <p>{theme === "dark" ? "Light mode" : "Dark mode"}</p>
            {theme === "dark" ? (
              <LightModeRoundedIcon fontSize="small" />
            ) : (
              <DarkModeRoundedIcon fontSize="small" />
            )}
          </DropdownMenu.Item>
          <DropdownMenu.Item color="red" onClick={e=>e.preventDefault()} className="flex gap-3">
            <LogoutAlert/>
            <LogoutRoundedIcon fontSize="small" />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default NavbarMenu;