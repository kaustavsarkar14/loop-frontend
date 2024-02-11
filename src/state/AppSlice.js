import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
  name: "app",
  initialState: {
    theme: "dark",
  },
  reducers: {
    toggleTheme: (state, action) => {
      if (state.theme == "dark") {
        state.theme = "light";
        document.documentElement.classList.remove("dark");
      } else {
        state.theme = "dark";
        document.documentElement.classList.add("dark");
      }
    },
  },
});

export const { toggleTheme } = AppSlice.actions;
export default AppSlice.reducer;
