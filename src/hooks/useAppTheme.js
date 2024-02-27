import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../state/AppSlice";

export default function useAppTheme() {
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme == "light" && theme == "dark") {
      dispatch(toggleTheme());
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
}
