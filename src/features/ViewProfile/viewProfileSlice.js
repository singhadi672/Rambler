import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTargetUser = createAsyncThunk(
  "viewProfile/getTargetUser",
  async (payload) => {
    const response = await axios.get(
      `https://sheltered-stream-23227.herokuapp.com/account/${payload}`
    );
    return response.data;
  }
);

export const viewProfileSlice = createSlice({
  name: "viewProfile",
  initialState: {
    viewProfileAccount: null,
    viewProfileLoader: null,
    viewProfileTab: "profilePost",
  },
  reducers: {
    changeProfileTab: (state, action) => {
      state.viewProfileTab = action.payload;
    },
  },
  extraReducers: {
    [getTargetUser.fulfilled]: (state, action) => {
      state.viewProfileAccount = action.payload.account;
    },
  },
});

export const { changeProfileTab } = viewProfileSlice.actions;

export default viewProfileSlice.reducer;
