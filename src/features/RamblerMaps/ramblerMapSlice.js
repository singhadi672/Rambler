import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllRamblerMaps = createAsyncThunk(
  "ramblerMap/getAllRamblerMaps",
  async () => {
    const response = await axios.get("http://localhost:4000/ramblerMap");
    return response.data;
  }
);

export const createRamblerMaps = createAsyncThunk(
  "ramblerMap/createRamblerMaps",
  async (payload) => {
    const response = await axios.post(
      "http://localhost:4000/ramblerMap/new",
      payload
    );
    return response.data;
  }
);

export const ramblerMapSlice = createSlice({
  name: "ramblerMap",
  initialState: {
    lat: 28.7041,
    lng: 77.1025,
    ramblerMaps: null,
    mapLoader: "idle",
  },
  reducers: {
    setLatLng: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
  extraReducers: {
    [getAllRamblerMaps.fulfilled]: (state, action) => {
      state.ramblerMaps = action.payload.response;
      state.mapLoader = "idle";
    },
    [getAllRamblerMaps.pending]: (state) => {
      state.mapLoader = "pending";
    },
    [getAllRamblerMaps.rejected]: (state, action) => {
      state.mapLoader = "error";
      console.log(action);
    },

    [createRamblerMaps.fulfilled]: (state, action) => {
      state.ramblerMaps.unshift(action.payload.response);
    },
    [createRamblerMaps.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export const { setLatLng } = ramblerMapSlice.actions;
export default ramblerMapSlice.reducer;
