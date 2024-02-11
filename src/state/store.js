import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./AppSlice";
import AuthSlice from "./AuthSlice";

const store = configureStore({
    reducer : {
        app: AppSlice,
        auth: AuthSlice
    }
})

export default store