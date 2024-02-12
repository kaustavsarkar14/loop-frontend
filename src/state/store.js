import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./AppSlice";
import AuthSlice from "./AuthSlice";
import PostSlice from "./PostSlice";

const store = configureStore({
    reducer : {
        app: AppSlice,
        auth: AuthSlice,
        post: PostSlice
    }
})

export default store