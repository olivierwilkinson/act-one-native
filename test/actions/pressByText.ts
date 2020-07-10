import { fireEvent, act, RenderAPI } from "react-native-testing-library";
import wait from "../helpers/wait";

export default (result: RenderAPI, text: string) =>
  act(async () => {
    fireEvent.press(result.getByText(text));
    await wait();
  });
