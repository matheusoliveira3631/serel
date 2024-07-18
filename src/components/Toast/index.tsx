import { showMessage, MessageOptions } from "react-native-flash-message";

export default function Toast(toastProps: MessageOptions) {
  return showMessage(toastProps);
}
