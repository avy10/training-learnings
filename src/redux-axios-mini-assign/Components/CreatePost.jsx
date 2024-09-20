import { useState } from "react";
import { useDispatch } from "react-redux";
import { postsUpdated } from "../Posts/postSlice";
import axios from "axios";
const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjlmZWNjZTMzZmE0NTVlZjg5ODA4YSIsImlhdCI6MTcyNjc1MTA1MywiZXhwIjoxNzU4Mjg3MDUzfQ.ScXemniTQ91mqpZMdvz5pI_tmqrvL-Imy5OiWEQIQSk";
const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setPostContent(event.target.value);
  };
  const createPostApiCall = async () => {
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
            projectID: "lkkoqstnysf1",
            Authorization: `Bearer ${JWT_TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      dispatch(postsUpdated());
      setPostContent("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <label>Post Content : </label>
      <input type="text" value={postContent} onChange={handleInputChange} />
      <button onClick={createPostApiCall}>CREATE POST</button>
    </div>
  );
};

export default CreatePost;
// abhishekEMT69!
