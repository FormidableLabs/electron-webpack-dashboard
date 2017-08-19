import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';

const zoomInAnimation = keyframes`${zoomIn}`;

export default styled.div`
  background: #2a2e3b;
  flex: 1 1 0;
  margin: 6px;
  padding: 30px;
  animation: 500ms ${zoomInAnimation};
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
