import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./Posts/postSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
