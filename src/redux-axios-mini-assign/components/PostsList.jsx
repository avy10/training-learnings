import { useSelector } from "react-redux";
import SinglePost from "./SinglePost";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPostsData, clearErrorMsg } from "../posts/postSlice";
import Loader from "./common/loader/Loader";

import MessageSnackbar from "./common/snackbar/MessageSnackbar";
import {
  hideSnackbar,
  showSnackbar,
} from "./common/snackbar/messageSnackbarSlice";
// Two approaches for snackbar,
/* 
1. handle it in an useEffect (I am implementing this one right now)
	NO. It will open the snackbar, when error occurs anywhere else in the application because we are using a single central error state

2. pass on the handleSnackbarClick and handleSnackbarClose to the fetchPosts
  and, call those function upon promise resolve and reject respectively
  
3. both method outdated
now I have a common snackbar component, a snackbar slice

 */
const PostsList = (props) => {
  const { postsArr, loader, postsDataErrorMsg } = useSelector(
    (state) => state.posts
  );
  const { open } = useSelector((state) => state.messageSnackbar);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchNewPosts();
  }, []);

  const fetchNewPosts = async () => {
    // dispatch(getPostsData({ handleSnackbarOpen, handleSnackbarClose })); // not a good way to handle things
    //prefer the below async await code for a better logic design
    const response = await dispatch(getPostsData());
    console.log(response);
    if (response?.meta?.requestStatus === "rejected") {
      dispatch(
        showSnackbar({ message: "Error in fetching.", showDuration: "6000" })
      );
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbar());
    dispatch(clearErrorMsg());
  };

  // console.log("<>", postArr, loader);
  return loader ? (
    <Loader />
  ) : (
    <>
      <MessageSnackbar
        message={postsDataErrorMsg}
        onCloseHandle={handleSnackbarClose}
        open={open}
        hideAfter={150000}
      />

      {postsArr.length === 0 ? (
        <p>No Posts Found</p>
      ) : (
        postsArr?.map((eachPost) => (
          <SinglePost key={eachPost?._id} eachPost={eachPost} />
        ))
      )}
    </>
  );
};

export default PostsList;
