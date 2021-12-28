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

    return { response: response.data, userID: payload };
  }
);

export const unfollowUser = createAsyncThunk(
  "profile/unfollowUser",
  async (payload) => {
    const response = await axios.post(
      `https://sheltered-stream-23227.herokuapp.com/follow/unfollow/${payload}`
    );

    return { response: response.data, userID: payload };
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
    profileEditLoader: "idle",
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

    [unfollowUser.fulfilled]: (state, action) => {
      state.unfollowLoader = "idle";
      state.userAccount.following = state.userAccount.following.filter(
        (item) => item._id !== action.payload.userID
      );
      state.userAccount.followingCount -= 1;
    },
    [unfollowUser.pending]: (state) => {
      state.unfollowLoader = "pending";
    },
    [followUser.fulfilled]: (state, action) => {
      state.followLoader = "idle";
      state.userAccount.following.push(action.payload.response.user);
      state.userAccount.followingCount += 1;
    },
    [followUser.pending]: (state) => {
      state.followLoader = "pending";
    },

    [editProfile.pending]: (state) => {
      state.profileEditLoader = "pending";
    },

    [editProfile.fulfilled]: (state, action) => {
      state.profileEditLoader = "idle";
      state.userAccount.user.username = action.payload.account.user.username;
      state.userAccount.accountDescription =
        action.payload.account.accountDescription;
      state.userAccount.user.profilePicture =
        action.payload.account.user.profilePicture;
    },
  },
});

export const { changeProfileTab, toggleProfileEdit, toggleLogout } =
  profileSlice.actions;

export default profileSlice.reducer;
