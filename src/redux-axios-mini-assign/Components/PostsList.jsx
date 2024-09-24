import { useSelector } from "react-redux";
import SinglePost from "./SinglePost";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPostsData } from "../Posts/postSlice";
import Loader from "./common/loader/Loader";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const PostsList = (props) => {
  const { postsArr, loader, postsDataErrorMsg } = useSelector(
    (state) => state.posts
  );
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarContent, setSnackBarContent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchNewPosts();
    // fetchNewPosts(handleOpenSnackBar);
  }, []);
  const fetchNewPosts = () => {
    dispatch(getPostsData());
    // getPostsData();
  };
  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const handleClose = (event, reason) => {
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
