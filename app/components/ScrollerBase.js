import styled from 'styled-components';

export const ScrollerBase = styled.div`
  overflow: scroll;

  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 100%, 0.25);
    border-radius: 3px;
  }
`;
