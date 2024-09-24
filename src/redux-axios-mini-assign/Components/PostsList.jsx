import { useSelector } from "react-redux";
import withLoader from "./common/loader/withLoader";
import SinglePost from "./SinglePost";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPostsData } from "../Posts/postSlice";
const PostsList = (props) => {
  const { postArr, loader } = useSelector((state) => state.posts);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarContent, setSnackBarContent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("UseEffect is running");
    fetchNewPosts();
    // fetchNewPosts(handleOpenSnackBar);
  }, []);
  const fetchNewPosts = () => {
    dispatch(getPostsData());
    console.log("fetchNewPosts is running");
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
  console.log("<>", postArr, loader);
  return (
    <>
      {postArr?.postsArr.map((eachPost) => (
        <SinglePost key={eachPost?._id} eachPost={eachPost} />
      ))}
    </>
  );
};

export default withLoader(PostsList);
