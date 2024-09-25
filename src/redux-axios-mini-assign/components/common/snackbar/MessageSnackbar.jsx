import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
const MessageSnackbar = ({
  open,
  onCloseHandle,
  message,
  hideAfter = 4000,
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
      action={action}
      message={message}
    />
  );
};

export default MessageSnackbar;
