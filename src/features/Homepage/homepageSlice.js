import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getFeed = createAsyncThunk("homepage/getFeed", async () => {
  const response = await axios.get(
    "https://sheltered-stream-23227.herokuapp.com/feed"
  );
  return response.data;
});

export const createNewPost = createAsyncThunk(
  "homepage/createNewPost",
  async (data) => {
    const response = await axios.post(
      "https://sheltered-stream-23227.herokuapp.com/post/new",
      data
    );
    return response.data;
  }
);

export const likeButtonClicked = createAsyncThunk(
  "homepage/likeButtonClicked",
  async (payload) => {
    const response = await axios.post(
      `https://sheltered-stream-23227.herokuapp.com/post/${payload}/like`
    );
    return { response: response.data, postID: payload };
  }
);

export const getNotifications = createAsyncThunk(
  "homepage/getNotifications",
  async () => {
    const response = await axios.get(
      "https://sheltered-stream-23227.herokuapp.com/notification"
    );
    return response.data;
  }
);

export const clearNotification = createAsyncThunk(
  "homepage/clearNotification",
  async (payload) => {
    const response = await axios.post(
      `https://sheltered-stream-23227.herokuapp.com/notification/${payload}`
    );
    return { response: response.data, notificationId: payload };
  }
);

export const homepageSlice = createSlice({
  name: "homepage",
  initialState: {
    feed: null,
    feedState: "idle",
    emojiBoard: false,
    imageBoard: false,
    notificationBoard: false,
    notifications: null,
    notificationLoader: "idle",
    requestLoader: "idle",
  },
  reducers: {
    emojiBoardVisible: (state) => {
      state.emojiBoard = !state.emojiBoard;
    },
    imageBoardVisible: (state) => {
      state.imageBoard = !state.imageBoard;
    },
    notificationBoardVisible: (state) => {
      state.notificationBoard = !state.notificationBoard;
    },
  },
  extraReducers: {
    [getFeed.pending]: (state) => {
      state.feedState = "pending";
    },
    [getFeed.fulfilled]: (state, action) => {
      state.feed = action.payload.feed;
      state.feedState = "idle";
    },
    [getFeed.rejected]: (state) => {
      state.feed = "error";
      console.log(state);
    },

    [createNewPost.fulfilled]: (state, action) => {
      state.feed.unshift(action.payload.post);
      state.requestLoader = "idle";
    },
    [createNewPost.rejected]: (action) => {
      console.log(action);
    },
    [createNewPost.pending]: (state) => {
      state.requestLoader = "pending";
    },

    [clearNotification.fulfilled]: (state, action) => {
      const notificationIndex = state.notifications.findIndex(
        (item) => item._id === action.payload.notificationId
      );
      state.notifications.splice(notificationIndex, 1);
    },
    [clearNotification.rejected]: (action) => {
      console.log(action);
    },

    [getNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload.notifications;
      state.notificationLoader = "idle";
    },
    [getNotifications.rejected]: (action) => {
      console.log(action);
    },
    [getNotifications.pending]: (state) => {
      state.notificationLoader = "pending";
    },
    [likeButtonClicked.fulfilled]: (state, action) => {
      const feedIndex = state.feed.findIndex(
        (item) => item._id === action.payload.postID
      );
      if (action.payload.response.type === "dec") {
        state.feed[feedIndex].likesCount -= 1;
        state.feed[feedIndex].likes.splice(
          state.feed[feedIndex].likes.findIndex(
            (item) => item === state.feed[feedIndex].user._id
          ),
          1
        );
      } else {
        state.feed[feedIndex].likesCount += 1;
        state.feed[feedIndex].likes.push(state.feed[feedIndex].user._id);
      }
    },
  },
});

export const {
  emojiBoardVisible,
  imageBoardVisible,
  notificationBoardVisible,
} = homepageSlice.actions;

export default homepageSlice.reducer;
