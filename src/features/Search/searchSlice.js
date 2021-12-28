import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("search/getAllUsers", async () => {
  const response = await axios.get(
    "https://sheltered-stream-23227.herokuapp.com/user/all"
  );
  return response.data;
});

export const getUserDetails = createAsyncThunk(
  "serach/getUserDetails",
  async () => {
    const response = await axios.get(
      "https://sheltered-stream-23227.herokuapp.com/account"
    );
    return response.data;
  }
);

export const followUser = createAsyncThunk(
  "search/followUser",
  async (payload) => {
    const response = await axios.post(
      `https://sheltered-stream-23227.herokuapp.com/follow/${payload}`
    );

    return { response: response.data, userID: payload };
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    userAccount: null,
    accounts: null,
    searchFollowLoader: "idle",
    filteredAccounts: null,
    searchLoader: "idle",
  },
  reducers: {
    filterAccounts: (state, action) => {
      const filteredData = state.accounts.filter((item) =>
        item.username.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.filteredAccounts = filteredData;
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.searchLoader = "pending";
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.searchLoader = "idle";
      state.accounts = action.payload.users;
      state.filteredAccounts = action.payload.users;
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.userAccount = action.payload.account;
    },

    [followUser.pending]:(state)=>{
      state.searchFollowLoader = "pending"
    },

    [followUser.fulfilled]: (state, action) => {
      state.searchFollowLoader = "idle";
      state.userAccount.following.push(action.payload.response.user);
    },
  },
});

export const { filterAccounts } = searchSlice.actions;

export default searchSlice.reducer;
