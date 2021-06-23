import React from "react";
import "./App.css";
import {
  Explore,
  Signup,
  Video,
  Profile,
  Homepage,
  Login,
  Comment,
  Search,
  ViewProfile,
  SinglePost,
  RamblerMaps,
} from "./features/index";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./util/PrivateRoute";
import { useSelector } from "react-redux";

function App() {
  const { login } = useSelector((state) => state.auth);
  return (
    <div className="App-main">
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <PrivateRoute exact path="/" element={<Homepage />} />
          <PrivateRoute exact path="/profile" element={<Profile />} />
          <PrivateRoute
            exact
            path="/profile/:userId"
            element={<ViewProfile />}
          />
          <PrivateRoute exact path="/videos" element={<Video />} />
          <PrivateRoute exact path="/comment/:postId" element={<Comment />} />
          <PrivateRoute exact path="/search" element={<Search />} />
          <PrivateRoute exact path="/post/:postId" element={<SinglePost />} />
          <PrivateRoute exact path="/ramblerMaps" element={<RamblerMaps />} />
        </Routes>
      </div>
      <div className="nav-bottom">
        <Explore />
      </div>
    </div>
  );
}

export default App;
