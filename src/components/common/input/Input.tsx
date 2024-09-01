import styled from "styled-components/native";
import { normalFont } from "../../../styles/typography";

const Input = styled.TextInput`
  ${normalFont}
  height: 40px;
  max-width: 300px;
  border-color: gray;
  border-width: 1px;
  margin-bottom: 10px;
  padding: 10px;
`;

export default Input;
