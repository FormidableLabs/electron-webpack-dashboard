import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex: ${({ size }) => (size === 'small') ? '1 0 100%' : '1'};
  justify-content: space-around;
  flex-direction: ${({ size }) => (size === 'small' ? 'column' : 'row')};
`;
