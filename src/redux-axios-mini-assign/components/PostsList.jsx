import { useSelector } from "react-redux";
import SinglePost from "./SinglePost";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPostsData } from "../posts/postSlice";
import Loader from "./common/loader/Loader";

import MessageSnackbar from "./common/snackbar/MessageSnackbar";
// Two approaches for snackbar,
/* 
1. handle it in an useEffect (I am implementing this one right now)
	NO. It will open the snackbar, when error occurs anywhere else in the application because we are using a single central error state

2. pass on the handleSnackbarClick and handleSnackbarClose to the fetchPosts
  and, call those function upon promise resolve and reject respectively
 */
const PostsList = (props) => {
  const { postsArr, loader, postsDataErrorMsg } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();

  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    fetchNewPosts();
  }, []);
  const fetchNewPosts = () => {
    dispatch(getPostsData({ handleSnackbarOpen, handleSnackbarClose }));
  };
  const handleSnackbarOpen = () => {
    setOpenSnackBar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  // console.log("<>", postArr, loader);
  return loader ? (
    <Loader />
  ) : (
    <>
      <MessageSnackbar
        message={postsDataErrorMsg}
        onCloseHandle={handleSnackbarClose}
        open={openSnackBar}
        hideAfter={5000}
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

// export default withLoader(PostsList);
export default PostsList;
