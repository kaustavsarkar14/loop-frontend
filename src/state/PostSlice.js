import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "post",
  initialState: {
    allPosts: [],
    loading: true,
    page: 1,
    newPageLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.newPageLoading = false;
    },
    addPosts: (state, action) => {
      state.newPageLoading = false;
      state.allPosts = [...state.allPosts, ...action.payload];
      if (state.allPosts.length > 100) state.allPosts.splice(0, 10);
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
        return;
      }
      state.allPosts = state.allPosts.filter(
        (post) => post._id != action.payload.postId
      );
    },
    editPost: (state, action) => {
      console.log(action.payload);
      state.allPosts = state.allPosts.map((post) => {
        if (post._id == action.payload.postId) {
          return {...post, title:action.payload.post.title, image:action.payload.post.image};
        }
        return post;
      });
    },
    increasePage: (state, action) => {
      state.newPageLoading = true;
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
  editPost,
} = PostSlice.actions;
export default PostSlice.reducer;
