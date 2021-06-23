import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfileDetails = createAsyncThunk(
  "profile/getProfileDetails",
  async () => {
    const response = await axios.get(
      "https://sheltered-stream-23227.herokuapp.com/account"
    );
    return response.data;
  }
);

export const followUser = createAsyncThunk(
  "profile/followUser",
  async (payload) => {
    const response = await axios.post(
      `https://sheltered-stream-23227.herokuapp.com/follow/${payload}`
    );

    return response.data;
  }
);

export const unfollowUser = createAsyncThunk(
  "profile/unfollowUser",
  async (payload) => {
    const response = await axios.post(
      `https://sheltered-stream-23227.herokuapp.com/follow/unfollow/${payload}`
    );

    return response.data;
  }
);

export const editProfile = createAsyncThunk(
  "profile/editProfile",
  async (data) => {
    const response = await axios.post(
      "https://sheltered-stream-23227.herokuapp.com/account/edit",
      data
    );

    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "profile/deletePost",
  async (payload) => {
    const response = await axios.post(
      `https://sheltered-stream-23227.herokuapp.com/post/${payload}/delete`,
      payload
    );

    return { response: response.data, postID: payload };
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userAccount: null,
    profileLoader: "idle",
    profileTab: "profilePost",
    triggerGetProfile: false,
    toggleProfileEdit: false,
    toggleLogout: false,
    followLoader: "idle",
    unfollowLoader: "idle",
  },
  reducers: {
    changeProfileTab: (state, action) => {
      state.profileTab = action.payload;
    },
    toggleProfileEdit: (state) => {
      state.toggleProfileEdit = !state.toggleProfileEdit;
    },
    toggleLogout: (state) => {
      state.toggleLogout = !state.toggleLogout;
    },
  },
  extraReducers: {
    [getProfileDetails.pending]: (state) => {
      state.profileLoader = "pending";
    },
    [getProfileDetails.fulfilled]: (state, action) => {
      state.profileLoader = "idle";
      state.userAccount = action.payload.account;
    },
    [getProfileDetails.rejected]: (state) => {
      state.profileLoader = "error";
    },

    [deletePost.fulfilled]: (state, action) => {
      state.userAccount.posts = state.userAccount.posts.filter(
        (item) => item._id !== action.payload.postID
      );
      state.userAccount.postCount -= 1;
    },
    [deletePost.rejected]: (action) => {
      console.log(action);
    },

    [unfollowUser.fulfilled]: (state) => {
      state.triggerGetProfile = !state.triggerGetProfile;
      state.unfollowLoader = "idle";
    },
    [unfollowUser.pending]: (state) => {
      state.unfollowLoader = "pending";
    },
    [followUser.fulfilled]: (state) => {
      state.triggerGetProfile = !state.triggerGetProfile;
      state.followLoader = "idle";
    },
    [followUser.pending]: (state) => {
      state.followLoader = "pending";
    },
  },
});

export const { changeProfileTab, toggleProfileEdit, toggleLogout } =
  profileSlice.actions;

export default profileSlice.reducer;
