import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AddCommentRequest,
  AddCommentResponse,
  CreatePostRequest,
  CreatePostResponse,
  DeletePostResponse,
  EditPostRequest,
  EditPostResponse,
  GetCommentsResponse,
  GetLikeResponse,
  GetMyPostResponse,
  GetPostsResponse,
  GetSinglePostResponse,
} from "types";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Post", "Comment"],
  endpoints: (builder) => ({
    getPosts: builder.query<
      GetPostsResponse,
      { search: string; page: number; limit: number }
    >({
      query: (params) => ({
        url: "/getposts",
        params: {
          search: params.search,
          page: params.page,
          limit: params.limit,
        },
      }),
      providesTags: ["Post"],
    }),
    getSinglePost: builder.query<GetSinglePostResponse, string>({
      query: (id) => `/getpost/${id}`,
      providesTags: ["Post"],
    }),
    togglePost: builder.mutation<GetLikeResponse, string>({
      query: (postId) => ({
        url: "/like",
        method: "POST",
        body: { postId },
      }),
      invalidatesTags: ["Post"],
    }),
    addComment: builder.mutation<AddCommentResponse, AddCommentRequest>({
      query: ({ postId, content }) => ({
        url: "/comment",
        method: "POST",
        body: { postId, content },
      }),
    }),
    getComments: builder.query<GetCommentsResponse, string>({
      query: (postId) => `${postId}/comments`,
    }),
    createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
      query: (body) => ({
        url: "/createpost",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    getMyPosts: builder.query<GetMyPostResponse, void>({
      query: () => "/getmyposts",
      providesTags: ["Post"],
    }),
    deletePost: builder.mutation<DeletePostResponse, string>({
      query: (id) => ({
        url: `/deletepost/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation<EditPostResponse, EditPostRequest>({
      query: ({ id, body }) => ({
        url: `/editpost/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    adminAllPosts: builder.query<GetMyPostResponse, void>({
      query: () => ({
        url: "/admin/allposts",
      }),
      providesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetSinglePostQuery,
  useTogglePostMutation,
  useAddCommentMutation,
  useGetCommentsQuery,
  useCreatePostMutation,
  useGetMyPostsQuery,
  useDeletePostMutation,
  useEditPostMutation,
  useAdminAllPostsQuery,
} = postApi;
