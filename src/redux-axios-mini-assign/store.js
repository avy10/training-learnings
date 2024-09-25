import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postSlice";

const store = configureStore({
	reducer: {
		posts: postsReducer,
	},
});

export default store;
