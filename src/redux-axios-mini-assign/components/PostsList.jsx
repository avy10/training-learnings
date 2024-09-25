import { useSelector } from "react-redux";
import SinglePost from "./SinglePost";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPostsData } from "../posts/postSlice";
import Loader from "./common/loader/Loader";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MessageSnackbar from "./common/snackbar/MessageSnackbar";
// Two approaches for snackbar,
/* 
1. handle it in an useEffect (I am implementing this one right now)
 */
const PostsList = (props) => {
	const { postsArr, loader, postsDataErrorMsg } = useSelector(
		(state) => state.posts
	);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchNewPosts();
	}, []);
	const fetchNewPosts = () => {
		dispatch(getPostsData());
	};
	const handleSnackbarClick = () => {
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
