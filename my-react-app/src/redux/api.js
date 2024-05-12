import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalStorage } from '../helpers/localStorage';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1/",
        prepareHeaders: headers => {
            const token = getLocalStorage('token')
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
        }
    }
    ),
    endpoints: (builder) => ({
        signUpUser: builder.mutation({
            query: (payload) => ({
                method: "POST",
                url: payload.isAdmin ? "/admin/signup" : "/signup",
                body: payload
            })
        }),
        loginUser: builder.mutation({
            query: (payload) => ({
                method: "POST",
                url: payload.isAdmin ? "/admin/login" : "/login",
                body: payload
            })
        }),
        getUsersLists: builder.mutation({
            query: () => ({
                url: '/admin/get_user_lists',
                method: "GET"
            })
        })
    })
})

export const {
    useLoginUserMutation,
    useSignUpUserMutation,
    useGetUsersListsMutation

} = api;