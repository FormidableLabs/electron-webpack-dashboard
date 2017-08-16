import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';

const zoomInAnimation = keyframes`${zoomIn}`;

export default styled.div`
  background: #2a2e3b;
  flex: 1;
  margin: 6px;
  padding: 30px;
  animation: 500ms ${zoomInAnimation};
`;
