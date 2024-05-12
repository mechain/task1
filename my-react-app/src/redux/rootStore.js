import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import userReducer from "./user-slice";

const rootStore = configureStore({
    reducer: combineReducers({
        user: userReducer,
        [api.reducerPath]: api.reducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export default rootStore