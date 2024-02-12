import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "post",
  initialState: {
    allPosts: [],
    loading: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addPosts: (state, action) => {
      state.allPosts = [...state.allPosts, ...action.payload];
    },
    createPost: (state, action) => {
      state.allPosts = [...action.payload,...state.allPosts ];
    },
  },
});

export const { setLoading, addPosts,createPost } = PostSlice.actions;
export default PostSlice.reducer;
