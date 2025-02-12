import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthResponse,
  LogoutResponse,
  MyProfileResponse,
  SigninRequest,
  SignupRequest,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "types";
import {
  setAuthenticated,
  setUser,
  setLoading,
} from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1", credentials: "include" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (body) => {
        return {
          url: "/signup",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMyProfile.initiate());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    signin: builder.mutation<AuthResponse, SigninRequest>({
      query: (body) => {
        return {
          url: "/signin",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMyProfile.initiate());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getMyProfile: builder.query<MyProfileResponse, void>({
      query: () => "/myprofile",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
          dispatch(setAuthenticated(true));
        } catch (err) {
          dispatch(setUser(null));
          dispatch(setAuthenticated(false));
          console.log(err);
        } finally {
          dispatch(setLoading(false));
        }
      },
      providesTags: ["User"],
    }),
    signout: builder.query<LogoutResponse, void>({
      query: () => "/signout",
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   try {
      //     await queryFulfilled;
      //     dispatch(logout());
      //   } catch (err) {
      //     console.error("Error signing out:", err);
      //   }
      // },
    }),
    updateMyProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: (body) => {
        return {
          url: "/updateprofile",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useGetMyProfileQuery,
  useLazySignoutQuery,
  useUpdateMyProfileMutation,
} = userApi;
