import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';

const zoomInAnimation = keyframes`${zoomIn}`;

const flexStyleBySize = {
  large: '2 1 132px',
  small: '1'
};

export default styled.div`
  background: #2a2e3b;
  display: flex;
  flex: ${({ size }) => flexStyleBySize[size] || '1 1 60px'};
  height: ${({ size }) => (size === 'small' ? '350px' : '')};
  margin: 6px;
  word-wrap: break-word;
  overflow: auto;
  animation: 500ms ${zoomInAnimation};
`;
