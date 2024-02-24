import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
  name: "app",
  initialState: {
    theme: "dark",
    newUserList : []
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
    addNewUsersList : (state,action)=>{
      state.newUserList = action.payload
    }
  },
});

export const { toggleTheme,addNewUsersList } = AppSlice.actions;
export default AppSlice.reducer;
