import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./AppSlice";
import AuthSlice from "./AuthSlice";
import PostSlice from "./PostSlice";
import ProfileSlice from "./ProfileSlice";

const store = configureStore({
    reducer : {
        app: AppSlice,
        auth: AuthSlice,
        post: PostSlice,
        profile: ProfileSlice
    }
})

export default store