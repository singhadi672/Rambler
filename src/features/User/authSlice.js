import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getTokenFromLocalstorage } from "../../util/getTokenFromLocalstorage";
import { setTokenToLocalStorage } from "../../util/setTokenToLocalstorage";
import { setDefaultAuthHeader } from "../../util/setDefaultAuthHeader";
import removeTokenFromLocalStorage from "../../util/removeTokenFromLocalStorage";

export const loginWithCredentials = createAsyncThunk(
  "auth/loginWithCredentials",
  async ({ email, password }) => {
    const response = await axios.post(
      "https://sheltered-stream-23227.herokuapp.com/login",
      {
        email,
        password,
      }
    );

    return response.data;
  }
);

export const signupNewUser = createAsyncThunk(
  "auth/signupNewUser",
  async ({ email, password, username }) => {
    const response = await axios.post(
      "https://sheltered-stream-23227.herokuapp.com/signup",
      {
        email,
        password,
        username,
      }
    );

    return response.data;
  }
);

export const userRefreshedPage = createAsyncThunk(
  "auth/userRefreshedPage",
  async ({ token }) => {
    const response = await axios.get(
      "https://sheltered-stream-23227.herokuapp.com/user"
    );

    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: getTokenFromLocalstorage() ? true : false,
    token: getTokenFromLocalstorage(),
    defaultHeader: setDefaultAuthHeader(getTokenFromLocalstorage()),
    loginStatus: "idle",
    signupStatus: "idle",
    user: null,
  },
  reducers: {
    userLogout: (state) => {
      removeTokenFromLocalStorage();
      state.login = false;
    },
  },
  extraReducers: {
    [loginWithCredentials.pending]: (state, action) => {
      state.loginStatus = "pending";
    },
    [loginWithCredentials.fulfilled]: (state, action) => {
      state.loginStatus = "idle";
      setTokenToLocalStorage(action.payload.token);
      setDefaultAuthHeader(action.payload.token);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.login = true;
    },
    [loginWithCredentials.rejected]: (state, action) => {
      state.loginStatus = "error";
    },
    [signupNewUser.pending]: (state) => {
      state.signupStatus = "pending";
    },
    [signupNewUser.fulfilled]: (state, action) => {
      state.signupStatus = "idle";
      setTokenToLocalStorage(action.payload.token);
      setDefaultAuthHeader(action.payload.token);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.login = true;
    },
    [signupNewUser.rejected]: (state) => {
      state.signupStatus = "error";
    },
    [userRefreshedPage.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { userLogout } = authSlice.actions;

export default authSlice.reducer;
