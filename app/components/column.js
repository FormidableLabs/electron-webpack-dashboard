import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex: ${({ size }) => (size === 'small' ? '1' : '1 0 72px')};
  justify-content: space-around;
  flex-direction: column;
`;
