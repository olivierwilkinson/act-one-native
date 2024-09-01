import styled from "styled-components/native";
import { normalFont } from "../../../styles/typography";
import { mediumDarkGray } from "../../../styles/colours";

const InputLabel = styled.Text`
  ${normalFont}
  color: ${mediumDarkGray};
  font-weight: 200;
`;

export default InputLabel;
