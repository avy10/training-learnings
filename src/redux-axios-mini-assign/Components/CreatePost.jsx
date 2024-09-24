import { useState } from "react";
import { useDispatch } from "react-redux";
import { createANewPost } from "../Posts/postSlice";
import ButtonMUI from "./common/button/ButtonMUI";
import SimpleDialog from "./common/dialog/SimpleDialog";
import NewPostInputField from "./NewPostInputField";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
const CreatePost = () => {
  const dispatch = useDispatch();
  const [postContent, setPostContent] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  const createPost = () => {
    dispatch(createANewPost({ postContent, handleDialogClose }));
  };
  const handleInputChange = (event) => {
    setPostContent(event.target.value);
  };
  const paperPropsObject = {
    component: "form",
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const email = formJson.email;
      console.log(email);
      // handleDialogClose(); // close dialog when post successfully created, else show error on top of dialog box itself
    },
  };
  return (
    <div>
      <ButtonMUI btnText={"Create Post"} eventHandler={handleDialogOpen} />
      <SimpleDialog
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        dialogTitle={"Create post"}
        dialogActionName={"Post"}
        dialogActionsHandler={createPost}
        paperPropsObject={paperPropsObject}
      >
        <Box sx={{ width: 400, maxWidth: "100%" }}>
          <TextField
            autoFocus
            required
            margin="dense"
            name="email"
            fullWidth
            hiddenLabel
            id="post-content-input-box"
            variant="outlined"
            multiline
            rows={5}
            placeholder="What's on your mind, User?"
          />
        </Box>
      </SimpleDialog>
    </div>
  );
};

export default CreatePost;

/* 
// Old GenericModal based code
<GenericModal
        customStyles={{
          border: "none",
          borderRadius: "7px",
        }}
        openModal={openModal}
        handleModalClose={handleModalClose}
      >
        <label>Post Content : </label>
        <input type="text" value={postContent} onChange={handleInputChange} />

        <ButtonMUI
          btnText={"Create a new post"}
          btnSize="small"
          eventHandler={createPost}
        />
      </GenericModal>
*/
