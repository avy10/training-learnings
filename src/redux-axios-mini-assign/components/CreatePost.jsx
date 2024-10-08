import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createANewPost, clearErrorMsg } from "../posts/postSlice";
import ButtonMUI from "./common/button/ButtonMUI";
import SimpleDialog from "./common/dialog/SimpleDialog";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
const CreatePost = () => {
  const dispatch = useDispatch();
  const { postsDataErrorMsg, submitLoader } = useSelector(
    (state) => state.posts
  );
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = () => setOpenDialog(true);
  const handleAutoDialogClose = () => {
    setOpenDialog(false);
  };
  const handleClickDialogClose = () => {
    setOpenDialog(false);
    dispatch(clearErrorMsg());
  };
  const submitFormProps = {
    component: "form",
    onSubmit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const postContent = formJson.postContent;
      console.log("postContent", postContent);
      dispatch(createANewPost({ postContent, handleAutoDialogClose }));
    },
  };

  return (
    <div>
      <ButtonMUI btnText={"Create Post"} eventHandler={handleDialogOpen} />
      <SimpleDialog
        openDialog={openDialog}
        handleClickDialogClose={handleClickDialogClose}
        dialogTitle={"Create post"}
        dialogActionName={"Post"}
        paperPropsObject={submitFormProps}
        loadingState={submitLoader}
        loadingStateText="Posting..."
      >
        <Box sx={{ width: 800, maxWidth: "100%" }}>
          {postsDataErrorMsg !== "" && (
            <Box
              sx={{
                color: "red",
              }}
            >
              Error in creating post. Please try later.
            </Box>
          )}
          <TextField
            autoFocus
            required
            margin="dense"
            name="postContent"
            fullWidth
            hiddenLabel
            id="post-content-input-box"
            variant="outlined"
            multiline
            rows={12}
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
