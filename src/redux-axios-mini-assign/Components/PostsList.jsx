import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Posts/postSlice";
import withLoader from "./common/loader/withLoader";
import SinglePost from "./SinglePost";
import Snackbar from "@mui/material/Snackbar";

const PostsList = (props) => {
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarContent, setSnackBarContent] = useState("");
  const handleClick = () => {
    setOpenSnackBar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  const posts = useSelector((state) => state.posts);
  const fetchNewPosts = () => {
    dispatch(getPosts());
  };
  useEffect(() => {
    fetchNewPosts();
  }, []);

  return (
    <>
      {posts?.postsArr.map((eachPost) => (
        <SinglePost key={eachPost?._id} eachPost={eachPost} />
      ))}
    </>
  );
};

export default withLoader(PostsList);
