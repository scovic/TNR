import { buttonColorPrimary, textButton } from "../../generalStyle";
import textFieldStyle from "../../components/textFieldStyle";
const SignInStyles = {
  buttonColorPrimary,
  textButton,
  ...textFieldStyle,
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

export default SignInStyles;
