import { createTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../state/AppSlice";

export default function useMUITheme() {
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme !== theme) {
      dispatch(toggleTheme());
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  const Theme = createTheme({
    palette: {
      mode: theme,
    },
  });
  return Theme;
}
