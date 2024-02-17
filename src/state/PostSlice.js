import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "post",
  initialState: {
    allPosts: [],
    loading: true,
    page: 1,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addPosts: (state, action) => {
      state.allPosts = [...state.allPosts, ...action.payload];
    },
    createPost: (state, action) => {
      state.allPosts = [...action.payload, ...state.allPosts];
    },
    clearPosts: (state, action) => {
      state.allPosts = [];
    },
    deletePost: (state, action) => {
      if (action.payload.userId) {
        state.allPosts = state.allPosts.filter(
          (post) =>
            post.originalPostId != action.payload.postId &&
            post.reposterId != action.payload.userId
        );
        return
      }
      state.allPosts = state.allPosts.filter(
        (post) => post._id != action.payload.postId
      );
      
    },
    increasePage: (state, action) => {
      state.page = state.page + 1;
    },
  },
});

export const {
  setLoading,
  addPosts,
  createPost,
  clearPosts,
  deletePost,
  increasePage,
} = PostSlice.actions;
export default PostSlice.reducer;
