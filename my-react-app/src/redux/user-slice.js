import { createSlice } from "@reduxjs/toolkit";
import { api } from "./api";
import { setLocalStorage } from "../helpers/localStorage";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        accessToken: ''
    }
    ,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(api.endpoints.loginUser.matchFulfilled,
            (state, action) => {
                setLocalStorage('isAdmin', action.payload.data.isAdmin);
                setLocalStorage('isLoggedIn', true);
                setLocalStorage('token', action.payload.data.token)
                return ({
                    ...state,
                    accessToken: action.payload.data.token
                })
            })
    }
})

const userReducer = userSlice.reducer;

export default userReducer