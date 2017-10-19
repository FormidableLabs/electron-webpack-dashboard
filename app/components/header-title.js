import styled, { keyframes } from 'styled-components';

import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

export default styled.h1`
  align-self: center;
  color: white;
  font-family: 'montserratregular';
  font-weight: bold;
  font-size: 15px;
  line-height: 90px;
  letter-spacing: 3px;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  animation: 1s ${fadeInAnimation};
`;
