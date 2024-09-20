import Button from "@mui/material/Button";
const ButtonMUI = ({
  btnText,
  eventListener,
  eventHandler,
  btnSize = "medium",
}) => {
  return (
    <Button onClick={eventHandler} variant="contained" size={btnSize}>
      {btnText}
    </Button>
  );
};

export default ButtonMUI;
