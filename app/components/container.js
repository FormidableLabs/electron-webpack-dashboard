import styled from 'styled-components';

export default styled.div`
  background: #1d212d;
  display: flex;
  flex-direction: ${({ size }) => (size === 'small' ? 'row' : 'column')};
  flex: 1;
  padding: ${({ size }) => (size === 'small' ? '20px' : '40px')};
  flex-wrap: wrap;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
