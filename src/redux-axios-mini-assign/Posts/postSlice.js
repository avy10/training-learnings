import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
export const postsInitialState = {
  postsArr: [],
  postsUpdate: true,
};
const postSlice = createSlice({
  name: "posts",
  initialState: postsInitialState,
  reducers: {
    updatePosts(state, action) {
      state.postsArr = action.payload;
      state.postsUpdate = false;
    },
    postsUpdated(state) {
      state.postsUpdate = true;
    },
  },
});

export function getPosts() {
  return async function (dispatch, getState) {
    const host = `https://academics.newtonschool.co/api/v1/facebook/post`;
    try {
      const response = await axios.get(host, {
        headers: {
          projectID: "lkkoqstnysf1",
        },
      });
      //   console.log(response);
      dispatch({ type: "posts/updatePosts", payload: response.data.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export const { postsUpdated } = postSlice.actions;

export default postSlice.reducer;
/* export default function postsReducer(state = postsInitialState, action) {
  switch (action.type) {
    case "posts/getPosts":
      return { ...state, postsArr: action.payload };
    default:
      return state;
  }
}

export function getPosts() {
  return async function (dispatch, getState) {
    const host = `https://academics.newtonschool.co/api/v1/facebook/post`;
    try {
      const response = await axios.get(host, {
        headers: {
          projectID: "lkkoqstnysf1",
        },
      });
      //   console.log(response);
      dispatch({ type: "posts/getPosts", payload: response.data.data });
    } catch (error) {
      console.log(error);
    }
  };
}
 */
