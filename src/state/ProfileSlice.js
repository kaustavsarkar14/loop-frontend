import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
    name:"profile",
    initialState:{
        user: null,
        userLoading: true,
        feedLoading: true,
        userPosts: [],
        userLikedPosts: [],
        isOwnProfile : false,
        followDetails : null,
    },
    reducers: {
        setUser : (state, action)=>{
            state.user = action.payload
            state.userLoading = false
        },
        setIsOwnProfile: (state, action)=>{
            state.isOwnProfile = action.payload
        },
        setUserLoading: (state, action)=>{
            state.userLoading = action.payload
        },
        setFollowDetails : (state, action)=>{
            state.followDetails = action.payload
        },
        setFollowCount : (state, action)=>{
            console.log(action.payload)
            state.followerCount = action.payload.followerCount;
            state.followingCount = action.payload.followingCount;
        },
        followUser : (state)=>{
            state.followDetails.isFollower = true
            state.followerCount +=1
        },
        unFollowUser : (state)=>{
            state.followDetails.isFollower = false
            state.followerCount -=1
        }
    }
})

export const {setUser,setIsOwnProfile,setUserLoading,setFollowDetails,setFollowCount,followUser,unFollowUser} = ProfileSlice.actions
export default ProfileSlice.reducer