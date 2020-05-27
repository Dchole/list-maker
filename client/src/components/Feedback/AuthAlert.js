import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Alert from "@material-ui/lab/Alert";

const style = {
  position: "abolute",
  width: "100%",
  display: "flex",
  justifyContent: "center"
};

const Feedback = () => {
  const {
    state: { feedback }
  } = useContext(UserContext);

  if (feedback.success)
    return (
      <Alert severity="info" style={style}>
        {feedback.success}
      </Alert>
    );
  else if (feedback.error)
    return (
      <Alert severity="error" style={style}>
        {feedback.error}
      </Alert>
    );

  return null;
};

export default Feedback;
