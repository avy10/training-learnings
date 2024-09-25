import Button from "@mui/material/Button";
const ButtonMUI = ({
  btnText,
  eventHandler,
  btnSize = "medium",
  btnVariant = "contained",
}) => {
  return (
    <Button onClick={eventHandler} variant={btnVariant} size={btnSize}>
      {btnText}
    </Button>
  );
};

export default ButtonMUI;
