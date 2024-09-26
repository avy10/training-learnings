import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const MessageSnackbar = ({
  open,
  onCloseHandle,
  message,
  vertical = "top",
  horizontal = "center",
  hideAfter = 14000,
}) => {
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onCloseHandle}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <Snackbar
      open={open}
      autoHideDuration={hideAfter}
      onClose={onCloseHandle}
      anchorOrigin={{ vertical, horizontal }}
      // action={action} // the close button has been hidden away
      message={message}
      sx={{
        width: "95vw",

        "& .MuiSnackbarContent-root": {
          width: "95vw",
        },
        "& .MuiSnackbarContent-message": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          // basically the snackbar is automatically divided into content and action and, width of content is auto-set to maxContentWidth
          // setting a custom width to .MuiSnackbarContent-action will not work
        },
      }}
    />
  );
};

export default MessageSnackbar;
