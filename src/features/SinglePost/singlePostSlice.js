import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSinglePost = createAsyncThunk(
  "singlePost/getSinglePost",
  async (payload) => {
    const response = await axios.get(
      `https://sheltered-stream-23227.herokuapp.com/post/${payload}`
    );

    return response.data;
  }
);

export const singlePostSlice = createSlice({
  name: "singlePost",
  initialState: {
    post: null,
  },
  extraReducers: {
    [getSinglePost.fulfilled]: (state, action) => {
      state.post = action.payload.post;
    },
  },
});

export default singlePostSlice.reducer;
