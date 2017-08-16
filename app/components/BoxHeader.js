import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

export default styled.h2`
  font-family: 'montserratlight';
  font-size: 11px;
  letter-spacing: 2px;
  color: #6c7082;
  margin-bottom: 10px;
  margin-top: 0px;
  height: auto;
  text-transform: uppercase;
  opacity: 0;
  animation: 500ms ${fadeInAnimation} 500ms;
  animation-fill-mode: forwards;
`;
