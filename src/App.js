import PostsList from "./redux-axios-mini-assign/Components/PostsList";
import CreatePost from "./redux-axios-mini-assign/Components/CreatePost";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";

import { getPostsData } from "./redux-axios-mini-assign/Posts/postSlice";
import "./styles.css";
import ButtonMUI from "./redux-axios-mini-assign/Components/common/button/ButtonMUI";
import Snackbar from "@mui/material/Snackbar";
export default function App() {
  // snackbar states
  const [open, setOpen] = useState(false);

  const handleOpenSnackBar = () => {
    console.log("open snackbar");
    setOpen(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // .-.

  return (
    <Container maxWidth="md" className="app">
      <h1>Facebook feed</h1>
      <ButtonMUI btnText={"Open Snackbar"} eventHandler={handleOpenSnackBar} />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Note archived"
      />

      <CreatePost />
      <PostsList />
    </Container>
  );
}
