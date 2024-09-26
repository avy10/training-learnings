import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjlmZWNjZTMzZmE0NTVlZjg5ODA4YSIsImlhdCI6MTcyNjc1MTA1MywiZXhwIjoxNzU4Mjg3MDUzfQ.ScXemniTQ91mqpZMdvz5pI_tmqrvL-Imy5OiWEQIQSk";
const PROJECT_ID = `lkkoqstnysf1`; // original project ID whose limit got crossed
// const PROJECT_ID = `afgagewg1000`; // a random project ID
// const PROJECT_ID = ""; // to simulate invalid project ID error
export const getPostsData = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    // const host = `https://academics.newtonschool.co`; // simulate 404

    const host = `https://academics.newtonschool.co/api/v1/facebook/post`;
    try {
      const response = await axios.get(host, {
        headers: {
          projectID: PROJECT_ID,
        },
      });

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
      if (response?.data?.status === "success" || response?.status === 201) {
        dispatch(getPostsData());
        // not the recommended way, leaving this here for study reference
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postID, { rejectWithValue }) => {
    console.log("postID in deletePost async thunk", postID);

    const host = `https://academics.newtonschool.co/api/v1/facebook/post/${postID}`;
    try {
      const response = await axios.delete(host, {
        headers: {
          projectID: PROJECT_ID,
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }

    // check if response is OK, then get new posts // handled at the same place where this middleware function is called
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ postID, postContent }, { dispatch, rejectWithValue }) => {
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

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const postsInitialState = {
  postsArr: [],
  loader: false,
  submitLoader: false,
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
        state.loader = false;
        state.postsArr = Array.isArray(action?.payload?.data)
          ? action.payload.data
          : [];
        state.postsDataErrorMsg = "";
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
      })
      .addCase(createANewPost.pending, (state) => {
        state.submitLoader = true;
      })
      .addCase(createANewPost.fulfilled, (state, action) => {
        action.meta.arg.handleAutoDialogClose();
        state.submitLoader = false;

        state.postsDataErrorMsg = "";
      })
      .addCase(createANewPost.rejected, (state, action) => {
        state.submitLoader = true;

        state.postsDataErrorMsg = `Error in creating a new post via POST : ${action.error.message} `;
      })
      .addCase(deletePost.pending, (state) => {
        state.submitLoader = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.submitLoader = false;

        state.postsDataErrorMsg = "";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.submitLoader = false;

        state.postsDataErrorMsg = `Error in DEL : ${action.error.message} `;
      })
      .addCase(editPost.pending, (state) => {
        state.submitLoader = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.submitLoader = false;
        state.postsDataErrorMsg = "";
        // action?.meta?.arg?.handleModalClose?.();
        // do not return here in extra reducers
      })
      .addCase(editPost.rejected, (state, action) => {
        state.submitLoader = false;
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
