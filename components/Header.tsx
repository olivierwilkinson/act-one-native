import React from "react";
import { Header, Body, Title } from 'native-base';
import styled from 'styled-components';

import { primaryColour } from '../styles/colours.js';

const PrimaryHeader = styled(Header)`
  background-color: ${primaryColour};
`;

export default function PlayList() {
  return (
    <PrimaryHeader>
      <Body>
        <Title>ActOne</Title>
      </Body>
    </PrimaryHeader>
  );
}
