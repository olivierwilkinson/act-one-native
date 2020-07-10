import { fireEvent, act, RenderAPI } from "react-native-testing-library";
import wait from "../helpers/wait";

export default (result: RenderAPI, id: string) =>
  act(async () => {
    fireEvent.press(result.getByTestId(id));
    await wait();
  });
