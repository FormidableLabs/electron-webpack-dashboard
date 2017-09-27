import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations';

const zoomInAnimation = keyframes`${zoomIn}`;

export default styled.div`
  background: #2a2e3b;
  display: flex;
  flex: ${({ size }) => {
    const style = {
      large: '2 1 132px',
      small: '1 1 100%'
    };
    return style[size] || '1 1 60px';
  }},
  height: ${({ size }) => (size === 'small' ? '350px' : '')};
  margin: 6px;
  word-wrap: break-word;
  overflow: auto;
  animation: 500ms ${zoomInAnimation};
`;
