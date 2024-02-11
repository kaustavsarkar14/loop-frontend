import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name : "auth",
    initialState: {
        user: null,
        token: null
    },
    reducers : {
        setUser : (state, action)=>{
            state.user = action.payload.user
            state.token = action.payload.token
        }
    }
})


export const {setUser} = AuthSlice.actions
export default AuthSlice.reducer