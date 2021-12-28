import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/User/authSlice";
import homepageReducer from "../features/Homepage/homepageSlice";
import commentReducer from "../features/Comment/commentSlice";
import profileReducer from "../features/Profile/profileSlice";
import videoReducer from "../features/Video/videoSlice";
import searchReducer from "../features/Search/searchSlice";
import viewProfileReducer from "../features/ViewProfile/viewProfileSlice";
import singlePostReducer from "../features/SinglePost/singlePostSlice";
import ramblerMapReducer from "../features/RamblerMaps/ramblerMapSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    homepage: homepageReducer,
    comment: commentReducer,
    profile: profileReducer,
    video: videoReducer,
    search: searchReducer,
    viewProfile: viewProfileReducer,
    singlePost: singlePostReducer,
    ramblerMap: ramblerMapReducer,
  },
});
