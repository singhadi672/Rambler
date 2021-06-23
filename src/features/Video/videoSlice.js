import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RandomVideoSelector } from "../../util/RandomVideoSelector";

export const getVideos = createAsyncThunk("video/getVideos", async () => {
  const response = await axios.get(
    "https://fast-savannah-42620.herokuapp.com/videos"
  );

  return response.data;
});

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: null,
    videoLoader: "idle",
  },
  extraReducers: {
    [getVideos.fulfilled]: (state, action) => {
      state.videoLoader = "idle";
      state.videos = RandomVideoSelector(action.payload.videos, 10);
    },
    [getVideos.pending]: (state, action) => {
      state.videoLoader = "pending";
    },
    [getVideos.rejected]: (state, action) => {
      state.videoLoader = "error";
      console.log(action);
    },
  },
});

export default videoSlice.reducer;
