import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCommentsForPost = createAsyncThunk(
  "comment/getCommentsForPost",
  async (payload) => {
    const response = await axios.get(
      `https://sheltered-stream-23227.herokuapp.com/comment/${payload}`
    );

    return response.data;
  }
);

export const createNewComment = createAsyncThunk(
  "comment/createNewComment",
  async (payload) => {
    const response = await axios.post(
      `https://sheltered-stream-23227.herokuapp.com/post/${payload.postID}/comment`,
      { commentText: payload.commentText }
    );

    return response.data;
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    commentLoader: "idle",
  },
  extraReducers: {
    [getCommentsForPost.pending]: (state) => {
      state.commentLoader = "pending";
    },
    [getCommentsForPost.fulfilled]: (state, action) => {
      state.commentLoader = "idle";
      state.comments = action.payload.comments;
    },
    [getCommentsForPost.rejected]: (state, action) => {
      state.commentLoader = "error";
      console.log(action);
    },

    [createNewComment.fulfilled]: (state, action) => {
      state.comments.unshift(action.payload.comment);
    },
    [createNewComment.rejected]: (action) => {
      console.log(action);
    },
  },
});

export default commentSlice.reducer;
