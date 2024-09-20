import { useDispatch } from "react-redux";
import { postsUpdated } from "../Posts/postSlice";
import axios from "axios";
const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjlmZWNjZTMzZmE0NTVlZjg5ODA4YSIsImlhdCI6MTcyNjc1MTA1MywiZXhwIjoxNzU4Mjg3MDUzfQ.ScXemniTQ91mqpZMdvz5pI_tmqrvL-Imy5OiWEQIQSk";

const DeletePost = ({ postID }) => {
  const dispatch = useDispatch();

  const deletingPost = async () => {
    const host = `https://academics.newtonschool.co/api/v1/facebook/post/${postID}`;
    try {
      const response = await axios.delete(host, {
        headers: {
          projectID: "lkkoqstnysf1",
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      });
      console.log(response);
      dispatch(postsUpdated());
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={deletingPost}>DELETE</button>;
};
export default DeletePost;
