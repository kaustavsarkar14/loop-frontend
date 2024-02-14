import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    userLoading: true,
    feedLoading: true,
    userPosts: [],
    userLikedPosts: [],
    isOwnProfile: false,
    followDetails: null,
    userPosts: [],
    page: 1,
    isLastPage : false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userLoading = false;
    },
    setIsOwnProfile: (state, action) => {
      state.isOwnProfile = action.payload;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    setFollowDetails: (state, action) => {
      state.followDetails = action.payload;
    },
    setFollowCount: (state, action) => {
      console.log(action.payload);
      state.followerCount = action.payload.followerCount;
      state.followingCount = action.payload.followingCount;
    },
    followUser: (state) => {
      state.followDetails.isFollower = true;
      state.followerCount += 1;
    },
    unFollowUser: (state) => {
      state.followDetails.isFollower = false;
      state.followerCount -= 1;
    },
    addUserPosts: (state, action) => {
      state.userPosts = [...state.userPosts, ...action.payload];
      state.feedLoading = false;
    },
    clearUserPosts: (state) => {
      state.userPosts = [];
    },
    deletePostFromProfileFeed: (state, action)=>{
        state.userPosts = state.userPosts.filter(post=>post._id!=action.payload.postId)
    },
    increaseProfileFeedPage : (state)=>{
      state.page += 1
    },
    resetProfilePageNumber : (state)=>{
      state.page = 1
    },
    setIsLastPage: (state, action)=>{
      state.isLastPage = action.payload
    }
  },
});

export const {
  setUser,
  setIsOwnProfile,
  setUserLoading,
  setFollowDetails,
  setFollowCount,
  followUser,
  unFollowUser,
  addUserPosts,clearUserPosts,
  deletePostFromProfileFeed,
  increaseProfileFeedPage,resetProfilePageNumber,
  setIsLastPage
} = ProfileSlice.actions;
export default ProfileSlice.reducer;
