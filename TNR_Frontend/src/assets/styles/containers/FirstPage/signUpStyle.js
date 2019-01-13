import TextFieldStyle from "../../components/textFieldStyle";
import { buttonColorPrimary, textButton } from "../../generalStyle";
const signUpStyle = {
  buttonColorPrimary,
  textButton,
  ...TextFieldStyle,
  header: {
    marginRight: "8px"
  },
  button: {
    margin: "8px 0"
  },
  buttonRoot: {
    width: 140
  },
  fullWidth: {
    width: "100%"
  },
  text: {
    fontSize: "0.8rem",
    margin: "14px 0"
  }
};

export default signUpStyle;
