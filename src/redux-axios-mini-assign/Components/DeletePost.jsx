import { useDispatch } from "react-redux";
// import { deletingPost } from "../Posts/postSlice";
import { deletePost } from "../Posts/postSlice";
import withLoader from "./common/loader/withLoader";
import ButtonMUI from "./common/button/ButtonMUI";
const DeletePost = ({ postID }) => {
  const dispatch = useDispatch();
  const postDeletion = () => {
    dispatch(deletePost(postID));
  };
  // return <button onClick={postDeletion}>DELETE</button>;
  return (
    <ButtonMUI btnText={"DELETE"} eventHandler={postDeletion} btnSize="small" />
  );
};
// export default withLoader(DeletePost);
export default DeletePost;
