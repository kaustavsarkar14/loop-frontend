import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    user: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      if (action.payload.token) {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      }
    },
    setAuthLoading: (state, action)=>{
        state.loading = action.payload
    },
    logout: (state, action)=>{
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    }
  },
});

export const { setUser,setAuthLoading,logout } = AuthSlice.actions;
export default AuthSlice.reducer;
