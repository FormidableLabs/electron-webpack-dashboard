import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';

const zoomInAnimation = keyframes`${zoomIn}`;

export const Box = styled.div`
  background: #2a2e3b;
  flex: ${({ size }) => (size === 'small' ? '1 1 100%' : '1 1 0')};
  height: ${({ size }) => (size === 'small' ? '350px' : '')};
  margin: 6px;
  padding: 30px;
  animation: 500ms ${zoomInAnimation};
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const StatusBox = styled(Box)`
  display: block;
  flex: none;
  padding: 10px 30px;
`;
