import Button from "@mui/material/Button";

const SubmitButton = ({
  btnText,
  btnSize = "medium",
  btnVariant = "contained",
  clickHandlerFunction = undefined,
  loadingState = false,
  loadingStateText = "Loading",
}) => {
  console.log(loadingStateText);
  console.log(loadingState);
  const handleOnClick = (event) => {
    event.preventDefault();
    clickHandlerFunction();
  };
  //   return <Button>{btnText}</Button>;
  return clickHandlerFunction ? (
    <Button
      type="submit"
      onClick={handleOnClick}
      variant={btnVariant}
      size={btnSize}
      disabled={loadingState}
    >
      {loadingState ? loadingStateText : btnText}
    </Button>
  ) : (
    <Button
      type="submit"
      variant={btnVariant}
      size={btnSize}
      disabled={loadingState}
    >
      {loadingState ? loadingStateText : btnText}
    </Button>
  );
};

export default SubmitButton;
