import { DropdownMenu } from "@radix-ui/themes";
import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useDispatch, useSelector } from "react-redux";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { toggleTheme } from "../state/AppSlice";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutAlert from "./LogoutAlert";
import { Link } from "react-router-dom";
import { BadgeCheck } from "lucide-react";

const NavbarMenu = () => {
  const theme = useSelector((state) => state.app.theme);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="cursor-pointer">
            <MenuRoundedIcon />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Link to={`/profile/${user._id}`}>
            <DropdownMenu.Item className="flex gap-3">
              <p>Profile</p>
              <AccountCircleOutlinedIcon fontSize="small" />
            </DropdownMenu.Item>
          </Link>
          <DropdownMenu.Item
            className="flex gap-3"
            // onClick={() => dispatch(toggleTheme())}
            onClick={(e) => {
              e.preventDefault();
              dispatch(toggleTheme());
            }}
          >
            <p>{theme === "dark" ? "Light mode" : "Dark mode"}</p>
            {theme === "dark" ? (
              <LightModeRoundedIcon fontSize="small" />
            ) : (
              <DarkModeRoundedIcon fontSize="small" />
            )}
          </DropdownMenu.Item>
          <Link to={`/verification`}>
            <DropdownMenu.Item className="flex gap-3">
              <p>Verification</p>
              <BadgeCheck size="20" />
            </DropdownMenu.Item>
          </Link>
          <DropdownMenu.Item
            color="red"
            onClick={(e) => e.preventDefault()}
            className="flex gap-3"
          >
            <LogoutAlert />
            <LogoutRoundedIcon fontSize="small" />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default NavbarMenu;
