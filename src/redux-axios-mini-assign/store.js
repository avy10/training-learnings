import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postSlice";
import messageSnackbarReducer from "./components/common/snackbar/messageSnackbarSlice";
const store = configureStore({
  reducer: {
    posts: postsReducer,
    messageSnackbar: messageSnackbarReducer,
  },
});

export default store;
