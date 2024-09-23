import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjlmZWNjZTMzZmE0NTVlZjg5ODA4YSIsImlhdCI6MTcyNjc1MTA1MywiZXhwIjoxNzU4Mjg3MDUzfQ.ScXemniTQ91mqpZMdvz5pI_tmqrvL-Imy5OiWEQIQSk";

export const postsInitialState = {
  postsArr: [],
  postsUpdate: false,
  loader: false,
};
const postSlice = createSlice({
  name: "posts",
  initialState: postsInitialState,
  reducers: {
    updatePosts(state, action) {
      state.postsArr = action.payload;
      // state.postsUpdate = false;
    },
    // postsUpdated(state, action) {
    //   // state.postsUpdate = action.payload;
    // },
    updateLoader(state, action) {
      state.loader = action.payload;
    },
  },
});

// export const fi

export const getPosts = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "posts/updateLoader", payload: true });

    const host = `https://academics.newtonschool.co/api/v1/facebook/post`;
    try {
      const response = await axios.get(host, {
        headers: {
          projectID: "lkkoqstnysf1",
        },
      });
      dispatch({ type: "posts/updatePosts", payload: response.data.data });
      // dispatch({ type: "posts/postsUpdated", payload: false });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "posts/updateLoader", payload: false });
    }
  };
};
export const createPostApiCall = (postContent, handleModalClose) => {
  return async (dispatch) => {
    // dispatch({ type: "posts/postsUpdated", payload: true });
    dispatch({ type: "posts/updateLoader", payload: true });

    const host = `https://academics.newtonschool.co/api/v1/facebook/post`;
    try {
      const response = await axios.post(
        host,
        {
          title: "POST TITLE",
          content: postContent,
          appType: "facebook",
        },
        {
          headers: {
            projectID: "lkkoqstnysf1",
            Authorization: `Bearer ${JWT_TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      dispatch(getPosts());
      handleModalClose();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "posts/updateLoader", payload: false });
    }
  };
};
export const deletingPost = (postID) => {
  return async (dispatch) => {
    dispatch({ type: "posts/postsUpdated", payload: true });
    const host = `https://academics.newtonschool.co/api/v1/facebook/post/${postID}`;
    try {
      const response = await axios.delete(host, {
        headers: {
          projectID: "lkkoqstnysf1",
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      console.log(response);
      // dispatch(getPosts()); // check for success message before callin getPosts

      // dispatch(postsUpdated());
    } catch (error) {
      console.log(error);
    }
  };
};
export const updatingPost = (
  dispatch,
  postID,
  handleIsEdit,
  postContent,
  clearPostContent
) => {
  return async () => {
    dispatch({ type: "posts/postsUpdated", payload: true });
    const host = `https://academics.newtonschool.co/api/v1/facebook/post/${postID}`;
    const formData = new FormData();
    formData.append("title", "Edited Title");
    formData.append("content", postContent);
    try {
      const response = await axios.patch(host, formData, {
        headers: {
          projectID: "lkkoqstnysf1",
          Authorization: `Bearer ${JWT_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      dispatch(getPosts());

      clearPostContent();
      handleIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };
};
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
