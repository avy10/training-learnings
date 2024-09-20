import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Posts/postSlice";
import SinglePost from "./SinglePost";
const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const fetchNewPosts = () => {
    dispatch(getPosts());
  };
  useEffect(() => {
    if (!posts.postsUpdate) return;
    fetchNewPosts();
  }, [posts.postsUpdate]);

  return (
    <>
      {posts?.postsArr.map((eachPost) => (
        <SinglePost key={eachPost?._id} eachPost={eachPost} />
      ))}
    </>
  );
};

export default PostsList;
