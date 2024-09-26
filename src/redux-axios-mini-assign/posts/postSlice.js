import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjlmZWNjZTMzZmE0NTVlZjg5ODA4YSIsImlhdCI6MTcyNjc1MTA1MywiZXhwIjoxNzU4Mjg3MDUzfQ.ScXemniTQ91mqpZMdvz5pI_tmqrvL-Imy5OiWEQIQSk";
const PROJECT_ID = `lkkoqstnysf1`; // original project ID whose limit got crossed
// const PROJECT_ID = `afgagewg1000`; // a random project ID
// const PROJECT_ID = ""; // to simulate invalid project ID error
export const getPostsData = createAsyncThunk(
  "posts/getPosts",
  async ({ handleSnackbarOpen, handleSnackbarClose }, { rejectWithValue }) => {
    // const host = `https://academics.newtonschool.co`;

    const host = `https://academics.newtonschool.co/api/v1/facebook/post`;
    try {
      const response = await axios.get(host, {
        headers: {
          projectID: PROJECT_ID,
        },
      });
      console.log(response);
      // console.log(response?.status);

      return response.data;
    } catch (error) {
      console.log("error in fetch", error);
      return rejectWithValue(error);
    }
  }
);
export const createANewPost = createAsyncThunk(
  "posts/createNewPost",
  async (
    { postContent, handleAutoDialogClose },
    { dispatch, rejectWithValue }
  ) => {
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
            projectID: PROJECT_ID,
            Authorization: `Bearer ${JWT_TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response?.data?.status === "success" || response?.status === 201) {
        console.log("I AM FETCHING NEW POST");
        dispatch(getPostsData({}));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }

    // check if response is OK, then get new posts and close modal
    // handleDialogClose();
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postID, closeDeleteModal }, { dispatch, rejectWithValue }) => {
    console.log("postID in deletePost async thunk", postID);

    const host = `https://academics.newtonschool.co/api/v1/facebook/post/${postID}`;
    try {
      const response = await axios.delete(host, {
        headers: {
          projectID: PROJECT_ID,
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      console.log(response);

      return { data: response.data, dispatch };
      // return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }

    // check if response is OK, then get new posts
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async (
    { postID, handleModalClose, postContent },
    { dispatch, rejectWithValue }
  ) => {
    const host = `https://academics.newtonschool.co/api/v1/facebook/post/${postID}`;
    const formData = new FormData();
    formData.append("title", "Edited Title");
    formData.append("content", postContent);
    try {
      const response = await axios.patch(host, formData, {
        headers: {
          projectID: PROJECT_ID,
          Authorization: `Bearer ${JWT_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("EDIT response", response);
      if (response?.data?.status === "success" || response?.status === 204) {
        console.log("I AM FETCHING NEW POST");
        dispatch(getPostsData({}));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const postsInitialState = {
  postsArr: [],
  loader: false,
  postsDataErrorMsg: "",
};

const postSlice = createSlice({
  name: "posts",
  initialState: postsInitialState,
  reducers: {
    clearErrorMsg: (state) => {
      state.postsDataErrorMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsData.pending, (state) => {
        state.loader = true;
      })
      .addCase(getPostsData.fulfilled, (state, action) => {
        console.log("I AM RUNNING", action);

        state.loader = false;
        state.postsArr = Array.isArray(action?.payload?.data)
          ? action.payload.data
          : [];
        state.postsDataErrorMsg = "";
        action?.meta?.arg?.handleSnackbarClose?.();
      })
      .addCase(getPostsData.rejected, (state, action) => {
        console.log(action);
        const errorMessageFromServer = action?.payload?.response?.data?.message;
        if (errorMessageFromServer) {
          state.postsDataErrorMsg = errorMessageFromServer;
        } else {
          state.postsDataErrorMsg = action.error.message;
        }
        state.loader = false;
        action?.meta?.arg?.handleSnackbarOpen();

        // state.postsDataErrorMsg = `Error in GET : ${action.error.message} `;
      })
      .addCase(createANewPost.pending, (state) => {
        state.loader = true;
      })
      .addCase(createANewPost.fulfilled, (state, action) => {
        console.log(action);
        action.meta.arg.handleAutoDialogClose();
        state.loader = false;
        state.postsDataErrorMsg = "";
      })
      .addCase(createANewPost.rejected, (state, action) => {
        console.log(action);

        state.loader = false;
        state.postsDataErrorMsg = `Error in creating a new post via POST : ${action.error.message} `;
      })
      .addCase(deletePost.pending, (state) => {
        state.loader = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log(action);
        // state.loader = false;
        // action?.meta?.arg?.closeDeleteModal();
        // state.postsDataErrorMsg = "";
        // if (action?.payload?.status === "success"){
        //   console.log("I AM FETCHING NEW POST");
        //   dispatch(getPostsData({}));
        // }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loader = false;
        state.postsDataErrorMsg = `Error in DEL : ${action.error.message} `;
      })
      .addCase(editPost.pending, (state) => {
        state.loader = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        action?.meta?.arg?.handleModalClose?.();
        state.loader = false;
        state.postsDataErrorMsg = "";
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loader = false;
        state.postsDataErrorMsg = `Error in PUT : ${action.error.message} `;
      });
  },
});

export const { clearErrorMsg } = postSlice.actions;
export default postSlice.reducer;

/* 
// try catch of the getPostsData
 try {
      const response = await axios.get(host, {
        headers: {
          projectID: PROJECT_ID,
        },
      });

      console.log(response);
      console.log(response?.status);

      return response.data;
    } catch (error) {
      console.log(error);
      // handleOpenSnackBar();
      return error.response;
    }

*/
